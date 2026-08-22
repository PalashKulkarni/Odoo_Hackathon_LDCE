import express from "express";
import cors from "cors";
import helmet from "helmet";
import session from "express-session";

import passport from "./config/passport";
import { env } from "./config/env";
import authRoutes from "./features/auth/auth.routes";

const app = express();

app.use(helmet());

app.use(
    cors({
        origin: env.CLIENT_URL,
        credentials: true,
    })
);

app.use(express.json());

app.use(
    session({
        secret: env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);

app.get("/health", (_req, res) => {
    res.json({
        status: "ok",
    });
});

export default app;