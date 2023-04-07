
import assert from 'assert';
import testSharedMethods from './test.sharedMethods.js';
import testLedgerItem from './test.ledgerItem.js';

async function testFetchLedger (exchange, code) {
    const method = 'fetchLedger';
    const items = await exchange.fetchLedger (code);
    assert (Array.isArray (items), exchange.id + ' ' + method + ' ' + code + ' must return an array. ' + exchange.json (items));
    const now = exchange.milliseconds ();
    console.log (exchange.id, method, 'fetched', items.length, 'entries, asserting each ...');
    for (let i = 0; i < items.length; i++) {
        testLedgerItem (exchange, method, items[i], code, now);
    }
    testSharedMethods.assertTimestampOrder (exchange, method, code, items);
    //
    const itemMethod = 'fetchLedgerItem'; // todo: create separate testfile
    if (exchange.has[itemMethod]) {
        if (items.length >= 1) {
            const item = await exchange[itemMethod] (items[0].id);
            testLedgerItem (exchange, itemMethod, item, code, now);
        }
    }
}

export default testFetchLedger;
