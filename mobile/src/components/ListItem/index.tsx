import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons'

interface OrderItemProps {
    data: {
        id: string;
        product_id: string;
        name: string;
        amount: string | number;
    };
    deleteItem: (item_id: string) => void;
}

export default function ListItem({ data, deleteItem}: OrderItemProps) {

    function handleDeleteItem(){
        deleteItem(data.id);
    }




    return (
        <View style={styles.container}>
            <Text style={styles.text}>{data.name} x {data.amount}</Text>
            <TouchableOpacity onPress={handleDeleteItem}>
                <Feather name="trash-2" color='#FF3F4b' size={25}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#101026',
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        marginBottom: 12,
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 4,
        borderWidth: 0.3,
        borderColor: '#8a8a8a'
    },
    text: {
        color: 'white'
        
    }
});