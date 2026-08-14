import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ error: "Too Many Requests" });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ error: "No bots allowed" });
      } else {
        return res.status(403).json({ error: "Forbidden" });
      }
    } else if (decision.ip.isHosting()) {
      return res.status(403).json({ error: "Forbidden" });
    } else if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  } catch (error) {
    console.log("Error in arcjetMiddleware:" + error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
