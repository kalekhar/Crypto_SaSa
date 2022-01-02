import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';


const Coin = (props) => {
    let logo: string = props.logo
    if (props.price) {
        return (
            <View style={styles.view}>
                <Text style={styles.title}>
                    <Icon
                        name={logo}
                        type='ionicon' />
                    {props.name}</Text>
                <Text style={styles.price}>
                    $ {props.price}
                </Text>
            </View>
        )
    }
    return (
        <View>
            <Text style={styles.loading}>
                Loading...
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: 'rgb(255, 255, 255)'
    },
    title: {
        fontSize: 20,
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: 10,
    },
    logo: {
        maxHeight: 100,
        maxWidth: 100,
    },
    price: {
        fontSize: 20,
        paddingBottom: 5,
        marginTop: 10,
        alignSelf: 'center'
    },
    loading: {
        alignSelf: 'center',
        fontSize: 20

    }

})

export default Coin