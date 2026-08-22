import jwt from 'jsonwebtoken';
import { authRepository, UpsertGoogleUserInput } from '../repositories/auth.repository';

export interface UserSessionPayload {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string | null;
}

export class AuthService {
  private getClientId(): string {
    return process.env.GOOGLE_CLIENT_ID || '';
  }

  private getClientSecret(): string {
    return process.env.GOOGLE_CLIENT_SECRET || '';
  }

  private getCallbackUrl(): string {
    return (
      process.env.GOOGLE_CALLBACK_URL ||
      'http://localhost:5000/api/auth/google/callback'
    );
  }

  private getSessionSecret(): string {
    return process.env.SESSION_SECRET || 'jwt-default-session-secret';
  }

  /**
   * Generates the Google OAuth 2.0 consent screen redirect URL
   */
  getGoogleOAuthUrl(): string {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
      redirect_uri: this.getCallbackUrl(),
      client_id: this.getClientId(),
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'openid',
      ].join(' '),
    };

    const qs = new URLSearchParams(options);
    return `${rootUrl}?${qs.toString()}`;
  }

  /**
   * Exchanges authorization code for Google Tokens & User Profile,
   * then upserts user in database and generates a JWT.
   */
  async handleGoogleCallback(code: string): Promise<{ user: UserSessionPayload; token: string }> {
    const tokenUrl = 'https://oauth2.googleapis.com/token';
    const values = {
      code,
      client_id: this.getClientId(),
      client_secret: this.getClientSecret(),
      redirect_uri: this.getCallbackUrl(),
      grant_type: 'authorization_code',
    };

    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(values).toString(),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error('Google token error:', tokenData);
      throw new Error(tokenData.error_description || 'Failed to exchange authorization code');
    }

    const { id_token, access_token } = tokenData;

    // Fetch user details from Google UserInfo
    const userInfoResponse = await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );

    const googleUser = await userInfoResponse.json();

    if (!userInfoResponse.ok) {
      console.error('Google userInfo error:', googleUser);
      throw new Error('Failed to retrieve user profile from Google');
    }

    const userData: UpsertGoogleUserInput = {
      googleId: googleUser.id,
      email: googleUser.email,
      name: googleUser.name || googleUser.email.split('@')[0],
      avatarUrl: googleUser.picture || null,
    };

    const dbUser = await authRepository.upsertGoogleUser(userData);

    const sessionPayload: UserSessionPayload = {
      id: dbUser.id,
      email: dbUser.email,
      name: dbUser.name,
      avatarUrl: dbUser.avatarUrl,
    };

    const token = this.generateToken(sessionPayload);

    return { user: sessionPayload, token };
  }

  /**
   * Generates a signed JWT for the authenticated user
   */
  generateToken(payload: UserSessionPayload): string {
    return jwt.sign(payload, this.getSessionSecret(), {
      expiresIn: '7d',
    });
  }

  /**
   * Verifies and decodes JWT token
   */
  verifyToken(token: string): UserSessionPayload | null {
    try {
      const decoded = jwt.verify(token, this.getSessionSecret()) as UserSessionPayload;
      return decoded;
    } catch {
      return null;
    }
  }

  /**
   * Fallback / Email Login
   */
  async loginWithEmail(email: string, name?: string): Promise<{ user: UserSessionPayload; token: string }> {
    const formattedName = name || email.split('@')[0].replace(/^\w/, (c) => c.toUpperCase());
    const dbUser = await authRepository.createOrUpdateEmailUser({
      email,
      name: formattedName,
      avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(formattedName)}&backgroundColor=d66d4e,f5ddd5`,
    });

    const sessionPayload: UserSessionPayload = {
      id: dbUser.id,
      email: dbUser.email,
      name: dbUser.name,
      avatarUrl: dbUser.avatarUrl,
    };

    const token = this.generateToken(sessionPayload);
    return { user: sessionPayload, token };
  }
}

export const authService = new AuthService();
