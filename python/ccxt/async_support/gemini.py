# -*- coding: utf-8 -*-

# PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
# https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

from ccxt.async_support.base.exchange import Exchange

# -----------------------------------------------------------------------------

try:
    basestring  # Python 3
except NameError:
    basestring = str  # Python 2
import hashlib
from ccxt.base.errors import ExchangeError
from ccxt.base.errors import AuthenticationError
from ccxt.base.errors import PermissionDenied
from ccxt.base.errors import ArgumentsRequired
from ccxt.base.errors import BadRequest
from ccxt.base.errors import InsufficientFunds
from ccxt.base.errors import InvalidOrder
from ccxt.base.errors import OrderNotFound
from ccxt.base.errors import NotSupported
from ccxt.base.errors import RateLimitExceeded
from ccxt.base.errors import ExchangeNotAvailable
from ccxt.base.errors import OnMaintenance
from ccxt.base.errors import InvalidNonce
from ccxt.base.decimal_to_precision import TICK_SIZE
from ccxt.base.precise import Precise


class gemini(Exchange):

    def describe(self):
        return self.deep_extend(super(gemini, self).describe(), {
            'id': 'gemini',
            'name': 'Gemini',
            'countries': ['US'],
            'rateLimit': 1500,  # 200 for private API
            'version': 'v1',
            'has': {
                'cancelOrder': True,
                'CORS': None,
                'createDepositAddress': True,
                'createMarketOrder': None,
                'createOrder': True,
                'fetchBalance': True,
                'fetchBidsAsks': None,
                'fetchClosedOrders': None,
                'fetchDepositAddress': None,
                'fetchDeposits': None,
                'fetchMarkets': True,
                'fetchMyTrades': True,
                'fetchOHLCV': True,
                'fetchOpenOrders': True,
                'fetchOrder': True,
                'fetchOrderBook': True,
                'fetchOrders': None,
                'fetchTicker': True,
                'fetchTickers': True,
                'fetchTrades': True,
                'fetchTransactions': True,
                'fetchWithdrawals': None,
                'withdraw': True,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27816857-ce7be644-6096-11e7-82d6-3c257263229c.jpg',
                'api': {
                    'public': 'https://api.gemini.com',
                    'private': 'https://api.gemini.com',
                    'web': 'https://docs.gemini.com',
                },
                'www': 'https://gemini.com/',
                'doc': [
                    'https://docs.gemini.com/rest-api',
                    'https://docs.sandbox.gemini.com',
                ],
                'test': {
                    'public': 'https://api.sandbox.gemini.com',
                    'private': 'https://api.sandbox.gemini.com',
                    # use the True doc instead of the sandbox doc
                    # since they differ in parsing
                    # https://github.com/ccxt/ccxt/issues/7874
                    # https://github.com/ccxt/ccxt/issues/7894
                    'web': 'https://docs.gemini.com',
                },
                'fees': [
                    'https://gemini.com/api-fee-schedule',
                    'https://gemini.com/trading-fees',
                    'https://gemini.com/transfer-fees',
                ],
            },
            'api': {
                'web': {
                    'get': [
                        'rest-api',
                    ],
                },
                'public': {
                    'get': [
                        'v1/symbols',
                        'v1/symbols/details/{symbol}',
                        'v1/pubticker/{symbol}',
                        'v2/ticker/{symbol}',
                        'v2/candles/{symbol}/{timeframe}',
                        'v1/trades/{symbol}',
                        'v1/auction/{symbol}',
                        'v1/auction/{symbol}/history',
                        'v1/pricefeed',
                        'v1/book/{symbol}',
                        'v1/earn/rates',
                    ],
                },
                'private': {
                    'post': [
                        'v1/order/new',
                        'v1/order/cancel',
                        'v1/wrap/{symbol}',
                        'v1/order/cancel/session',
                        'v1/order/cancel/all',
                        'v1/order/status',
                        'v1/orders',
                        'v1/mytrades',
                        'v1/notionalvolume',
                        'v1/tradevolume',
                        'v1/clearing/new',
                        'v1/clearing/status',
                        'v1/clearing/cancel',
                        'v1/clearing/confirm',
                        'v1/balances',
                        'v1/notionalbalances/{currency}',
                        'v1/transfers',
                        'v1/addresses/{network}',
                        'v1/deposit/{network}/newAddress',
                        'v1/withdraw/{currency}',
                        'v1/account/transfer/{currency}',
                        'v1/payments/addbank',
                        'v1/payments/methods',
                        'v1/payments/sen/withdraw',
                        'v1/balances/earn',
                        'v1/earn/interest',
                        'v1/approvedAddresses/{network}/request',
                        'v1/approvedAddresses/account/{network}',
                        'v1/approvedAddresses/{network}/remove',
                        'v1/account',
                        'v1/account/create',
                        'v1/account/list',
                        'v1/heartbeat',
                    ],
                },
            },
            'precisionMode': TICK_SIZE,
            'fees': {
                'trading': {
                    'taker': 0.0035,
                    'maker': 0.001,
                },
            },
            'httpExceptions': {
                '400': BadRequest,  # Auction not open or paused, ineligible timing, market not open, or the request was malformed, in the case of a private API request, missing or malformed Gemini private API authentication headers
                '403': PermissionDenied,  # The API key is missing the role necessary to access self private API endpoint
                '404': OrderNotFound,  # Unknown API entry point or Order not found
                '406': InsufficientFunds,  # Insufficient Funds
                '429': RateLimitExceeded,  # Rate Limiting was applied
                '500': ExchangeError,  # The server encountered an error
                '502': ExchangeNotAvailable,  # Technical issues are preventing the request from being satisfied
                '503': OnMaintenance,  # The exchange is down for maintenance
            },
            'timeframes': {
                '1m': '1m',
                '5m': '5m',
                '15m': '15m',
                '30m': '30m',
                '1h': '1hr',
                '6h': '6hr',
                '1d': '1day',
            },
            'exceptions': {
                'exact': {
                    'AuctionNotOpen': BadRequest,  # Failed to place an auction-only order because there is no current auction open for self symbol
                    'ClientOrderIdTooLong': BadRequest,  # The Client Order ID must be under 100 characters
                    'ClientOrderIdMustBeString': BadRequest,  # The Client Order ID must be a string
                    'ConflictingOptions': BadRequest,  # New orders using a combination of order execution options are not supported
                    'EndpointMismatch': BadRequest,  # The request was submitted to an endpoint different than the one in the payload
                    'EndpointNotFound': BadRequest,  # No endpoint was specified
                    'IneligibleTiming': BadRequest,  # Failed to place an auction order for the current auction on self symbol because the timing is not eligible, new orders may only be placed before the auction begins.
                    'InsufficientFunds': InsufficientFunds,  # The order was rejected because of insufficient funds
                    'InvalidJson': BadRequest,  # The JSON provided is invalid
                    'InvalidNonce': InvalidNonce,  # The nonce was not greater than the previously used nonce, or was not present
                    'InvalidOrderType': InvalidOrder,  # An unknown order type was provided
                    'InvalidPrice': InvalidOrder,  # For new orders, the price was invalid
                    'InvalidQuantity': InvalidOrder,  # A negative or otherwise invalid quantity was specified
                    'InvalidSide': InvalidOrder,  # For new orders, and invalid side was specified
                    'InvalidSignature': AuthenticationError,  # The signature did not match the expected signature
                    'InvalidSymbol': BadRequest,  # An invalid symbol was specified
                    'InvalidTimestampInPayload': BadRequest,  # The JSON payload contained a timestamp parameter with an unsupported value.
                    'Maintenance': OnMaintenance,  # The system is down for maintenance
                    'MarketNotOpen': InvalidOrder,  # The order was rejected because the market is not accepting new orders
                    'MissingApikeyHeader': AuthenticationError,  # The X-GEMINI-APIKEY header was missing
                    'MissingOrderField': InvalidOrder,  # A required order_id field was not specified
                    'MissingRole': AuthenticationError,  # The API key used to access self endpoint does not have the required role assigned to it
                    'MissingPayloadHeader': AuthenticationError,  # The X-GEMINI-PAYLOAD header was missing
                    'MissingSignatureHeader': AuthenticationError,  # The X-GEMINI-SIGNATURE header was missing
                    'NoSSL': AuthenticationError,  # You must use HTTPS to access the API
                    'OptionsMustBeArray': BadRequest,  # The options parameter must be an array.
                    'OrderNotFound': OrderNotFound,  # The order specified was not found
                    'RateLimit': RateLimitExceeded,  # Requests were made too frequently. See Rate Limits below.
                    'System': ExchangeError,  # We are experiencing technical issues
                    'UnsupportedOption': BadRequest,  # This order execution option is not supported.
                },
                'broad': {
                    'The Gemini Exchange is currently undergoing maintenance.': OnMaintenance,  # The Gemini Exchange is currently undergoing maintenance. Please check https://status.gemini.com/ for more information.
                    'We are investigating technical issues with the Gemini Exchange.': ExchangeNotAvailable,  # We are investigating technical issues with the Gemini Exchange. Please check https://status.gemini.com/ for more information.
                },
            },
            'options': {
                'fetchMarketsMethod': 'fetch_markets_from_web',
                'fetchTickerMethod': 'fetchTickerV1',  # fetchTickerV1, fetchTickerV2, fetchTickerV1AndV2
            },
        })

    async def fetch_markets(self, params={}):
        method = self.safe_value(self.options, 'fetchMarketsMethod', 'fetch_markets_from_api')
        return await getattr(self, method)(params)

    async def fetch_markets_from_web(self, params={}):
        response = await self.webGetRestApi(params)
        sections = response.split('<h1 id="symbols-and-minimums">Symbols and minimums</h1>')
        numSections = len(sections)
        error = self.id + ' the ' + self.name + ' API doc HTML markup has changed, breaking the parser of order limits and precision info for ' + self.name + ' markets.'
        if numSections != 2:
            raise NotSupported(error)
        tables = sections[1].split('tbody>')
        numTables = len(tables)
        if numTables < 2:
            raise NotSupported(error)
        rows = tables[1].split("\n<tr>\n")  # eslint-disable-line quotes
        numRows = len(rows)
        if numRows < 2:
            raise NotSupported(error)
        result = []
        # skip the first element(empty string)
        for i in range(1, numRows):
            row = rows[i]
            cells = row.split("</td>\n")  # eslint-disable-line quotes
            numCells = len(cells)
            if numCells < 5:
                raise NotSupported(error)
            #     [
            #         '<td>btcusd',  # currency
            #         '<td>0.00001 BTC(1e-5)',  # min order size
            #         '<td>0.00000001 BTC(1e-8)',  # tick size
            #         '<td>0.01 USD',  # quote currency price increment
            #         '</tr>'
            #     ]
            marketId = cells[0].replace('<td>', '')
            # base = self.safe_currency_code(baseId)
            minAmountString = cells[1].replace('<td>', '')
            minAmountParts = minAmountString.split(' ')
            minAmount = self.safe_number(minAmountParts, 0)
            amountPrecisionString = cells[2].replace('<td>', '')
            amountPrecisionParts = amountPrecisionString.split(' ')
            amountPrecision = self.safe_number(amountPrecisionParts, 0)
            idLength = len(marketId) - 0
            startingIndex = idLength - 3
            quoteId = marketId[startingIndex:idLength]
            quote = self.safe_currency_code(quoteId)
            pricePrecisionString = cells[3].replace('<td>', '')
            pricePrecisionParts = pricePrecisionString.split(' ')
            pricePrecision = self.safe_number(pricePrecisionParts, 0)
            baseId = marketId.replace(quoteId, '')
            base = self.safe_currency_code(baseId)
            symbol = base + '/' + quote
            active = None
            result.append({
                'id': marketId,
                'info': row,
                'symbol': symbol,
                'base': base,
                'quote': quote,
                'baseId': baseId,
                'quoteId': quoteId,
                'type': 'spot',
                'spot': True,
                'active': active,
                'precision': {
                    'amount': amountPrecision,
                    'price': pricePrecision,
                },
                'limits': {
                    'amount': {
                        'min': minAmount,
                        'max': None,
                    },
                    'price': {
                        'min': None,
                        'max': None,
                    },
                    'cost': {
                        'min': None,
                        'max': None,
                    },
                },
            })
        return result

    async def fetch_markets_from_api(self, params={}):
        response = await self.publicGetV1Symbols(params)
        result = []
        for i in range(0, len(response)):
            marketId = response[i]
            market = marketId
            idLength = len(marketId) - 0
            baseId = marketId[0:idLength - 3]
            quoteId = marketId[idLength - 3:idLength]
            base = self.safe_currency_code(baseId)
            quote = self.safe_currency_code(quoteId)
            symbol = base + '/' + quote
            precision = {
                'amount': None,
                'price': None,
            }
            result.append({
                'id': marketId,
                'info': market,
                'symbol': symbol,
                'base': base,
                'quote': quote,
                'baseId': baseId,
                'quoteId': quoteId,
                'precision': precision,
                'limits': {
                    'amount': {
                        'min': None,
                        'max': None,
                    },
                    'price': {
                        'min': None,
                        'max': None,
                    },
                    'cost': {
                        'min': None,
                        'max': None,
                    },
                },
                'active': None,
            })
        return result

    async def fetch_order_book(self, symbol, limit=None, params={}):
        await self.load_markets()
        request = {
            'symbol': self.market_id(symbol),
        }
        if limit is not None:
            request['limit_bids'] = limit
            request['limit_asks'] = limit
        response = await self.publicGetV1BookSymbol(self.extend(request, params))
        return self.parse_order_book(response, symbol, None, 'bids', 'asks', 'price', 'amount')

    async def fetch_ticker_v1(self, symbol, params={}):
        await self.load_markets()
        market = self.market(symbol)
        request = {
            'symbol': market['id'],
        }
        response = await self.publicGetV1PubtickerSymbol(self.extend(request, params))
        #
        #     {
        #         "bid":"9117.95",
        #         "ask":"9117.96",
        #         "volume":{
        #             "BTC":"1615.46861748",
        #             "USD":"14727307.57545006088",
        #             "timestamp":1594982700000
        #         },
        #         "last":"9115.23"
        #     }
        #
        return self.parse_ticker(response, market)

    async def fetch_ticker_v2(self, symbol, params={}):
        await self.load_markets()
        market = self.market(symbol)
        request = {
            'symbol': market['id'],
        }
        response = await self.publicGetV2TickerSymbol(self.extend(request, params))
        #
        #     {
        #         "symbol":"BTCUSD",
        #         "open":"9080.58",
        #         "high":"9184.53",
        #         "low":"9063.56",
        #         "close":"9116.08",
        #         # Hourly prices descending for past 24 hours
        #         "changes":["9117.33","9105.69","9106.23","9120.35","9098.57","9114.53","9113.55","9128.01","9113.63","9133.49","9133.49","9137.75","9126.73","9103.91","9119.33","9123.04","9124.44","9117.57","9114.22","9102.33","9076.67","9074.72","9074.97","9092.05"],
        #         "bid":"9115.86",
        #         "ask":"9115.87"
        #     }
        #
        return self.parse_ticker(response, market)

    async def fetch_ticker_v1_and_v2(self, symbol, params={}):
        tickerA = await self.fetch_ticker_v1(symbol, params)
        tickerB = await self.fetch_ticker_v2(symbol, params)
        return self.deep_extend(tickerA, {
            'open': tickerB['open'],
            'high': tickerB['high'],
            'low': tickerB['low'],
            'change': tickerB['change'],
            'percentage': tickerB['percentage'],
            'average': tickerB['average'],
            'info': tickerB['info'],
        })

    async def fetch_ticker(self, symbol, params={}):
        method = self.safe_value(self.options, 'fetchTickerMethod', 'fetchTickerV1')
        return await getattr(self, method)(symbol, params)

    def parse_ticker(self, ticker, market=None):
        #
        # fetchTickers
        #
        #     {
        #         "pair": "BATUSD",
        #         "price": "0.20687",
        #         "percentChange24h": "0.0146"
        #     }
        #
        # fetchTickerV1
        #
        #     {
        #         "bid":"9117.95",
        #         "ask":"9117.96",
        #         "volume":{
        #             "BTC":"1615.46861748",
        #             "USD":"14727307.57545006088",
        #             "timestamp":1594982700000
        #         },
        #         "last":"9115.23"
        #     }
        #
        # fetchTickerV2
        #
        #     {
        #         "symbol":"BTCUSD",
        #         "open":"9080.58",
        #         "high":"9184.53",
        #         "low":"9063.56",
        #         "close":"9116.08",
        #         # Hourly prices descending for past 24 hours
        #         "changes":["9117.33","9105.69","9106.23","9120.35","9098.57","9114.53","9113.55","9128.01","9113.63","9133.49","9133.49","9137.75","9126.73","9103.91","9119.33","9123.04","9124.44","9117.57","9114.22","9102.33","9076.67","9074.72","9074.97","9092.05"],
        #         "bid":"9115.86",
        #         "ask":"9115.87"
        #     }
        #
        volume = self.safe_value(ticker, 'volume', {})
        timestamp = self.safe_integer(volume, 'timestamp')
        symbol = None
        marketId = self.safe_string(ticker, 'pair')
        baseId = None
        quoteId = None
        base = None
        quote = None
        if marketId is not None:
            if marketId in self.markets_by_id:
                market = self.markets_by_id[marketId]
            else:
                idLength = len(marketId) - 0
                if idLength == 7:
                    baseId = marketId[0:4]
                    quoteId = marketId[4:7]
                else:
                    baseId = marketId[0:3]
                    quoteId = marketId[3:6]
                base = self.safe_currency_code(baseId)
                quote = self.safe_currency_code(quoteId)
                symbol = base + '/' + quote
        if (symbol is None) and (market is not None):
            symbol = market['symbol']
            baseId = market['baseId'].upper()
            quoteId = market['quoteId'].upper()
            base = market['base']
            quote = market['quote']
        price = self.safe_number(ticker, 'price')
        last = self.safe_number_2(ticker, 'last', 'close', price)
        percentage = self.safe_number(ticker, 'percentChange24h')
        open = self.safe_number(ticker, 'open')
        baseVolume = self.safe_number(volume, baseId)
        quoteVolume = self.safe_number(volume, quoteId)
        vwap = self.vwap(baseVolume, quoteVolume)
        return self.safe_ticker({
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': self.iso8601(timestamp),
            'high': self.safe_number(ticker, 'high'),
            'low': self.safe_number(ticker, 'low'),
            'bid': self.safe_number(ticker, 'bid'),
            'bidVolume': None,
            'ask': self.safe_number(ticker, 'ask'),
            'askVolume': None,
            'vwap': vwap,
            'open': open,
            'close': last,
            'last': last,
            'previousClose': None,  # previous day close
            'change': None,
            'percentage': percentage,
            'average': None,
            'baseVolume': baseVolume,
            'quoteVolume': quoteVolume,
            'info': ticker,
        }, market)

    async def fetch_tickers(self, symbols=None, params={}):
        await self.load_markets()
        response = await self.publicGetV1Pricefeed(params)
        #
        #     [
        #         {
        #             "pair": "BATUSD",
        #             "price": "0.20687",
        #             "percentChange24h": "0.0146"
        #         },
        #         {
        #             "pair": "LINKETH",
        #             "price": "0.018",
        #             "percentChange24h": "0.0000"
        #         },
        #     ]
        #
        return self.parse_tickers(response, symbols)

    def parse_trade(self, trade, market=None):
        #
        # public fetchTrades
        #
        #     {
        #         "timestamp":1601617445,
        #         "timestampms":1601617445144,
        #         "tid":14122489752,
        #         "price":"0.46476",
        #         "amount":"28.407209",
        #         "exchange":"gemini",
        #         "type":"buy"
        #     }
        #
        timestamp = self.safe_integer(trade, 'timestampms')
        id = self.safe_string(trade, 'tid')
        orderId = self.safe_string(trade, 'order_id')
        feeCurrencyId = self.safe_string(trade, 'fee_currency')
        feeCurrencyCode = self.safe_currency_code(feeCurrencyId)
        fee = {
            'cost': self.safe_number(trade, 'fee_amount'),
            'currency': feeCurrencyCode,
        }
        priceString = self.safe_string(trade, 'price')
        amountString = self.safe_string(trade, 'amount')
        price = self.parse_number(priceString)
        amount = self.parse_number(amountString)
        cost = self.parse_number(Precise.string_mul(priceString, amountString))
        type = None
        side = self.safe_string_lower(trade, 'type')
        symbol = self.safe_symbol(None, market)
        return {
            'id': id,
            'order': orderId,
            'info': trade,
            'timestamp': timestamp,
            'datetime': self.iso8601(timestamp),
            'symbol': symbol,
            'type': type,
            'side': side,
            'takerOrMaker': None,
            'price': price,
            'cost': cost,
            'amount': amount,
            'fee': fee,
        }

    async def fetch_trades(self, symbol, since=None, limit=None, params={}):
        await self.load_markets()
        market = self.market(symbol)
        request = {
            'symbol': market['id'],
        }
        response = await self.publicGetV1TradesSymbol(self.extend(request, params))
        #
        #     [
        #         {
        #             "timestamp":1601617445,
        #             "timestampms":1601617445144,
        #             "tid":14122489752,
        #             "price":"0.46476",
        #             "amount":"28.407209",
        #             "exchange":"gemini",
        #             "type":"buy"
        #         },
        #     ]
        #
        return self.parse_trades(response, market, since, limit)

    async def fetch_balance(self, params={}):
        await self.load_markets()
        response = await self.privatePostV1Balances(params)
        result = {'info': response}
        for i in range(0, len(response)):
            balance = response[i]
            currencyId = self.safe_string(balance, 'currency')
            code = self.safe_currency_code(currencyId)
            account = self.account()
            account['free'] = self.safe_string(balance, 'available')
            account['total'] = self.safe_string(balance, 'amount')
            result[code] = account
        return self.parse_balance(result)

    def parse_order(self, order, market=None):
        timestamp = self.safe_integer(order, 'timestampms')
        amount = self.safe_number(order, 'original_amount')
        remaining = self.safe_number(order, 'remaining_amount')
        filled = self.safe_number(order, 'executed_amount')
        status = 'closed'
        if order['is_live']:
            status = 'open'
        if order['is_cancelled']:
            status = 'canceled'
        price = self.safe_number(order, 'price')
        average = self.safe_number(order, 'avg_execution_price')
        type = self.safe_string(order, 'type')
        if type == 'exchange limit':
            type = 'limit'
        elif type == 'market buy' or type == 'market sell':
            type = 'market'
        else:
            type = order['type']
        fee = None
        marketId = self.safe_string(order, 'symbol')
        symbol = self.safe_symbol(marketId, market)
        id = self.safe_string(order, 'order_id')
        side = self.safe_string_lower(order, 'side')
        clientOrderId = self.safe_string(order, 'client_order_id')
        return self.safe_order({
            'id': id,
            'clientOrderId': clientOrderId,
            'info': order,
            'timestamp': timestamp,
            'datetime': self.iso8601(timestamp),
            'lastTradeTimestamp': None,
            'status': status,
            'symbol': symbol,
            'type': type,
            'timeInForce': None,
            'postOnly': None,
            'side': side,
            'price': price,
            'stopPrice': None,
            'average': average,
            'cost': None,
            'amount': amount,
            'filled': filled,
            'remaining': remaining,
            'fee': fee,
            'trades': None,
        })

    async def fetch_order(self, id, symbol=None, params={}):
        await self.load_markets()
        request = {
            'order_id': id,
        }
        response = await self.privatePostV1OrderStatus(self.extend(request, params))
        return self.parse_order(response)

    async def fetch_open_orders(self, symbol=None, since=None, limit=None, params={}):
        await self.load_markets()
        response = await self.privatePostV1Orders(params)
        market = None
        if symbol is not None:
            market = self.market(symbol)  # throws on non-existent symbol
        return self.parse_orders(response, market, since, limit)

    async def create_order(self, symbol, type, side, amount, price=None, params={}):
        await self.load_markets()
        if type == 'market':
            raise ExchangeError(self.id + ' allows limit orders only')
        nonce = self.nonce()
        request = {
            'client_order_id': str(nonce),
            'symbol': self.market_id(symbol),
            'amount': str(amount),
            'price': str(price),
            'side': side,
            'type': 'exchange limit',  # gemini allows limit orders only
        }
        response = await self.privatePostV1OrderNew(self.extend(request, params))
        return {
            'info': response,
            'id': response['order_id'],
        }

    async def cancel_order(self, id, symbol=None, params={}):
        await self.load_markets()
        request = {
            'order_id': id,
        }
        return await self.privatePostV1OrderCancel(self.extend(request, params))

    async def fetch_my_trades(self, symbol=None, since=None, limit=None, params={}):
        if symbol is None:
            raise ArgumentsRequired(self.id + ' fetchMyTrades() requires a symbol argument')
        await self.load_markets()
        market = self.market(symbol)
        request = {
            'symbol': market['id'],
        }
        if limit is not None:
            request['limit_trades'] = limit
        if since is not None:
            request['timestamp'] = int(since / 1000)
        response = await self.privatePostV1Mytrades(self.extend(request, params))
        return self.parse_trades(response, market, since, limit)

    async def withdraw(self, code, amount, address, tag=None, params={}):
        tag, params = self.handle_withdraw_tag_and_params(tag, params)
        self.check_address(address)
        await self.load_markets()
        currency = self.currency(code)
        request = {
            'currency': currency['id'],
            'amount': amount,
            'address': address,
        }
        response = await self.privatePostV1WithdrawCurrency(self.extend(request, params))
        return {
            'info': response,
            'id': self.safe_string(response, 'txHash'),
        }

    def nonce(self):
        return self.milliseconds()

    async def fetch_transactions(self, code=None, since=None, limit=None, params={}):
        await self.load_markets()
        request = {}
        if limit is not None:
            request['limit_transfers'] = limit
        if since is not None:
            request['timestamp'] = since
        response = await self.privatePostV1Transfers(self.extend(request, params))
        return self.parse_transactions(response)

    def parse_transaction(self, transaction, currency=None):
        timestamp = self.safe_integer(transaction, 'timestampms')
        currencyId = self.safe_string(transaction, 'currency')
        code = self.safe_currency_code(currencyId, currency)
        address = self.safe_string(transaction, 'destination')
        type = self.safe_string_lower(transaction, 'type')
        status = 'pending'
        # When deposits show as Advanced or Complete they are available for trading.
        if transaction['status']:
            status = 'ok'
        fee = None
        feeAmount = self.safe_number(transaction, 'feeAmount')
        if feeAmount is not None:
            fee = {
                'cost': feeAmount,
                'currency': code,
            }
        return {
            'info': transaction,
            'id': self.safe_string(transaction, 'eid'),
            'txid': self.safe_string(transaction, 'txHash'),
            'timestamp': timestamp,
            'datetime': self.iso8601(timestamp),
            'address': address,
            'tag': None,  # or is it defined?
            'type': type,  # direction of the transaction,('deposit' | 'withdraw')
            'amount': self.safe_number(transaction, 'amount'),
            'currency': code,
            'status': status,
            'updated': None,
            'fee': fee,
        }

    def sign(self, path, api='public', method='GET', params={}, headers=None, body=None):
        url = '/' + self.implode_params(path, params)
        query = self.omit(params, self.extract_params(path))
        if api == 'private':
            self.check_required_credentials()
            apiKey = self.apiKey
            if apiKey.find('account') < 0:
                raise AuthenticationError(self.id + ' sign() requires an account-key, master-keys are not-supported')
            nonce = self.nonce()
            request = self.extend({
                'request': url,
                'nonce': nonce,
            }, query)
            payload = self.json(request)
            payload = self.string_to_base64(payload)
            signature = self.hmac(payload, self.encode(self.secret), hashlib.sha384)
            headers = {
                'Content-Type': 'text/plain',
                'X-GEMINI-APIKEY': self.apiKey,
                'X-GEMINI-PAYLOAD': self.decode(payload),
                'X-GEMINI-SIGNATURE': signature,
            }
        else:
            if query:
                url += '?' + self.urlencode(query)
        url = self.urls['api'][api] + url
        return {'url': url, 'method': method, 'body': body, 'headers': headers}

    def handle_errors(self, httpCode, reason, url, method, headers, body, response, requestHeaders, requestBody):
        if response is None:
            if isinstance(body, basestring):
                feedback = self.id + ' ' + body
                self.throw_broadly_matched_exception(self.exceptions['broad'], body, feedback)
            return  # fallback to default error handler
        #
        #     {
        #         "result": "error",
        #         "reason": "BadNonce",
        #         "message": "Out-of-sequence nonce <1234> precedes previously used nonce <2345>"
        #     }
        #
        result = self.safe_string(response, 'result')
        if result == 'error':
            reason = self.safe_string(response, 'reason')
            message = self.safe_string(response, 'message')
            feedback = self.id + ' ' + message
            self.throw_exactly_matched_exception(self.exceptions['exact'], reason, feedback)
            self.throw_exactly_matched_exception(self.exceptions['exact'], message, feedback)
            self.throw_broadly_matched_exception(self.exceptions['broad'], message, feedback)
            raise ExchangeError(feedback)  # unknown message

    async def create_deposit_address(self, code, params={}):
        await self.load_markets()
        currency = self.currency(code)
        request = {
            'currency': currency['id'],
        }
        response = await self.privatePostV1DepositCurrencyNewAddress(self.extend(request, params))
        address = self.safe_string(response, 'address')
        self.check_address(address)
        return {
            'currency': code,
            'address': address,
            'tag': None,
            'info': response,
        }

    async def fetch_ohlcv(self, symbol, timeframe='5m', since=None, limit=None, params={}):
        await self.load_markets()
        market = self.market(symbol)
        request = {
            'timeframe': self.timeframes[timeframe],
            'symbol': market['id'],
        }
        response = await self.publicGetV2CandlesSymbolTimeframe(self.extend(request, params))
        #
        #     [
        #         [1591515000000,0.02509,0.02509,0.02509,0.02509,0],
        #         [1591514700000,0.02503,0.02509,0.02503,0.02509,44.6405],
        #         [1591514400000,0.02503,0.02503,0.02503,0.02503,0],
        #     ]
        #
        return self.parse_ohlcvs(response, market, timeframe, since, limit)
