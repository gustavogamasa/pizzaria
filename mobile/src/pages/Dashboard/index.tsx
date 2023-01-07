
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../contexts/AuthContext";
import { StackParamsList } from "../../routes/app.routes";


export default function Dashboard() {

    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    const [tableNumber, setTableNumber] = useState('');
    
    async function handleSubmitOrder(){

        if(tableNumber === '') {
            alert('Insira uma mesa');
            return;}

        navigation.navigate('Order', {number: tableNumber, order_id: 'order_teste' });

    }



    return (

        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Novo pedido</Text>

            <TextInput style={styles.input} placeholder="Numero da mesa" placeholderTextColor='#F0F0F0'
            keyboardType="numeric" onChangeText={setTableNumber} value={tableNumber} />

            <TouchableOpacity style={styles.button} onPress={handleSubmitOrder}>
                <Text style={styles.buttonText}>Abrir mesa</Text>
            </TouchableOpacity>


        </SafeAreaView>



    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
        backgroundColor: '#1d1d2e'

    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: 'white',
        marginBottom: 24,

    },
    input: {
        width: '90%',
        height: 60,
        backgroundColor: '#101026',
        borderRadius: 4,
        paddingHorizontal: 20,
        textAlign: 'center',
        color: 'white',
        fontSize: 22

    },
    button: {
        width: '90%',
        height: 40,
        backgroundColor: '#3fffa3',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: "center",
        marginVertical: 20

    },
    buttonText: {
        fontSize: 18,
        color: '#101026',
        fontWeight: 'bold'

    }

})