import {Client} from "discord.js";
import { DataSource, PublicMessages } from "../types";


export default (_client: Client, ds: DataSource) => {
    // client will be passed down to update the nickname and status further on down the line.
    ds.ws.onmessage = (event) => {
        const eventObj = JSON.parse(event.data.toString());
        console.log(eventObj);
        if(eventObj.status === "online") {
            ds.ws.send(subscribePayload("ohlc"))
        }
    }
}

// const handleEvent = () => {
//     console.log("calling handleEvent");
// }

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