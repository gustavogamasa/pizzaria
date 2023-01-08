import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ImageBackground, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from '@expo/vector-icons'
import { api } from "../../services/api";
import ModalPicker from "../../components/ModalPicker";



type RouteDetailParams = {
    Order: {
        number: string | number;
        order_id: string;
    }
}

export type CategoryProps = {
    id: string;
    name: string;
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;


export default function Order() {

    const route = useRoute<OrderRouteProps>();
    const navigate = useNavigation();

    const [categoryList, setCategoryLlist] = useState<CategoryProps[]>([]);
    const [categorySelected, setCategorySelected] = useState<CategoryProps>();
    const [amount, setAmount] = useState();
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

    useEffect(() => {

        async function getCategories() {

            const response = await api.get('category/list-all');
            setCategoryLlist(response.data);
            setCategorySelected(response.data[0])
        }

        getCategories();

    }, []);





    async function handleCloseOrder() {

        try {
            await api.delete('order/delete', {
                params: {
                    order_id: route.params?.order_id
                }
            });

            navigate.goBack();

        } catch (error) {
            alert('Erro ao cancelar pedido: ' + error)
        }

    }


    function handleChangeCategory(item:CategoryProps){
        setCategorySelected(item);
    }





    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerText}>Mesa {route.params.number}</Text>
                <TouchableOpacity>
                    <Feather name="trash-2" size={28} color='#FF3F5b' onPress={handleCloseOrder} />
                </TouchableOpacity>
            </View>

            {categoryList.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)}>
                    <Text style={{ color: 'white' }}> {categorySelected?.name} </Text>
                </TouchableOpacity>
            )}

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



            <Modal transparent={true}
                visible={modalCategoryVisible}
                animationType='fade'>

                <ModalPicker
                handleCloseModal={()=>setModalCategoryVisible(false)}
                optionsCategoryList={categoryList}
                selectedItem={handleChangeCategory}
            
                />
             
            </Modal>




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
    textAvancar: {
        color: 'black',
        fontSize: 18,
        fontWeight: "bold"
    },

    buttonPlus: {
        height: 40,
        width: '20%',
        backgroundColor: '#3fd1ff',
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center"


    },

    buttonAvancar: {
        height: 40,
        width: '75%',
        backgroundColor: '#3fffa3',
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center"
    }

});