import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CategoryProps } from "../../pages/Order";



interface ModalPickerProps {
    optionsCategoryList: CategoryProps[];
    handleCloseModal: () => void;
    selectedItem: (item: CategoryProps) => void;
}

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default function ModalPicker({ handleCloseModal, optionsCategoryList, selectedItem }: ModalPickerProps) {

    function onPressItem(item: CategoryProps) {
        selectedItem(item);
        handleCloseModal();
    }


    const options = optionsCategoryList.map((item, index) => (
        <TouchableOpacity key={index} style={styles.option} onPress={() => { onPressItem(item) }}>
            <Text style={styles.item}>
                {item?.name}
            </Text>
        </TouchableOpacity>
    ))

    return (

        <TouchableOpacity onPress={handleCloseModal} style={styles.container}>

            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {options}
                </ScrollView>
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
    },
    option: {
        alignItems: "flex-start",
        borderTopWidth: 0.8,
        borderTopColor: '#8a8a8a',
    },
    item: {
        margin: 18,
        fontSize: 18,
        fontWeight: "bold",
        color: '#101026'
    }

});


