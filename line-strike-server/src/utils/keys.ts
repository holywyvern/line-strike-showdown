import crypto from "node:crypto";

const bytes = crypto.randomBytes(256).toString("utf-8");

export const SECRET_LOBBY_KEY = `${bytes}${Date.now()}${Math.random()}_lobby_room`;

export const SECRET_LINE_STRIKE_KEY = `${bytes}${Date.now() + 5}${Math.random()}_line_strike`;