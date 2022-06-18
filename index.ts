import { Client, Intents } from "discord.js";
import {DataSource} from "./types/data-source"
import discordConfig from "./config";
import WebSocket from "ws";
import handlePayloads from "./src/handlePayload";

// websocket connection to interact with Kraken API
// instead of just kraken can have a DataSource that takes a websocket connection
// has a send method takes a paylaod so kind of like a wrapper for all of this. 
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS]});
const krakenSrc: DataSource = new DataSource(new WebSocket("wss://ws.kraken.com"), "kraken public ws");

// On bot start establish a connection to the Karken public websockets
client.once('ready', async ()=> {
    krakenSrc.ws.onopen = (event) => {
        console.log(`connecting to ${krakenSrc.name}...`)
    }
    // DOCS for this function
    handlePayloads(client, krakenSrc);
});



client.login(discordConfig.token);