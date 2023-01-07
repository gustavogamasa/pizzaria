
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignIn() {

    const [email, setEmail] = useState();





    return (
        <View style={styles.container}>

            <Image style={styles.logo} source={require('../../assets/pizza_logo.png')} />

            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder={"Email"} placeholderTextColor='white'></TextInput>
                <TextInput style={styles.input} placeholder={"Senha"} placeholderTextColor='white' secureTextEntry={true}></TextInput>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>
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
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 32,
        paddingHorizontal: 14

    },
    input: {
        width: "95%",
        height: 40,
        backgroundColor: '#101026',
        marginBottom: 20,
        borderRadius: 4,
        paddingHorizontal: 20,
        color: 'white'
    },
    button: {
        marginTop: 10,
        width: '95%',
        height: 40,
        backgroundColor: "#3fffa3",
        alignItems: "center",
        justifyContent: 'center',
    },
    buttonText:{
        fontWeight: "bold",
        fontSize: 18,
        color: "#101026",
        
    }
})
