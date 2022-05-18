import dotenv from "dotenv";
dotenv.config({path: ".env"});

export default {
    token: process.env.BOT_TOKEN || "fake-token",
    guildId: process.env.GUILD_ID
}