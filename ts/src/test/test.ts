// ----------------------------------------------------------------------------

// @ts-nocheck
/* eslint-disable */
import fs from 'fs';
import assert from 'assert';
import { Agent } from 'https';
import ccxt from '../../ccxt.js';
import HttpsProxyAgent from 'https-proxy-agent'
import { fileURLToPath, pathToFileURL } from 'url';
const __dirname = fileURLToPath (new URL ('.', import.meta.url)); // new URL('.', import.meta.url).pathname;

// ----------------------------------------------------------------------------
const [processPath, , exchangeId = null, exchangeSymbol = undefined] = process.argv.filter ((x) => !x.startsWith ('--'));
const verbose = process.argv.includes ('--verbose') || false;
const debug = process.argv.includes ('--debug') || false;
const sandbox = process.argv.includes ('--sandbox') || false;
const privateTest = process.argv.includes ('--private') || false;
const privateOnly = process.argv.includes ('--privateOnly') || false;
const info = process.argv.includes ('--info') || false;
const ext = import.meta.url.split('.')[1];
// ----------------------------------------------------------------------------
process.on ('uncaughtException',  (e) => { console.log (e, e.stack); process.exit (1) });
process.on ('unhandledRejection', (e) => { console.log (e, e.stack); process.exit (1) });

// ----------------------------------------------------------------------------
console.log ('\nTESTING (JS)', { 'exchange': exchangeId, 'symbol': exchangeSymbol || 'all' }, '\n');
//-----------------------------------------------------------------------------
const enableRateLimit = true;
const httpsAgent = new Agent ({
    'ecdhCurve': 'auto',
});

const timeout = 20000;
const exchange = new (ccxt)[exchangeId] ({
    httpsAgent,
    verbose,
    enableRateLimit,
    debug,
    timeout,
});
//-----------------------------------------------------------------------------
const get_test_name = (str) => str;
const testFiles = {};
const properties = Object.keys (exchange.has);
properties.push ('loadMarkets');
for (let i = 0; i < properties.length; i++) {
    const property = properties[i];
    const filePath = __dirname + '/Exchange/test.' + property ;
    if (fs.existsSync (filePath + '.' + ext)) {
        // eslint-disable-next-line global-require, import/no-dynamic-require, no-path-concat
        testFiles[property] = (await import (pathToFileURL (filePath + '.js')) as any)['default'];
    }
}
import errorsHierarchy from '../base/errorHierarchy.js';
Object.keys (errorsHierarchy)
    .forEach (async (error) => {
        const filePath = __dirname + '/errors/test.' + error;
        if (fs.existsSync (filePath + '.' + ext)) {
            // eslint-disable-next-line global-require, import/no-dynamic-require, no-path-concat
            testFiles[error] = (await import (pathToFileURL (filePath + '.js')) as any)['default'];
        }
    });

const AuthenticationError = ccxt.AuthenticationError;

// non-transpiled commons
const rootDir = __dirname + '/../../../';
const envVars = process.env;

class baseMainTestClass {}

function dump (...args) {
    console.log (...args);
}

function ioFileExists (path) {
    return fs.existsSync (path);
}

function ioFileRead (path, decode = true) {
    const content = fs.readFileSync (path, 'utf8');
    return decode ? JSON.parse (content) : content;
}

function exceptionMessage (exc) {
    return '[' + exc.constructor.name + '] ' + exc.message.slice (0, 500);
}

async function callMethod (methodName, exchange, args) {
    return await testFiles[methodName](exchange, ... args);
}

function addProxy (exchange, httpProxy) {
    // add real proxy agent
    exchange.agent = new HttpsProxyAgent (httpProxy);
}

function exitScript () {
    process.exit (0);
}

function getExchangeProp (exchange, prop, defaultValue = undefined) {
    return (prop in exchange) ? exchange[prop] : defaultValue;
}

function setExchangeProp (exchange, prop, value) {
    exchange[prop] = value;
}

async function testThrottle () {
    // todo: exists in py/php not in js
}

// *********************************
// ***** AUTO-TRANSPILER-START *****

export default class testMainClass extends baseMainTestClass {

    async init (exchange, symbol) {
        this.expandSettings(exchange, symbol);
        await this.startTest (exchange, symbol);
    }

    expandSettings (exchange, symbol) {
        const exchangeId = exchange.id;
        const keysGlobal = rootDir + 'keys.json';
        const keysLocal = rootDir + 'keys.local.json';
        const keysGlobalExists = ioFileExists (keysGlobal);
        const keysLocalExists = ioFileExists (keysLocal);
        const globalSettings = keysGlobalExists ? ioFileRead (keysGlobal) : {};
        const localSettings = keysLocalExists ? ioFileRead (keysLocal) : {};
        const allSettings = exchange.deepExtend (globalSettings, localSettings);
        const exchangeSettings = exchange.safeValue (allSettings, exchangeId, {});
        if (exchangeSettings) {
            const settingKeys = Object.keys (exchangeSettings);
            for (let i = 0; i < settingKeys.length; i++) {
                const key = settingKeys[i];
                if (exchangeSettings[key]) {
                    const existing = getExchangeProp (exchange, key, {});
                    setExchangeProp (exchange, key, exchange.deepExtend (existing, exchangeSettings[key]));
                }
            }
            // support simple proxy
            const proxy = getExchangeProp (exchange, 'httpProxy');
            if (proxy) {
                addProxy (exchange, proxy);
            }
        }
        // credentials
        const reqCreds = getExchangeProp (exchange, 're' + 'quiredCredentials'); // dont glue the r-e-q-u-i-r-e phrase, because leads to messed up transpilation
        const objkeys = Object.keys (reqCreds);
        for (let i = 0; i < objkeys.length; i++) {
            const credential = objkeys[i];
            const isRequired = reqCreds[credential];
            if (isRequired && getExchangeProp(exchange, credential) === undefined) {
                const fullKey = exchangeId + '_' + credential;
                const credentialEnvName = fullKey.toUpperCase (); // example: KRAKEN_APIKEY
                const credentialValue = (credentialEnvName in envVars) ? envVars[credentialEnvName] : undefined;
                if (credentialValue) {
                    setExchangeProp (exchange, credential, credentialValue);
                }
            }
        }
        // skipped tests
        const skippedFile = rootDir + 'skip-tests.json';
        const skippedSettings = ioFileRead (skippedFile);
        const skippedSettingsForExchange = exchange.safeValue (skippedSettings, exchangeId, {});
        // others
        if (exchange.safeValue (skippedSettingsForExchange, 'skip')) {
            dump ('[SKIPPED] exchange', exchangeId);
            exitScript();
        }
        if (exchange.alias) {
            dump ('[SKIPPED] Alias exchange. ', 'exchange', exchangeId, 'symbol', symbol);
            exitScript();
        }
        //
        this.skippedMethods = exchange.safeValue (skippedSettingsForExchange, 'skipMethods', {});
        this.checkedPublicTests = {};
    }

    padEnd (message, size) {
        // has to be transpilable
        let res = '';
        const missingSpace = size - message.length;
        if (missingSpace > 0) {
            for (let i = 0; i < missingSpace; i++) {
                res += ' ';
            }
        }
        return message + res;
    }

    async testMethod (methodName, exchange, args, isPublic) {
        const methodNameInTest = get_test_name (methodName);
        // if this is a private test, and the implementation was already tested in public, then no need to re-test it in private test (exception is fetchCurrencies, because our approach in exchange)
        if (!isPublic && (methodNameInTest in this.checkedPublicTests) && (methodName !== 'fetchCurrencies')) {
            return;
        }
        let skipMessage = undefined;
        const isFetchOhlcvEmulated = (methodName === 'fetchOHLCV' && exchange.has['fetchOHLCV'] === 'emulated'); // todo: remove emulation from base
        if ((methodName !== 'loadMarkets') && (!(methodName in exchange.has) || !exchange.has[methodName]) || isFetchOhlcvEmulated) {
            skipMessage = '[INFO:UNSUPPORTED_TEST]'; // keep it aligned with the longest message
        } else if (methodName in this.skippedMethods) {
            skipMessage = '[INFO:SKIPPED_TEST]';
        } else if (!(methodNameInTest in testFiles)) {
            skipMessage = '[INFO:UNIMPLEMENTED_TEST]';
        }
        if (skipMessage) {
            if (info) {
                dump (this.padEnd(skipMessage, 25), exchange.id, methodNameInTest);
            }
            return;
        }
        const argsStringified = '(' + args.join (',') + ')';
        if (info) {
            dump (this.padEnd('[INFO:TESTING]', 25), exchange.id, methodNameInTest, argsStringified);
        }
        let result = null;
        try {
            result = await callMethod (methodNameInTest, exchange, args);
            if (isPublic) {
                this.checkedPublicTests[methodNameInTest] = true;
            }
        } catch (e) {
            const isAuthError = (e instanceof AuthenticationError);
            if (!(isPublic && isAuthError)) {
                dump ('ERROR:', exceptionMessage(e), ' | Exception from: ', exchange.id, methodNameInTest, argsStringified);
                throw e;
            }
        }
        return result;
    }

    async testSafe (methodName, exchange, args, isPublic) {
        try {
            await this.testMethod(methodName, exchange, args, isPublic);
            return true;
        } catch (e) {
            return false;
        }
    }

    async runPublicTests (exchange, symbol) {
        const tests = {
            'loadMarkets': [],
            'fetchCurrencies': [],
            'fetchTicker': [symbol],
            'fetchTickers': [symbol],
            'fetchOHLCV': [symbol],
            'fetchTrades': [symbol],
            'fetchOrderBook': [symbol],
            'fetchL2OrderBook': [symbol],
            'fetchOrderBooks': [],
            'fetchBidsAsks': [],
            'fetchStatus': [],
            'fetchTime': [],
        };
        const market = exchange.market (symbol);
        const isSpot = market['spot'];
        if (isSpot) {
            tests['fetchCurrencies'] = [];
        } else {
            tests['fetchFundingRates'] = [symbol];
            tests['fetchFundingRate'] = [symbol];
            tests['fetchFundingRateHistory'] = [symbol];
            tests['fetchIndexOHLCV'] = [symbol];
            tests['fetchMarkOHLCV'] = [symbol];
            tests['fetchPremiumIndexOHLCV'] = [symbol];
        }
        this.publicTests = tests;
        const testNames = Object.keys (tests);
        const promises = [];
        for (let i = 0; i < testNames.length; i++) {
            const testName = testNames[i];
            const testArgs = tests[testName];
            promises.push (this.testSafe (testName, exchange, testArgs, true));
        }
        // todo - not yet ready in other langs too
        // promises.push(testThrottle());
        await Promise.all (promises);
        if (info) {
            dump (this.padEnd('[INFO:PUBLIC_TESTS_DONE]', 25), exchange.id);
        }
    }

    async loadExchange (exchange) {
        const markets = await exchange.loadMarkets ();
        assert (typeof exchange.markets === 'object', '.markets is not an object');
        assert (Array.isArray (exchange.symbols), '.symbols is not an array');
        const symbolsLength = exchange.symbols.length;
        const marketKeys = Object.keys (exchange.markets);
        const marketKeysLength = marketKeys.length;
        assert (symbolsLength > 0, '.symbols count <= 0 (less than or equal to zero)');
        assert (marketKeysLength > 0, '.markets objects keys length <= 0 (less than or equal to zero)');
        assert (symbolsLength === marketKeysLength, 'number of .symbols is not equal to the number of .markets');
        const symbols = [
            'BTC/CNY',
            'BTC/USD',
            'BTC/USDT',
            'BTC/EUR',
            'BTC/ETH',
            'ETH/BTC',
            'BTC/JPY',
            'ETH/EUR',
            'ETH/JPY',
            'ETH/CNY',
            'ETH/USD',
            'LTC/CNY',
            'DASH/BTC',
            'DOGE/BTC',
            'BTC/AUD',
            'BTC/PLN',
            'USD/SLL',
            'BTC/RUB',
            'BTC/UAH',
            'LTC/BTC',
            'EUR/USD',
        ];
        const resultSymbols = [];
        const exchangeSpecificSymbols = exchange.symbols;
        for (let i = 0; i < exchangeSpecificSymbols.length; i++) {
            const symbol = exchangeSpecificSymbols[i];
            if (exchange.inArray(symbol, symbols)) {
                resultSymbols.push (symbol);
            }
        }
        let resultMsg = '';
        const resultLength = resultSymbols.length;
        const exchangeSymbolsLength = exchange.symbols.length;
        if (resultLength > 0) {
            if (exchangeSymbolsLength > resultLength) {
                resultMsg = resultSymbols.join (', ') + ' + more...';
            } else {
                resultMsg = resultSymbols.join (', ');
            }
        }
        dump ('Exchange loaded', exchangeSymbolsLength, 'symbols', resultMsg);
    }

    getTestSymbol (exchange, isSpot, symbols) {
        let symbol = undefined;
        for (let i = 0; i < symbols.length; i++) {
            const s = symbols[i];
            const market = exchange.safeValue (exchange.markets, s);
            if (market !== undefined) {
                const active = exchange.safeValue (market, 'active');
                if (active || (active === undefined)) {
                    symbol = s;
                    break;
                }
            }
        }
        return symbol;
    }

    getExchangeCode (exchange, codes = undefined) {
        if (codes === undefined) {
            codes = ['BTC', 'ETH', 'XRP', 'LTC', 'BCH', 'EOS', 'BNB', 'BSV', 'USDT'];
        }
        const code = codes[0];
        for (let i = 0; i < codes.length; i++) {
            if (codes[i] in exchange.currencies) {
                return codes[i];
            }
        }
        return code;
    }

    getMarketsFromExchange (exchange, spot = true) {
        let res = {};
        let markets = exchange.markets;
        const keys = Object.keys(markets);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const market = markets[key];
            if (spot && market['spot']) {
                res[market['symbol']] = market;
            } else if (!spot && !market['spot']) {
                res[market['symbol']] = market;
            }
        }
        return res;
    }

    getValidSymbol (exchange, spot = true) {
        const currentTypeMarkets = this.getMarketsFromExchange (exchange, spot);
        const codes = [
            'BTC',
            'ETH',
            'XRP',
            'LTC',
            'BCH',
            'EOS',
            'BNB',
            'BSV',
            'USDT',
            'ATOM',
            'BAT',
            'BTG',
            'DASH',
            'DOGE',
            'ETC',
            'IOTA',
            'LSK',
            'MKR',
            'NEO',
            'PAX',
            'QTUM',
            'TRX',
            'TUSD',
            'USD',
            'USDC',
            'WAVES',
            'XEM',
            'XMR',
            'ZEC',
            'ZRX',
        ];
        const spotSymbols = [
            'BTC/USD',
            'BTC/USDT',
            'BTC/CNY',
            'BTC/EUR',
            'BTC/ETH',
            'ETH/BTC',
            'ETH/USD',
            'ETH/USDT',
            'BTC/JPY',
            'LTC/BTC',
            'ZRX/WETH',
            'EUR/USD',
        ];
        const swapSymbols = [
            'BTC/USDT:USDT',
            'BTC/USD:USD',
            'ETH/USDT:USDT',
            'ETH/USD:USD',
            'LTC/USDT:USDT',
            'DOGE/USDT:USDT',
            'ADA/USDT:USDT',
            'BTC/USD:BTC',
            'ETH/USD:ETH',
        ];
        const targetSymbols = spot ? spotSymbols : swapSymbols;
        let symbol = this.getTestSymbol (exchange, spot, targetSymbols);
        // if symbols wasn't found from above hardcoded list, then try to locate any symbol which has our target hardcoded 'base' code
        if (symbol === undefined) {
            for (let i = 0; i < codes.length; i++) {
                const currentCode = codes[i];
                const marketsArrayForCurrentCode = exchange.filterBy (currentTypeMarkets, 'base', currentCode);
                const indexedMkts = exchange.indexBy (marketsArrayForCurrentCode, 'symbol');
                const symbolsArrayForCurrentCode = Object.keys (indexedMkts);
                if (symbolsArrayForCurrentCode.length) {
                    symbol = this.getTestSymbol (exchange, spot, symbolsArrayForCurrentCode);
                    break;
                }
            }
        }
        // if there wasn't found any symbol with our hardcoded 'base' code, then just try to find symbols that are 'active'
        if (symbol === undefined) {
            const activeMarkets = exchange.filterBy (currentTypeMarkets, 'active', true);
            const activeSymbols = Object.keys (activeMarkets);
            symbol = this.getTestSymbol (exchange, spot, activeSymbols);
        }
        if (symbol === undefined) {
            const values = Object.values (currentTypeMarkets);
            const first = values[0];
            if (first !== undefined) {
                symbol = first['symbol'];
            }
        }
        return symbol;
    }

    async testExchange (exchange, providedSymbol = undefined) {
        let spotSymbol = undefined;
        let swapSymbol = undefined;
        if (providedSymbol !== undefined) {
            const market = exchange.market(providedSymbol);
            if (market['spot']) {
                spotSymbol = providedSymbol;
            } else {
                swapSymbol = providedSymbol;
            }
        } else {
            if (exchange.has['spot']) {
                spotSymbol = this.getValidSymbol (exchange, true);
            }
            if (exchange.has['swap']) {
                swapSymbol = this.getValidSymbol (exchange, false);
            } 
        }
        if (spotSymbol !== undefined) {
            dump ('Selected SPOT SYMBOL:', spotSymbol);
        }
        if (swapSymbol !== undefined) {
            dump ('Selected SWAP SYMBOL:', swapSymbol);
        }
        if (!privateOnly) {
            if (exchange.has['spot'] && spotSymbol !== undefined) {
                exchange.options['type'] = 'spot';
                await this.runPublicTests (exchange, spotSymbol);
            }
            if (exchange.has['swap'] && swapSymbol !== undefined) {
                exchange.options['type'] = 'swap';
                await this.runPublicTests (exchange, swapSymbol);
            }
        }
        if (privateTest || privateOnly) {
            if (exchange.has['spot'] && spotSymbol !== undefined) {
                exchange.options['defaultType'] = 'spot';
                await this.runPrivateTests (exchange, spotSymbol);
            }
            if (exchange.has['swap'] && swapSymbol !== undefined) {
                exchange.options['defaultType'] = 'swap';
                await this.runPrivateTests (exchange, swapSymbol);
            }
        }
    }

    async runPrivateTests (exchange, symbol) {
        if (!exchange.checkRequiredCredentials (false)) {
            dump ('[Skipping private tests]', 'Keys not found');
            return;
        }
        const code = this.getExchangeCode (exchange);
        // if (exchange.extendedTest) {
        //     await test ('InvalidNonce', exchange, symbol);
        //     await test ('OrderNotFound', exchange, symbol);
        //     await test ('InvalidOrder', exchange, symbol);
        //     await test ('InsufficientFunds', exchange, symbol, balance); // danger zone - won't execute with non-empty balance
        // }
        const tests = {
            'signIn': [exchange],
            'fetchBalance': [exchange],
            'fetchAccounts': [exchange],
            'fetchTransactionFees': [exchange],
            'fetchTradingFees': [exchange],
            'fetchStatus': [exchange],
            'fetchOrders': [exchange, symbol],
            'fetchOpenOrders': [exchange, symbol],
            'fetchClosedOrders': [exchange, symbol],
            'fetchMyTrades': [exchange, symbol],
            'fetchLeverageTiers': [exchange, symbol],
            'fetchLedger': [exchange, code],
            'fetchTransactions': [exchange, code],
            'fetchDeposits': [exchange, code],
            'fetchWithdrawals': [exchange, code],
            'fetchBorrowRates': [exchange, code],
            'fetchBorrowRate': [exchange, code],
            'fetchBorrowInterest': [exchange, code, symbol],
            'addMargin': [exchange, symbol],
            'reduceMargin': [exchange, symbol],
            'setMargin': [exchange, symbol],
            'setMarginMode': [exchange, symbol],
            'setLeverage': [exchange, symbol],
            'cancelAllOrders': [exchange, symbol],
            'cancelOrder': [exchange, symbol],
            'cancelOrders': [exchange, symbol],
            'fetchCanceledOrders': [exchange, symbol],
            'fetchClosedOrder': [exchange, symbol],
            'fetchOpenOrder': [exchange, symbol],
            'fetchOrder': [exchange, symbol],
            'fetchOrderTrades': [exchange, symbol],
            'fetchPosition': [exchange, symbol],
            'fetchDeposit': [exchange, code],
            'createDepositAddress': [exchange, code],
            'fetchDepositAddress': [exchange, code],
            'fetchDepositAddresses': [exchange, code],
            'fetchDepositAddressesByNetwork': [exchange, code],
            'editOrder': [exchange, symbol],
            'fetchBorrowRateHistory': [exchange, symbol],
            'fetchBorrowRatesPerSymbol': [exchange, symbol],
            'fetchLedgerEntry': [exchange, code],
            'fetchWithdrawal': [exchange, code],
            'transfer': [exchange, code],
            'withdraw': [exchange, code],
        };
        const market = exchange.market (symbol);
        const isSpot = market['spot'];
        if (isSpot) {
            tests['fetchCurrencies'] = [exchange, symbol];
        } else {
            // derivatives only
            tests['fetchPositions'] = [exchange, [symbol]];
            tests['fetchPosition'] = [exchange, symbol];
            tests['fetchPositionRisk'] = [exchange, symbol];
            tests['setPositionMode'] = [exchange, symbol];
            tests['setMarginMode'] = [exchange, symbol];
            tests['fetchOpenInterestHistory'] = [exchange, symbol];
            tests['fetchFundingRateHistory'] = [exchange, symbol];
            tests['fetchFundingHistory'] = [exchange, symbol];
        }
        const combinedPublicPrivateTests = exchange.deepExtend (this.publicTests, tests);
        const testNames = Object.keys (combinedPublicPrivateTests);
        const promises = [];
        for (let i = 0; i < testNames.length; i++) {
            const testName = testNames[i];
            const testArgs = combinedPublicPrivateTests[testName];
            promises.push (this.testSafe (testName, exchange, testArgs, false));
        }
        const results = await Promise.all (promises);
        const errors = [];
        for (let i = 0; i < testNames.length; i++) {
            const testName = testNames[i];
            const success = results[i];
            if (!success) {
                errors.push (testName);
            }
        }
        if (errors.length > 0) {
            throw new Error ('Failed private tests [' + market['type'] + ']: ' + errors.join (', '));
        } else {
            if (info) {
                dump (this.padEnd('[INFO:PRIVATE_TESTS_DONE]', 25), exchange.id);
            }
        }
    }

    async startTest (exchange, symbol) {
        // we don't need to test aliases
        if (exchange.alias) {
            return;
        }
        if (sandbox || getExchangeProp (exchange, 'sandbox')) {
            exchange.setSandboxMode (true);
        }
        await this.loadExchange (exchange);
        await this.testExchange (exchange, symbol);
    }
};

// ***** AUTO-TRANSPILER-END *****
// *******************************
(new testMainClass ()).init (exchange, exchangeSymbol);