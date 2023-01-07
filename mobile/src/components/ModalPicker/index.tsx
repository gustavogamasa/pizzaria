import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CategoryProps } from "../../pages/Order";



interface ModalPickerProps {
    optionsCategoryList: CategoryProps[];
    handleCloseModal: () => void;
    selectedItem: () => void;
}

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default function ModalPicker({ handleCloseModal, optionsCategoryList, selectedItem }: ModalPickerProps) {



    return (

        <TouchableOpacity onPress={handleCloseModal} style={styles.container}>

            <View style={styles.content}>
                <Text>
                    Pizza // Fazer ScrollView
                </Text>
            </View>

        </TouchableOpacity>
    )
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: WIDTH - 20,
        height: HEIGHT / 2,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: "#8a8a8a",
        borderRadius: 4
    }

});


