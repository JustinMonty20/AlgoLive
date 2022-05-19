// types of payload data we can get back from Kraken Websockets
export type PublicMessages = "ticket" | "ohlc" | "trade" | "spread" | "book";

export type SystemStatus = {
    connectionId: string,
    event: "systemStatus",
    status: "online" | "maintenance" | "cancel_only" | "limit_only" | "post_only",
    version: "string"
}