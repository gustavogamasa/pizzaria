
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { AuthProvider } from './src/contexts/AuthContext';

import Routes from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>

        <StatusBar backgroundColor='1d1d2e' barStyle="light-content" />
        <Routes />

      </AuthProvider>
    </NavigationContainer>
  );
}
