<?php

namespace ccxt;

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

use Exception; // a common import
use ccxt\abstract\binancecoinm as binance;

class binancecoinm extends binance {

    public function describe() {
        return $this->deep_extend(parent::describe(), array(
            'id' => 'binancecoinm',
            'name' => 'Binance COIN-M',
            'urls' => array(
                'logo' => 'https://user-images.githubusercontent.com/1294454/117738721-668c8d80-b205-11eb-8c49-3fad84c4a07f.jpg',
                'doc' => array(
                    'https://binance-docs.github.io/apidocs/delivery/en/',
                    'https://binance-docs.github.io/apidocs/spot/en',
                ),
            ),
            'has' => array(
                'CORS' => null,
                'spot' => false,
                'margin' => false,
                'swap' => true,
                'future' => true,
                'option' => null,
                'createStopMarketOrder' => true,
            ),
            'options' => array(
                'fetchMarkets' => array( 'inverse' ),
                'defaultSubType' => 'inverse',
                'leverageBrackets' => null,
            ),
        ));
    }

    public function transfer_in(string $code, $amount, $params = array ()) {
        // transfer from spot wallet to coinm futures wallet
        return $this->futuresTransfer ($code, $amount, 3, $params);
    }

    public function transfer_out(string $code, $amount, $params = array ()) {
        // transfer from coinm futures wallet to spot wallet
        return $this->futuresTransfer ($code, $amount, 4, $params);
    }
}
