
import React from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";

export default function SignIn() {
    return (
        <View style={styles.container}>

            <Image style={styles.logo} source={require('../../assets/pizza_logo.png')} />

            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder={"Email"} placeholderTextColor='white'></TextInput>
                <TextInput style={styles.input} placeholder={"Senha"} placeholderTextColor='white'></TextInput>

            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1d1d2e"
    },
    logo: {
        height: 150,
        width: 150,
        marginBottom: 100

    },
    inputContainer: {
        width: '95%',
        height: 40,
        justifyContent: "center",
        paddingVertical: 32, 
        paddingHorizontal: 14

    },
    input: {
        width: "95%",
        height: 40,
        backgroundColor: 'white',
        marginBottom: 20,
        borderRadius: 4,
        paddingHorizontal: 20

    }
})
