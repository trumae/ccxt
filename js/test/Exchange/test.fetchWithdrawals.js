

// ----------------------------------------------------------------------------

import assert from 'assert'
import testTransaction from './test.transaction.js'

// ----------------------------------------------------------------------------

export default async (exchange, code) => {

    if (exchange.has.fetchWithdrawals) {

        const transactions = await exchange.fetchWithdrawals (code)

        console.log ('fetched', transactions.length, 'withdrawals, asserting each...')

        assert (transactions instanceof Array)

        const now = Date.now ()

        for (let i = 0; i < transactions.length; i++) {
            const transaction = transactions[i]
            testTransaction (exchange, transaction, code, now)
        }

    } else {

        console.log ('fetching withdrawals not supported')
    }
}
