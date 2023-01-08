
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {Feather} from '@expo/vector-icons'

export default function FinishOrder() {

    return (
        <View style={styles.container}>
            <Text style={styles.alert}>Finalizar pedido?</Text>

            <Text style={styles.mesaText}>Mesa 123</Text>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.textButton}>Finalizar</Text>
                <Feather size={20} color='#1d1d2e' style={styles.icon} name='shopping-cart'></Feather>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#1d1d2e",
        paddingVertical: '5%',
        paddingHorizontal: '4%',
        alignItems: 'center',
        justifyContent: 'center'

    },
    alert: {
        fontSize: 20,
        color: 'white',
        fontWeight: "bold",
        marginBottom: 12
    },
    mesaText:{
        fontSize: 30,
        fontWeight: "bold",
        color: 'white',
        marginBottom: 12
    },
    button: {
        backgroundColor: '#3fffa3',
        flexDirection: 'row',
        width: '65%',
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        
    }, 
    icon: {
        fontWeight: "bold"
    },
    textButton: {
        fontSize: 18,
        marginRight: 8,
        fontWeight: "bold",
        color: '#1d1d2e'
    }


})

