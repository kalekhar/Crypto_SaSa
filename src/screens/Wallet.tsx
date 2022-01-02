import React, { useEffect, useState, useCallback } from 'react'
import { KeyboardAvoidingView, View, Pressable, Text, Platform, RefreshControl, SafeAreaView, ScrollView, TextInput, StyleSheet } from 'react-native';
import Pays from '../components/Pays';
import { profit } from '../components/Pays';
import { priceBit, priceEth, priceStellar, priceRipple } from './onboarding';
import { auth, firestore } from "../firebase";


const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout)
    })
}
let sum = 0

const Wallet = () => {
    const coinRef = firestore.collection(`users/${auth.currentUser.uid}/users`)
    const [refreshing, setRefreshing] = useState(false)
    const [coinName, setCoinName] = useState(null)
    const [index, setIndex] = useState(0)
    const [coinQuantity, setCoinQuantity] = useState(null)
    const [coinPrice, setCoinPrice] = useState(null)
    const [list, setList] = useState([])
    const [profit1, setProfit] = useState(0)

    const handleNewCoin = () => {
        if (coinName === null) {
            setCoinName(null)
            return
        }
        if (coinPrice === null) {
            setCoinName(null)
            return
        }
        if (coinQuantity === null) {
            setCoinName(null)
            return
        }
        
        let object = { id: index, name: coinName, price: coinPrice, quantity: coinQuantity }
        setIndex(index + 1)
        setList([...list, object])
        setCoinName(null)
        setCoinPrice(null)
        setCoinQuantity(null)
        setProfit(profit1 + profit)

        if (coinName === "Bitcoin") {
            sum += coinQuantity * (priceBit - coinPrice)
        }
        else if (coinName === "Ethereum") {
            sum += coinQuantity * (priceEth - coinPrice)
        } else if (coinName === "Stellar") {
            sum += coinQuantity * (priceStellar - coinPrice)
        } else if (coinName === "Ripple") {
            sum += coinQuantity * (priceRipple - coinPrice)
        }

        coinRef.add({
            name: coinName,
            quantity: coinQuantity,
            price: coinPrice,
        })
    }
    useEffect(()=>{
        const getInfo = async () => {
            const coins = await firestore.collection(`users/${auth.currentUser.uid}/users`);
            coins.get().then((querySnapshot) =>{
                const tempDoc = querySnapshot.docs.map((doc) => {
                    if (doc.data().name === "Bitcoin") {
                        sum += doc.data().quantity * (priceBit - doc.data().price)
                    }
                    else if (doc.data().name  === "Ethereum") {
                        sum += doc.data().quantity  * (priceEth - doc.data().price)
                    } else if (doc.data().name  === "Stellar") {
                        sum += doc.data().quantity  * (priceStellar - doc.data().price)
                    } else if (doc.data().name  === "Ripple") {
                        sum += doc.data().quantity  * (priceRipple - doc.data().price)
                    }
                    return { id: doc.id, ...doc.data() }
                })
                setList(tempDoc)
            })
        }
        getInfo();
    },[])

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        wait(1000).then(() => {
            setRefreshing(false)
        })
    }, [refreshing])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

                <View>
                    <Text style={styles.totProfit}>
                        Total Profit:
                        {"$"}{sum}
                    </Text>
                    {
                        list.map((item) => {                       
                            return (<Pays key={item.id} name={item.name} price={item.price} quantity={item.quantity} />)
                        })
                    }
                </View>
            </ScrollView>
            <KeyboardAvoidingView style={styles.addNewCoin} behavior={Platform.OS === "ios" ? "padding" : "height"} >
                <TextInput value={coinName} onChangeText={text => setCoinName(text)} style={styles.input} placeholder={'Bitcoin, Ethereum, Steller, Ripple'}></TextInput>
                <TextInput value={coinQuantity} onChangeText={text => setCoinQuantity(text)} style={styles.input} placeholder={'Enter Quantity'}></TextInput>
                <TextInput value={coinPrice} onChangeText={text => setCoinPrice(text)} style={styles.input} placeholder={'Enter Price bought'}></TextInput>
                <Pressable onPress={() => handleNewCoin()} style={styles.addButton}>
                    <View>
                        <Text style={styles.plus} >+</Text>
                    </View>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    title: {
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 10,

    },
    totProfit: {
        textAlign: 'center',
        margin: 10,
        fontSize: 20,
    },
    titlePressable: {
        fontSize: 30,
        textAlign: 'center',

    },
    addNewCoin: {

        bottom: 0,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 3,


    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: "100%",
        backgroundColor: '#fff',
        borderRadius: 20,
        borderColor: "black",
        borderWidth: 2,
    },
    addButton: {
        width: 60,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        textAlign: 'center',
        marginTop: 4,

    },
    plus: {
        fontSize: 30,
        paddingBottom: 6,
        paddingLeft: 2,
    }
})
export default Wallet