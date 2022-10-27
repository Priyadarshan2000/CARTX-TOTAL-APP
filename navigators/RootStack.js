import React from 'react';

import { Colors } from './../components/styles';

const {primary,tertiary} = Colors;

//nativation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//screens
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Welcome from '../screens/Welcome';
import Scanner from '../screens/Scanner';




const Stack = createNativeStackNavigator();

const RootStack = () => {
return(
    <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
            headerShown: {
                backgroundColor: 'transparent',
            },
            headerTintColor: tertiary,
            headerTransparent: true,
            headerTitle:'',
            hearderLeftContainerStyle: {
            paddingLeft: 20,
            }
        }}
        initialRouteName="Login"
        > 

            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Scanner" component={Scanner} />
            
            <Stack.Screen options={{headerTintColor:primary}} name="Welcome" component={Welcome} />
        </Stack.Navigator>
    </NavigationContainer>
)
}

export default RootStack;