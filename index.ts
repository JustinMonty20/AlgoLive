// import { Client, Intents } from "discord.js";
import {DataSource} from "./types/data-source"
// import discordConfig from "./config";
import WebSocket from "ws";

// websocket connection to interact with Kraken API
// instead of just kraken can have a DataSource that takes a websocket connection
// has a send method takes a paylaod so kind of like a wrapper for all of this. 
// const client = new Client({intents: Intents.FLAGS.GUILDS});
const krakenSrc = new DataSource(new WebSocket("wss://ws.kraken.com"), "kraken public ws");

krakenSrc.ws.onopen = (event) => {
    console.log(`connecting to ${krakenSrc.name}...`)
}

krakenSrc.ws.onmessage = (event) => {
    const eventObject = JSON.parse(event.data.toString())
    console.log(eventObject);
    if(eventObject.status === "online") {
        krakenSrc.send(payload)
    }
}

const payload = JSON.stringify({
    event: "subscribe",
    pair: ["ALGO/USD"],
    subscription: {
        name: "ticker",
    }
});
