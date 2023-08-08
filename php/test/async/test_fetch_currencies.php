<?php
namespace ccxt;
use \ccxt\Precise;
use React\Async;
use React\Promise;

// ----------------------------------------------------------------------------

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

// -----------------------------------------------------------------------------
include_once __DIR__ . '/../base/test_currency.php';

function test_fetch_currencies($exchange, $skipped_properties) {
    return Async\async(function () use ($exchange, $skipped_properties) {
        $method = 'fetchCurrencies';
        // const isNative = exchange.has['fetchCurrencies'] && exchange.has['fetchCurrencies'] !== 'emulated';
        $currencies = Async\await($exchange->fetch_currencies());
        // todo: try to invent something to avoid undefined undefined, i.e. maybe move into private and force it to have a value
        if ($currencies !== null) {
            $values = is_array($currencies) ? array_values($currencies) : array();
            for ($i = 0; $i < count($values); $i++) {
                test_currency($exchange, $skipped_properties, $method, $values[$i]);
            }
        }
    }) ();
}
