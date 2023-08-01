import okxRest from '../okx.js';
import { Int, OrderSide, OrderType } from '../base/types.js';
import Client from '../base/ws/Client.js';
export default class okx extends okxRest {
    describe(): any;
    subscribeMultiple(access: any, channel: any, symbols?: string[], params?: {}): Promise<any>;
    subscribe(access: any, messageHash: any, channel: any, symbol: any, params?: {}): Promise<any>;
    watchTrades(symbol: string, since?: Int, limit?: Int, params?: {}): Promise<any>;
    handleTrades(client: Client, message: any): any;
    watchTicker(symbol: string, params?: {}): Promise<any>;
    watchTickers(symbols?: string[], params?: {}): Promise<any>;
    handleTicker(client: Client, message: any): any;
    watchOHLCV(symbol: string, timeframe?: string, since?: Int, limit?: Int, params?: {}): Promise<any>;
    handleOHLCV(client: Client, message: any): void;
    watchOrderBook(symbol: string, limit?: Int, params?: {}): Promise<any>;
    handleDelta(bookside: any, delta: any): void;
    handleDeltas(bookside: any, deltas: any): void;
    handleOrderBookMessage(client: Client, message: any, orderbook: any, messageHash: any): any;
    handleOrderBook(client: Client, message: any): any;
    authenticate(params?: {}): any;
    watchBalance(params?: {}): Promise<any>;
    handleBalance(client: Client, message: any): void;
    orderToTrade(order: any, market?: any): import("../base/types.js").Trade;
    watchMyTrades(symbol?: string, since?: Int, limit?: Int, params?: {}): Promise<any>;
    watchOrders(symbol?: string, since?: Int, limit?: Int, params?: {}): Promise<any>;
    handleOrders(client: Client, message: any, subscription?: any): void;
    handleMyTrades(client: Client, message: any): void;
    createOrderWs(symbol: string, type: OrderType, side: OrderSide, amount: number, price?: number, params?: {}): Promise<any>;
    handlePlaceOrders(client: Client, message: any): void;
    editOrderWs(id: string, symbol: string, type: OrderType, side: OrderSide, amount: number, price?: number, params?: {}): Promise<any>;
    cancelOrderWs(id: string, symbol?: string, params?: {}): Promise<any>;
    cancelOrdersWs(ids: string[], symbol?: string, params?: {}): Promise<any>;
    cancelAllOrdersWs(symbol?: string, params?: {}): Promise<any>;
    handleCancelAllOrders(client: Client, message: any): void;
    handleSubscriptionStatus(client: Client, message: any): any;
    handleAuthenticate(client: Client, message: any): void;
    ping(client: any): string;
    handlePong(client: Client, message: any): any;
    handleErrorMessage(client: Client, message: any): any;
    handleMessage(client: Client, message: any): any;
}
