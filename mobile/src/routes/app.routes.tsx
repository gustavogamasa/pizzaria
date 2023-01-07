import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../pages/Dashboard";
import Order from "../pages/Order";

export type StackParamsList = {
    Dashboard: undefined;
    Order: {
        number: number | string;
        order_id: string;
    };
}

const Stack = createNativeStackNavigator<StackParamsList>();

    function AppRoutes() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Dashboard"
                options={{headerShown: false}}
                component={Dashboard} />

                <Stack.Screen name="Order"
                options={{headerShown: false}}
                component={Order}/>

            </Stack.Navigator>
        )
    }

    export default AppRoutes;