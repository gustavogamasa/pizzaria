import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from '@expo/vector-icons'

type RouteDetailParams = {
    Order: {
        number: string | number;
        order_id: string;
    }
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;


export default function Order() {

    const route = useRoute<OrderRouteProps>();

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerText}>Mesa {route.params.number}</Text>
                <TouchableOpacity>
                    <Feather name="trash-2" size={28} color='#FF3F5b' />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.input}>
                <Text style={{ color: 'white' }}>Categorias</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.input}>
                <Text style={{ color: 'white' }}>Item da categoria</Text>
            </TouchableOpacity>

            <View style={styles.containerQtd}>
                <Text style={styles.textQtd}>Quantidade</Text>
                <TextInput style={styles.inputQtd} placeholder='1'
                    placeholderTextColor={'white'} keyboardType='numeric'>
                </TextInput>
            </View>

            <View style={styles.containerButtons}>
                <TouchableOpacity style={styles.buttonPlus}>
                    <Feather name="plus" color={'black'} size={30} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonAvancar}>
                    <Text style={styles.textAvancar}>Avançar</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#1d1d2e',
        paddingVertical: '5%',
        paddingStart: '4%',
        paddingEnd: '4%'
    },
    header: {
        flexDirection: "row",
        marginBottom: 12,
        alignItems: "center",
        marginTop: 24

    },
    headerText: {
        fontSize: 30,
        fontWeight: "bold",
        color: 'white',
        marginRight: 14

    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: '#101026',
        borderRadius: 5,
        marginBottom: 12,
        justifyContent: "center",
        paddingHorizontal: 8,
        fontSize: 20
    },

    containerQtd: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: 'center',
    },
    inputQtd: {
        width: '60%',
        height: 40,
        backgroundColor: '#101026',
        borderRadius: 5,
        marginBottom: 12,
        justifyContent: "center",
        paddingHorizontal: 8,
        textAlign: "center",
        fontSize: 20
    },
    textQtd: {
        color: 'white',
        fontSize: 20,
        fontWeight: "bold"

    },
    containerButtons: {
        marginTop: 20,
        height: 40,
        width: '100%',
        flexDirection: 'row',
        justifyContent: "space-between",
        ImageBackground: 'white'

    },
    textAvancar:{
        color: 'black',
        fontSize: 18,
        fontWeight: "bold"
    },

    buttonPlus:{
        height: 40,
        width: '20%',
        backgroundColor: '#3fd1ff',
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center"


    },
    
    buttonAvancar:{
        height: 40,
        width: '75%',
        backgroundColor: '#3fffa3',
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center"
    }

});