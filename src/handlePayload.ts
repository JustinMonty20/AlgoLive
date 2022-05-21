import { Client } from "discord.js";
// import WebSocket from "ws";
import { DataSource, PublicMessages } from "../types";


// let currCandleTime: number;
// let endingCandleTime: number;

/**
 * 
 * 
 */
export default (bot: Client, ds: DataSource) => {
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
            let count = 0;
            // then we have gotten back a message from ohlc channel
            console.log(bot.user);
            bot.user?.setActivity({name: `fetching current Algorand price... ${count}`});
            // second item in the array is the nested array that holds price info and candle timees. 
            // index 1 is current time inside of the candle where trade is taking palce
            // index 2 is when the candle ends.
        }
    }
}


const subscribe = (ds: DataSource) => {
    ds.ws.send(subscribePayload("ohlc"));
}

// subscribe to ohlc (open high low close data from Kraken WebSocket API)
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