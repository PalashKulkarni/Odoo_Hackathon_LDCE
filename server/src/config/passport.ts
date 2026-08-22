import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { env } from "./env";
import { findOrCreateGoogleUser } from "../features/auth/auth.service";

passport.use(
    new GoogleStrategy(
        {
            clientID: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
            callbackURL: env.GOOGLE_CALLBACK_URL,
        },
        async (_accessToken, _refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;

                if (!email) {
                    return done(null, false);
                }

                const avatarUrl =
                    profile.photos?.[0]?.value ??
                    (profile._json as any)?.picture ??
                    null;

                const user = await findOrCreateGoogleUser({
                    googleId: profile.id,
                    email,
                    name: profile.displayName ?? null,
                    avatarUrl,
                });

                return done(null, user);
            } catch (error) {
                return done(error as Error, false);
            }
        }
    )
);

passport.serializeUser((user: any, done) => {
    done(null, user);
});

passport.deserializeUser((user: any, done) => {
    done(null, user);
});

export default passport;