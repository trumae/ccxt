import Exchange from './abstract/cex.js';
import { Int, OrderSide, OrderType } from './base/types.js';
/**
 * @class cex
 * @extends Exchange
 */
export default class cex extends Exchange {
    describe(): any;
    fetchCurrenciesFromCache(params?: {}): Promise<any>;
    fetchCurrencies(params?: {}): Promise<{}>;
    fetchMarkets(params?: {}): Promise<any[]>;
    parseBalance(response: any): import("./base/types.js").Balances;
    fetchBalance(params?: {}): Promise<import("./base/types.js").Balances>;
    fetchOrderBook(symbol: string, limit?: Int, params?: {}): Promise<import("./base/types.js").OrderBook>;
    parseOHLCV(ohlcv: any, market?: any): number[];
    fetchOHLCV(symbol: string, timeframe?: string, since?: Int, limit?: Int, params?: {}): Promise<import("./base/types.js").OHLCV[]>;
    parseTicker(ticker: any, market?: any): import("./base/types.js").Ticker;
    fetchTickers(symbols?: string[], params?: {}): Promise<any>;
    fetchTicker(symbol: string, params?: {}): Promise<import("./base/types.js").Ticker>;
    parseTrade(trade: any, market?: any): import("./base/types.js").Trade;
    fetchTrades(symbol: string, since?: Int, limit?: Int, params?: {}): Promise<import("./base/types.js").Trade[]>;
    fetchTradingFees(params?: {}): Promise<{}>;
    createOrder(symbol: string, type: OrderType, side: OrderSide, amount: any, price?: any, params?: {}): Promise<{
        id: string;
        info: any;
        clientOrderId: any;
        timestamp: any;
        datetime: string;
        lastTradeTimestamp: any;
        type: string;
        side: string;
        symbol: any;
        status: string;
        price: number;
        amount: number;
        cost: any;
        average: any;
        remaining: number;
        filled: any;
        fee: any;
        trades: any;
    }>;
    cancelOrder(id: string, symbol?: string, params?: {}): Promise<any>;
    parseOrder(order: any, market?: any): {
        id: any;
        clientOrderId: any;
        datetime: string;
        timestamp: any;
        lastTradeTimestamp: any;
        status: string;
        symbol: any;
        type: string;
        timeInForce: any;
        postOnly: any;
        side: any;
        price: number;
        stopPrice: any;
        triggerPrice: any;
        cost: any;
        amount: number;
        filled: number;
        remaining: number;
        trades: any;
        fee: any;
        info: any;
        average: any;
    };
    fetchOpenOrders(symbol?: string, since?: Int, limit?: Int, params?: {}): Promise<import("./base/types.js").Order[]>;
    fetchClosedOrders(symbol?: string, since?: Int, limit?: Int, params?: {}): Promise<import("./base/types.js").Order[]>;
    fetchOrder(id: string, symbol?: string, params?: {}): Promise<{
        id: any;
        clientOrderId: any;
        datetime: string;
        timestamp: any;
        lastTradeTimestamp: any;
        status: string;
        symbol: any;
        type: string;
        timeInForce: any;
        postOnly: any;
        side: any;
        price: number;
        stopPrice: any;
        triggerPrice: any;
        cost: any;
        amount: number;
        filled: number;
        remaining: number;
        trades: any;
        fee: any;
        info: any;
        average: any;
    }>;
    fetchOrders(symbol?: string, since?: Int, limit?: Int, params?: {}): Promise<any[]>;
    parseOrderStatus(status: any): string;
    editOrder(id: string, symbol: any, type: any, side: any, amount?: any, price?: any, params?: {}): Promise<{
        id: any;
        clientOrderId: any;
        datetime: string;
        timestamp: any;
        lastTradeTimestamp: any;
        status: string;
        symbol: any;
        type: string;
        timeInForce: any;
        postOnly: any;
        side: any;
        price: number;
        stopPrice: any;
        triggerPrice: any;
        cost: any;
        amount: number;
        filled: number;
        remaining: number;
        trades: any;
        fee: any;
        info: any;
        average: any;
    }>;
    fetchDepositAddress(code: string, params?: {}): Promise<{
        currency: string;
        address: string;
        tag: string;
        network: string;
        info: any;
    }>;
    nonce(): number;
    sign(path: any, api?: string, method?: string, params?: {}, headers?: any, body?: any): {
        url: string;
        method: string;
        body: any;
        headers: any;
    };
    handleErrors(code: any, reason: any, url: any, method: any, headers: any, body: any, response: any, requestHeaders: any, requestBody: any): any[];
}
