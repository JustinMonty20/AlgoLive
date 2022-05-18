import WebSocket from "ws";

/**
 * Class that will hold the websocket that we want to send and receive information from
 */
export class DataSource {
    ws: WebSocket;
    name: string;

    constructor(ws: WebSocket, name:string){
        this.ws = ws;
        this.name = name;
    }
    /**
     * sends the passed in payload to the wsConn created in classes constructor
     * @param payload a JSON object
     */
    send = (payload: string) => {
        this.ws?.send(payload)
    } 
}