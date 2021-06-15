import * as React from 'react';
import { 
    FlatList,
    Image,
    ImageBackground,
    Linking,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import  AsyncStorage from '@react-native-community/async-storage';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import {AuthContext} from '../Global/context';
import {data} from '../routes';
import { Card, Icon } from 'react-native-elements'
import Generic from '../component/generic';


import Profile from '../component/Student/Profile';
import Course from '../component/Student/Course';
import Classes from '../component/Student/Classes';


const Drawer = createDrawerNavigator();


export default function Student() {    
    const { signOut } = React.useContext(AuthContext);
    return (
        <Drawer.Navigator initialRouteName="Atividade Atual" drawerContent = {props =>{
            return(
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props}></DrawerItemList>
                    <DrawerItem label='Sair'inactiveBackgroundColor='#00FFFF' onPress={signOut}></DrawerItem>
                </DrawerContentScrollView>
            )
        }}>
            <Drawer.Screen name="Home" component={Profile} />
            <Drawer.Screen name="Disciplinas / Cursos" component={Course} />
            <Drawer.Screen name="Classes" component={Classes} />
            <Drawer.Screen name="Tutorial" component={Profile} />
            <Drawer.Screen name="Sobre" component={Profile} />
        </Drawer.Navigator>
    );
}
  

