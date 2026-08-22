import { Router } from "express";
import passport from "../../config/passport";
import { env } from "../../config/env";
import { getCurrentUser } from "./auth.controller";
import { requireAuth } from "../../middleware/auth.middleware";

const router = Router();

// Get current authenticated user session
router.get("/me", requireAuth, getCurrentUser);

// Start Google OAuth
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

// Google OAuth callback
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: `${env.CLIENT_URL}/login`,
        session: true,
    }),
    (_req, res) => {
        res.redirect(`${env.CLIENT_URL}/dashboard`);
    }
);

// Logout
router.post("/logout", (req, res) => {
    req.logout((error) => {
        if (error) {
            return res.status(500).json({
                message: "Logout failed",
            });
        }

        res.json({
            message: "Logged out successfully",
        });
    });
});

export default router;