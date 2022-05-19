import {Client} from "discord.js";
import { DataSource, PublicMessages } from "../types";

import WebSocket from "ws";

export default (client: Client, ds: DataSource) => {

    ds.ws.onmessage = (event) => {
        const eventObj = JSON.parse(event.data.toString());
    }
}

const handleEvent = () => {

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