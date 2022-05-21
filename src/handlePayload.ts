import {Client} from "discord.js";
import WebSocket from "ws";
import { DataSource, PublicMessages } from "../types";


let currCandleTime: number;

export default (_client: Client, ds: DataSource) => {
    // client will be passed down to update the nickname and status further on down the line.
    ds.ws.onmessage = (event) => {
        handleEvent(event)
    }
}

const handleEvent = (event: WebSocket.MessageEvent) => {
    console.log("calling handleEvent");
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