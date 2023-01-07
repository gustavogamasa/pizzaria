
import React, { useContext, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";

export default function SignIn() {

    const { user } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    function handleLogin() {

        if (email === '' || password === '') {
            alert("Preencha os campos corretamente");
            return;
        }




    }


    return (
        <View style={styles.container}>

            <Image style={styles.logo} source={require('../../assets/pizza_logo.png')} />

            <View style={styles.inputContainer}>

                <TextInput style={styles.input} placeholder={"Email"}
                    placeholderTextColor='white' value={email}
                    onChangeText={setEmail} />

                <TextInput style={styles.input} placeholder={"Senha"}
                    placeholderTextColor='white' secureTextEntry={true}
                    onChangeText={setPassword} value={password} />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
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
    buttonText: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#101026",

    }
})
