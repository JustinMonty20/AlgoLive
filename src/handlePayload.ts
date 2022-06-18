import { Client, Guild, GuildMember } from "discord.js";
import { ActivityTypes } from "discord.js/typings/enums";
import { DataSource, PublicMessages } from "../types";
import { BotData, BotObject } from "../types/custom.types";

import  config  from "../config";

// TODO: ADD in a logger winston or pino. Probably tryin winston for this personal project. 
// let currCandleTime: number;
// let endingCandleTime: number;

/**
 * 
 * 
 */
export default (bot: Client, ds: DataSource) => {
    const botObject = {
        botGm: async () => {return await getBotGuildMember(bot, config.guildId, config.botId)},  
        botCu: bot.user
    };
    // logic for updating the bot's nickname and activity can live in here.
    // inside of here we can reference everything else inside of this function.
    const updateBot = async (botObj: BotObject, data: BotData) => {
        const {botGm, botCu} = botObj; const {difference, vwap} = data;
        const gm = await botGm(); 
        gm.setNickname(`$${vwap.toFixed(2)}`);
        console.log(botCu);
        botCu?.setActivity({name: `${difference.toFixed(2)}%`, type: ActivityTypes.WATCHING});
    }

    ds.ws.onmessage = (event) => {
        try {
            const eventMsgData = JSON.parse(event.data.toString());
            console.log(eventMsgData);
        
            if(eventMsgData.status === "online") {
                /**
                 * if we get back an online msg.
                 * Then we are good to go ahead and subscribe to the specific channel we want.
                 */
                console.log("---> subscribing to ohlc data. <---")
                subscribe(ds)
            }

            if(Array.isArray(eventMsgData)) {
                const innerDataArray = eventMsgData[1];
                // set the nickName and the activity together in a separate function. 
                // then we have gotten back a message from ohlc channel
                updateBot(botObject, {difference:  5, vwap: Number(innerDataArray[6])});
            }
        } catch(err) {

        }
    }
}

// const handleOhlc = (bot: Client, eventMsgData: Array<number | string>) => {

// }

/**
 * 
 * @param bot 
 * @param guildId 
 * @param botId 
 * @returns 
 */
const getBotGuildMember = async (bot: Client, guildId: string, botId: string): Promise<GuildMember> => {
        try {
            // retrieve Guild from all guilds bot is apart of. 
            const server: Guild = await bot.guilds.fetch(guildId);
            // get the guild member representing the bot.
            const gm: GuildMember = await server.members.fetch(botId);
            return gm;
        } catch(err) {
            throw err
        }
}

/**
 * 
 * @param ds DataSource class. Wrapper for ws implementation we want to use. 
 */
const subscribe = (ds: DataSource) => {
    ds.ws.send(subscribePayload("ohlc"));
}

// subscribe to ohlc (open high low close data from Kraken WebSocket API)
// publicMessage is the potential endpoints we can subscribe to.
const subscribePayload = (publicMessage: PublicMessages) => {
    return JSON.stringify({
        event: "subscribe",
        pair: ["ALGO/USD"],
        subscription: {
            interval: 15,
            name: publicMessage,
        }
    })
}