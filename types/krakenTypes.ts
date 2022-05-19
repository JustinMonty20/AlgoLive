// types of payload data we can get back from Kraken Websockets
export type PublicMessages = "ticket" | "ohlc" | "trade" | "spread" | "book";

// represents a system status message sent back from Kraken Websockets api
export type SystemStatus = {
    connectionId?: string,
    event: "systemStatus",
    status: "online" | "maintenance" | "cancel_only" | "limit_only" | "post_only",
    version: string
}

// represents a subscribe status message that is sent back from Karken Websockets api
export type Subscribe = {
    event: "subscribe",
    reqid?: number,
    pair?: string[],
    subscription: {
        depth?: 10|25|100|500|1000
        // interval is only used for ohlc (open high low close type)
        interval?: 1|5|15|30|60|240|1440|10080|21600
        name: PublicMessages,
    }
}