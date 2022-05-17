// websocket connection to interact with Kraken API
import WebSocket from "ws";
const krakenSocket = new WebSocket("wss://ws.kraken.com");

krakenSocket.onopen = (event) => {
    console.log(event);
    console.log("establishing connection...");
}


