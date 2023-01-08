import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, ImageBackground, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from '@expo/vector-icons'
import { api } from "../../services/api";
import ModalPicker from "../../components/ModalPicker";
import ListItem from "../../components/ListItem";



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

type ProductProps = {
    id: string;
    name: string;
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

type OrderItemProps = {
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
}


export default function Order() {

    const route = useRoute<OrderRouteProps>();
    const navigate = useNavigation();

    const [categoryList, setCategoryLlist] = useState<CategoryProps[]>([]);
    const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>();
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

    const [products, setProducts] = useState<ProductProps[] | []>([]);
    const [productSelected, setProductSelected] = useState<ProductProps | undefined>()
    const [modalProductVisible, setModalProductVisible] = useState(false);

    const [amount, setAmount] = useState('1');
    const [orderItems, setOrderItems] = useState<OrderItemProps[]>([]);

    useEffect(() => {

        async function getCategories() {

            const response = await api.get('category/list-all');
            setCategoryLlist(response.data);
            setCategorySelected(response.data[0])
        }

        getCategories();

    }, []);


    useEffect(() => {

        async function loadProducts() {
            const productList = await api.get('category/products', {
                params: {
                    category_id: categorySelected?.id
                }
            })
            setProducts(productList.data)
            setProductSelected(productList.data[0])
        }

        loadProducts();

    }, [categorySelected])





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


    function handleChangeCategory(item: CategoryProps) {
        setCategorySelected(item);
    }

    function handleChangeProduct(item: ProductProps) {
        setProductSelected(item);
    }

    async function handleAdd() {
        const response = await api.post('order/add-item', {
            order_id: route.params.order_id,
            product_id: productSelected?.id,
            amount: Number(amount)
        })

        let data = {
            id: response.data.id,
            product_id: response.data.product_id as string,
            name: productSelected?.name as string,
            amount: amount
        }

        setOrderItems(oldArray => [...oldArray, data]);
    }

    async function handleDeleteItem(item_id: string){

    }



    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerText}>Mesa {route.params.number}</Text>

                {orderItems.length === 0 && (<TouchableOpacity>
                    <Feather name="trash-2" size={28} color='#FF3F5b' onPress={handleCloseOrder} />
                </TouchableOpacity>)

                }

            </View>

            {categoryList.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)}>
                    <Text style={{ color: 'white' }}> {categorySelected?.name} </Text>
                </TouchableOpacity>
            )}


            {products.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalProductVisible(true)}>
                    <Text style={{ color: 'white' }}> {productSelected?.name} </Text>
                </TouchableOpacity>
            )}



            <View style={styles.containerQtd}>
                <Text style={styles.textQtd}>Quantidade</Text>
                <TextInput style={styles.inputQtd}
                    placeholderTextColor={'white'} keyboardType='numeric'
                    value={amount} onChangeText={setAmount}>
                </TextInput>
            </View>

            <View style={styles.containerButtons}>
                <TouchableOpacity style={styles.buttonPlus} onPress={handleAdd}>
                    <Feather name="plus" color={'black'} size={30} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.buttonAvancar, { opacity: orderItems.length === 0 ? 0.3 : 1 }]}
                    disabled={orderItems.length === 0}>

                    <Text style={styles.textAvancar}>Avançar</Text>
                </TouchableOpacity>
            </View>



            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, marginTop: 24 }}
                data={orderItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ListItem data={item} deleteItem={handleDeleteItem} />}>

            </FlatList>



            <Modal transparent={true}
                visible={modalCategoryVisible}
                animationType='fade'>

                <ModalPicker
                    handleCloseModal={() => setModalCategoryVisible(false)}
                    optionsList={categoryList}
                    selectedItem={handleChangeCategory}

                />

            </Modal>

            <Modal transparent={true}
                visible={modalProductVisible}
                animationType='fade'>

                <ModalPicker
                    handleCloseModal={() => setModalProductVisible(false)}
                    optionsList={products}
                    selectedItem={handleChangeProduct}
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
        fontSize: 20,
        color: 'white'
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