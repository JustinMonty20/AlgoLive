import { Client, Guild, GuildMember } from "discord.js";
// import WebSocket from "ws";
import { DataSource, PublicMessages } from "../types";
import  config  from "../config";

// TODO: ADD in a logger winston or pino. Probably tryin winston for this personal project. 
// let currCandleTime: number;
// let endingCandleTime: number;

/**
 * 
 * 
 */
export default (bot: Client, ds: DataSource) => {
    // logic for updating the bot's nickname and activity can live in here.
    // inside of here we can reference everything else inside of this function.
    // Maybe? lol
    // const updateBot = () => {

    // }

    ds.ws.onmessage = (event) => {
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
            // handleOhlcMsg()
            console.log(eventMsgData);
            // set the nickName and the activity together in a separate function. 
            // then we have gotten back a message from ohlc channel
            // bot.user?.setActivity({name: `fetching current Algorand price... ${count}`});
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
const getBot = (bot: Client, guildId: string, botId: string): GuildMember | undefined => {
    const server: Guild | undefined =  bot.guilds.cache.get(guildId);
    return server?.members.cache.get(botId);
}

/**
 * 
 * @param ds 
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