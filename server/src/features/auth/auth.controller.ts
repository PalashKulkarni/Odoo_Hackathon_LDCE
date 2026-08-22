import type { Request, Response } from "express";

export function getCurrentUser(req: Request, res: Response) {
    if (!req.user) {
        return res.status(401).json({
            message: "Not authenticated",
        });
    }

    return res.json({
        user: req.user,
    });
}