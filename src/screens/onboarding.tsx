import React, { useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { useEffect, useState } from 'react';
import Coin from '../components/Coin'
import axios from 'axios'


const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}
const styles = StyleSheet.create({
  main: {
    flex: 1
  }
})
let priceBit: number;
let priceEth: number;
let priceStellar: number;
let priceRipple: number;
const Onboarding = () => {
    const originalUrl = 'https://api.cryptonator.com/api/ticker/btc-usd'
    let url = 'https://api.cryptonator.com/api/ticker/btc-usd'
    let urlEth = "https://api.cryptonator.com/api/ticker/eth-usd"
    let urlStellar = "https://api.cryptonator.com/api/full/xlm-usd"
    let urlRipple = "https://api.cryptonator.com/api/full/xrp-usd"
    const [bitcoin, setbitcoin] = useState(null)
    const [ethereum, setEthereum] = useState(null)
    const [stellar, setStellar] = useState(null)
    const [ripple, setRipple] = useState(null)
    const [refreshing, setRefreshing] = useState(false)

    const content = null
    useEffect(() => {
      axios.get(url)
        .then(response => {
          setbitcoin(response.data)
        })

      axios.get(urlEth)
        .then(response => {
          setEthereum(response.data)
        })

      axios.get(urlStellar)
        .then(response => {
          setStellar(response.data)
        })
      axios.get(urlRipple)
        .then(response => {
          setRipple(response.data)
        })


    }, [refreshing])



    if (bitcoin) {
      priceBit = bitcoin.ticker.price;
    } else {
      priceBit = 0;
    }
    if (ethereum) {
      priceEth = ethereum.ticker.price;
    } else {
      priceEth = 0;
    }
    if (stellar) {
      priceStellar = stellar.ticker.price
    } else {
      priceStellar = 0;
    }
    if (ripple) {
      priceRipple = ripple.ticker.price
    } else {
      priceRipple = 0;
    }

    const onRefresh = useCallback(() => {
      setRefreshing(true)

      wait(1000).then(() => {
        url = originalUrl
        setRefreshing(false)

      })
    }, [refreshing])


    return (
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

        <View style={styles.main}>
          <Coin name={"Bitcoin"} logo={'logo-bitcoin'} price={priceBit} />
          <Text></Text>
          <Coin name={"Ethereum"} price={priceEth} />
          <Text></Text>
          <Coin name={"Stellar"} price={priceStellar} />
          <Text></Text>
          <Coin name={"Ripple"} price={priceRipple} />
        </View>

      </ScrollView>
    );
}
export { priceBit, priceEth, priceStellar, priceRipple };
export default Onboarding;