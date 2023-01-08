import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../pages/Dashboard";
import Order from "../pages/Order";
import FinishOrder from "../pages/FinishOrder";

export type StackParamsList = {
    Dashboard: undefined;
    Order: {
        number: number | string;
        order_id: string;
    };
    FinishOrder: undefined
}

const Stack = createNativeStackNavigator<StackParamsList>();

function AppRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Dashboard"
                options={{ headerShown: false }}
                component={Dashboard} />

            <Stack.Screen name="Order"
                options={{ headerShown: false }}
                component={Order} />

            <Stack.Screen name="FinishOrder"
                options={{
                    title: "Finalizando",
                    headerStyle: { backgroundColor: '#1d1d2e' }, headerTintColor: 'white'
                }}
                component={FinishOrder}
            />

        </Stack.Navigator>
    )
}

export default AppRoutes;