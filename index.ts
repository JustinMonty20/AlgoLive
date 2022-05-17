// websocket connection to interact with Kraken API
import WebSocket from "ws";
const krakenSocket = new WebSocket("wss://ws.kraken.com");

krakenSocket.onopen = (event) => {
    console.log("establishing connection...");

}

krakenSocket.onmessage = (event) => {
    const eventObject = JSON.parse(event.data.toString())
    console.log(eventObject);
    if(eventObject.status === "online") {
        krakenSocket.send(payload)
    }
}

const payload = JSON.stringify({
    event: "subscribe",
    pair: ["ALGO/USD"],
    subscription: {
        name: "ticker",
    }
});

