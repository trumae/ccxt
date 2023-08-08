
import assert from 'assert';
import testOrderBook from './base/test.orderBook.js';

async function testFetchOrderBooks (exchange, skippedProperties) {
    const method = 'fetchOrderBooks';
    const symbol = exchange.symbols[0];
    const orderBooks = await exchange.fetchOrderBooks ([ symbol ]);
    assert (typeof orderBooks === 'object', exchange.id + ' ' + method + ' must return an object. ' + exchange.json (orderBooks));
    const orderBookKeys = Object.keys (orderBooks);
    assert (orderBookKeys.length > 0, exchange.id + ' ' + method + ' returned 0 length data');
    for (let i = 0; i < orderBookKeys.length; i++) {
        const symbol = orderBookKeys[i];
        testOrderBook (exchange, skippedProperties, method, orderBooks[symbol], symbol);
    }
}

export default testFetchOrderBooks;
