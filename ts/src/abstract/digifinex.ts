// -------------------------------------------------------------------------------

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

// -------------------------------------------------------------------------------

import { implicitReturnType } from '../base/types.js';
import { Exchange as _Exchange } from '../base/Exchange.js';

interface Exchange {
    publicSpotGetMarketSymbols (params?: {}): Promise<implicitReturnType>;
    publicSpotGetKline (params?: {}): Promise<implicitReturnType>;
    publicSpotGetMarginCurrencies (params?: {}): Promise<implicitReturnType>;
    publicSpotGetMarginSymbols (params?: {}): Promise<implicitReturnType>;
    publicSpotGetMarkets (params?: {}): Promise<implicitReturnType>;
    publicSpotGetOrderBook (params?: {}): Promise<implicitReturnType>;
    publicSpotGetPing (params?: {}): Promise<implicitReturnType>;
    publicSpotGetSpotSymbols (params?: {}): Promise<implicitReturnType>;
    publicSpotGetTime (params?: {}): Promise<implicitReturnType>;
    publicSpotGetTrades (params?: {}): Promise<implicitReturnType>;
    publicSpotGetTradesSymbols (params?: {}): Promise<implicitReturnType>;
    publicSpotGetTicker (params?: {}): Promise<implicitReturnType>;
    publicSpotGetCurrencies (params?: {}): Promise<implicitReturnType>;
    publicSwapGetPublicApiWeight (params?: {}): Promise<implicitReturnType>;
    publicSwapGetPublicCandles (params?: {}): Promise<implicitReturnType>;
    publicSwapGetPublicCandlesHistory (params?: {}): Promise<implicitReturnType>;
    publicSwapGetPublicDepth (params?: {}): Promise<implicitReturnType>;
    publicSwapGetPublicFundingRate (params?: {}): Promise<implicitReturnType>;
    publicSwapGetPublicFundingRateHistory (params?: {}): Promise<implicitReturnType>;
    publicSwapGetPublicInstrument (params?: {}): Promise<implicitReturnType>;
    publicSwapGetPublicInstruments (params?: {}): Promise<implicitReturnType>;
    publicSwapGetPublicTicker (params?: {}): Promise<implicitReturnType>;
    publicSwapGetPublicTickers (params?: {}): Promise<implicitReturnType>;
    publicSwapGetPublicTime (params?: {}): Promise<implicitReturnType>;
    publicSwapGetPublicTrades (params?: {}): Promise<implicitReturnType>;
    privateSpotGetMarketFinancelog (params?: {}): Promise<implicitReturnType>;
    privateSpotGetMarketMytrades (params?: {}): Promise<implicitReturnType>;
    privateSpotGetMarketOrder (params?: {}): Promise<implicitReturnType>;
    privateSpotGetMarketOrderDetail (params?: {}): Promise<implicitReturnType>;
    privateSpotGetMarketOrderCurrent (params?: {}): Promise<implicitReturnType>;
    privateSpotGetMarketOrderHistory (params?: {}): Promise<implicitReturnType>;
    privateSpotGetMarginAssets (params?: {}): Promise<implicitReturnType>;
    privateSpotGetMarginFinancelog (params?: {}): Promise<implicitReturnType>;
    privateSpotGetMarginMytrades (params?: {}): Promise<implicitReturnType>;
    privateSpotGetMarginOrder (params?: {}): Promise<implicitReturnType>;
    privateSpotGetMarginOrderCurrent (params?: {}): Promise<implicitReturnType>;
    privateSpotGetMarginOrderHistory (params?: {}): Promise<implicitReturnType>;
    privateSpotGetMarginPositions (params?: {}): Promise<implicitReturnType>;
    privateSpotGetOtcFinancelog (params?: {}): Promise<implicitReturnType>;
    privateSpotGetSpotAssets (params?: {}): Promise<implicitReturnType>;
    privateSpotGetSpotFinancelog (params?: {}): Promise<implicitReturnType>;
    privateSpotGetSpotMytrades (params?: {}): Promise<implicitReturnType>;
    privateSpotGetSpotOrder (params?: {}): Promise<implicitReturnType>;
    privateSpotGetSpotOrderCurrent (params?: {}): Promise<implicitReturnType>;
    privateSpotGetSpotOrderHistory (params?: {}): Promise<implicitReturnType>;
    privateSpotGetDepositAddress (params?: {}): Promise<implicitReturnType>;
    privateSpotGetDepositHistory (params?: {}): Promise<implicitReturnType>;
    privateSpotGetWithdrawHistory (params?: {}): Promise<implicitReturnType>;
    privateSpotPostMarketOrderCancel (params?: {}): Promise<implicitReturnType>;
    privateSpotPostMarketOrderNew (params?: {}): Promise<implicitReturnType>;
    privateSpotPostMarketOrderBatchNew (params?: {}): Promise<implicitReturnType>;
    privateSpotPostMarginOrderCancel (params?: {}): Promise<implicitReturnType>;
    privateSpotPostMarginOrderNew (params?: {}): Promise<implicitReturnType>;
    privateSpotPostMarginPositionClose (params?: {}): Promise<implicitReturnType>;
    privateSpotPostSpotOrderCancel (params?: {}): Promise<implicitReturnType>;
    privateSpotPostSpotOrderNew (params?: {}): Promise<implicitReturnType>;
    privateSpotPostTransfer (params?: {}): Promise<implicitReturnType>;
    privateSpotPostWithdrawNew (params?: {}): Promise<implicitReturnType>;
    privateSpotPostWithdrawCancel (params?: {}): Promise<implicitReturnType>;
    privateSwapGetAccountBalance (params?: {}): Promise<implicitReturnType>;
    privateSwapGetAccountPositions (params?: {}): Promise<implicitReturnType>;
    privateSwapGetAccountFinanceRecord (params?: {}): Promise<implicitReturnType>;
    privateSwapGetAccountTradingFeeRate (params?: {}): Promise<implicitReturnType>;
    privateSwapGetAccountTransferRecord (params?: {}): Promise<implicitReturnType>;
    privateSwapGetTradeHistoryOrders (params?: {}): Promise<implicitReturnType>;
    privateSwapGetTradeHistoryTrades (params?: {}): Promise<implicitReturnType>;
    privateSwapGetTradeOpenOrders (params?: {}): Promise<implicitReturnType>;
    privateSwapGetTradeOrderInfo (params?: {}): Promise<implicitReturnType>;
    privateSwapPostAccountLeverage (params?: {}): Promise<implicitReturnType>;
    privateSwapPostTradeBatchCancelOrder (params?: {}): Promise<implicitReturnType>;
    privateSwapPostTradeBatchOrder (params?: {}): Promise<implicitReturnType>;
    privateSwapPostTradeCancelOrder (params?: {}): Promise<implicitReturnType>;
    privateSwapPostTradeOrderPlace (params?: {}): Promise<implicitReturnType>;
}
abstract class Exchange extends _Exchange {}

export default Exchange
