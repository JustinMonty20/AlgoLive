import { GuildMember, ClientUser } from "discord.js"

export interface BotObject {
    botGm: () => Promise<GuildMember>,
    botCu: ClientUser | null
}

export interface BotData {
    difference: number,
    vwap: number,
}