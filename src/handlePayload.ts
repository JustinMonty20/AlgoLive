import { Client } from "discord.js";
import WebSocket from "ws";
import { DataSource, PublicMessages } from "../types";


// let currCandleTime: number;

export default (_client: Client, ds: DataSource) => {
    // client will be passed down to update the nickname and status further on down the line.
    ds.ws.onmessage = (event) => {
        handleEvent(event,ds)
    }
}

const handleEvent = (event: WebSocket.MessageEvent, ds: DataSource) => {
    const eventMsgData = JSON.parse(event.data.toString());
    console.log(eventMsgData);
    if(eventMsgData.status == "online") {
        ds.ws.send(subscribePayload("ohlc"))
    }
    
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