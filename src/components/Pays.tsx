import React from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { priceBit, priceEth, priceStellar, priceRipple } from '../screens/onboarding';
let colorProfit: string 
let name: string;
let delta: number = 0;
let price: number;
let profit: number = 0;

const Pays = (props) =>{      
    let checkBit = "Bitcoin".localeCompare(props.name)
    let checkEth = "Ethereum".localeCompare(props.name)
    let checkSte = "Stellar".localeCompare(props.name)
    let checkRip = "Ripple".localeCompare(props.name)

    if(checkBit === 0){
        name = "Bitcoin"
        delta = priceBit - props.price;
        price = priceBit;
    }
    else if(checkEth === 0){
        name = "Ethereum"
        delta = priceEth - props.price;
        price = priceEth;
    }
    else if(checkSte === 0){
        name = "Stellar"
        delta = priceStellar - props.price;
        price = priceStellar
    }
    else if(checkRip === 0){
        name = "Ripple"
        delta = priceRipple - props.price;
        price = priceRipple
    }

    
    
    if(delta >= 0){
        colorProfit = 'green'
    }else{
        colorProfit = 'red'
    }
    const styles = StyleSheet.create({
        container:{
            textAlign: "center",
            backgroundColor: "#FFF",
            borderRadius: 20,
            borderColor: "black",
            margin: 3,
            padding: 5,
            flexWrap: 'wrap'
    
        },
        title:{

            fontSize: 30,
        },
        profit:{
            color: colorProfit,
        }
    })
     profit = Math.round(delta * props.quantity)
    return(
    <SafeAreaView>
        <View style = {styles.container}>
            <Text style = {styles.title}>{name}</Text>
            <Text>Quantity: {props.quantity}</Text>
            <Text>Price Bought: ${props.price} </Text>
            <Text>Current Price: ${Math.round(price*100)/ 100}</Text>
            <Text>Net Value: {"$" + Math.round(props.quantity * price)} </Text>
            <Text style = {styles.profit}>Profit = {"$" + profit} </Text>
        </View>
    </SafeAreaView>

    )
}

export {profit}
export default Pays