import React from "react";
import { ActivityIndicator, View } from "react-native";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";


function Routes() {

    const isAuthenticated = false;
    const loading = false;

    if (loading) {
        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: '#1D1D2E'
            }}>

            <ActivityIndicator size={200} color="white"/>

            </View>
        )
    }


    return (

        isAuthenticated ? <AppRoutes /> : <AuthRoutes />

    )
}

export default Routes;