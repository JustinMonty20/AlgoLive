import { Client, Intents } from "discord.js";
import {DataSource} from "./types/data-source"
import discordConfig from "./config";
import WebSocket from "ws";

// websocket connection to interact with Kraken API
// instead of just kraken can have a DataSource that takes a websocket connection
// has a send method takes a paylaod so kind of like a wrapper for all of this. 
const client = new Client({intents: Intents.FLAGS.GUILDS});
const krakenSrc = new DataSource(new WebSocket("wss://ws.kraken.com"), "kraken public ws");

console.log(discordConfig.token);
client.once('ready', ()=> {
    krakenSrc.ws.onopen = (event) => {
        console.log(`connecting to ${krakenSrc.name}...`)
    }
});

// maybe setting up a timeseries db something like prometheus?


krakenSrc.ws.onmessage = (event) => {
    // handleMessage function in side of there that passes in the event and then handles code from there.
    // if its the ohlc message then I should update the bots nickname to show the price and how much it has gone down and up  
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
        interval: 15,
        name: "ohlc",
    }
});

client.login(discordConfig.token)
