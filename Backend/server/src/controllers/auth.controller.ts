import { Request, Response } from 'express';
import { authService } from '../services/auth.service';

export class AuthController {
  private getClientUrl(): string {
    return process.env.CLIENT_URL || 'http://localhost:5173';
  }

  /**
   * GET /api/auth/google
   * Redirects user to Google OAuth 2.0 consent page
   */
  googleAuth(req: Request, res: Response): void {
    const url = authService.getGoogleOAuthUrl();
    if (req.query.json === 'true') {
      res.json({ url });
      return;
    }
    res.redirect(url);
  }

  /**
   * GET /api/auth/google/callback
   * Google redirects back here with `code` or `error`
   */
  async googleCallback(req: Request, res: Response): Promise<void> {
    const clientUrl = this.getClientUrl();
    const code = req.query.code as string;
    const error = req.query.error as string;

    if (error || !code) {
      console.error('Google OAuth error:', error);
      res.redirect(
        `${clientUrl}/login?error=${encodeURIComponent(
          error || 'Google authentication was cancelled or failed.'
        )}`
      );
      return;
    }

    try {
      const { user, token } = await authService.handleGoogleCallback(code);

      // Set secure HTTP-only cookie
      res.cookie('gt_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // Redirect back to frontend auth callback with token and user payload
      const encodedUser = encodeURIComponent(JSON.stringify(user));
      res.redirect(`${clientUrl}/auth/callback?token=${token}&user=${encodedUser}`);
    } catch (err: any) {
      console.error('Error handling Google callback:', err);
      res.redirect(
        `${clientUrl}/login?error=${encodeURIComponent(
          err.message || 'Google authentication encountered an issue.'
        )}`
      );
    }
  }

  /**
   * GET /api/auth/me
   * Returns current authenticated user
   */
  getMe(req: Request, res: Response): void {
    const authHeader = req.headers.authorization;
    const tokenFromHeader = authHeader?.startsWith('Bearer ')
      ? authHeader.substring(7)
      : null;
    const token = tokenFromHeader || req.cookies?.gt_token;

    if (!token) {
      res.status(401).json({ user: null, message: 'Unauthenticated' });
      return;
    }

    const user = authService.verifyToken(token);
    if (!user) {
      res.status(401).json({ user: null, message: 'Invalid or expired token' });
      return;
    }

    res.json({ user });
  }

  /**
   * POST /api/auth/login
   * Email/demo login
   */
  async login(req: Request, res: Response): Promise<void> {
    const { email, name } = req.body;
    if (!email) {
      res.status(400).json({ error: 'Email is required' });
      return;
    }

    try {
      const { user, token } = await authService.loginWithEmail(email, name);

      res.cookie('gt_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ user, token });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Login failed' });
    }
  }

  /**
   * POST /api/auth/register
   * Email/name registration
   */
  async register(req: Request, res: Response): Promise<void> {
    const { email, name } = req.body;
    if (!email || !name) {
      res.status(400).json({ error: 'Name and email are required' });
      return;
    }

    try {
      const { user, token } = await authService.loginWithEmail(email, name);

      res.cookie('gt_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(201).json({ user, token });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Registration failed' });
    }
  }

  /**
   * POST /api/auth/logout
   * Clears session cookie
   */
  logout(req: Request, res: Response): void {
    res.clearCookie('gt_token');
    res.json({ success: true, message: 'Logged out successfully' });
  }
}

export const authController = new AuthController();
