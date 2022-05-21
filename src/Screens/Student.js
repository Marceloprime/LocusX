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
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList, DrawerView } from '@react-navigation/drawer';
import {AuthContext} from '../component/Global/context';
import {data} from '../routes';
import Icon from 'react-native-vector-icons/Entypo';
import Generic from '../component/Global/generic';


import Profile from '../component/Student/Profile';
import Tutorial from '../component/Student/Tutorial';
import Classes from '../component/Student/Classes';
import Help from '../component/Student/Help';
import Notas from '../component/Student/Notas';
import imagebackground from '../assets/logo_ICMC.jpg'

const Drawer = createDrawerNavigator();


export default function Student() {    
    const { signOut } = React.useContext(AuthContext);
    return (
        <Drawer.Navigator initialRouteName="Home" drawerContent = {props =>{
            return(
                <DrawerContentScrollView style={{display:'flex'}}{...props}>
                            <DrawerItemList {...props}></DrawerItemList>
                            <DrawerItem label='Sair' onPress={signOut}   ></DrawerItem>
                            <Image source={imagebackground} style={{display:'flex',marginLeft: 56, marginTop:120}}/>
                </DrawerContentScrollView>
            )
        }} >
            <Drawer.Screen name="Home" component={Profile} options={{
                drawerIcon: ({focused, size}) => (<Icon name="home" size={20} color="grey" />)
            }} />
            <Drawer.Screen name="Classes" component={Classes} options={{
                drawerIcon: ({focused, size}) => (<Icon name="graduation-cap" size={20} color="grey" />)
            }}/>
            <Drawer.Screen name="Minhas Notas" component={Notas} options={{
                drawerIcon: ({focused, size}) => (<Icon name="graduation-cap" size={20} color="grey" />)
            }}/>
            <Drawer.Screen name="Tutorial" component={Tutorial} options={{
                drawerIcon: ({focused, size}) => (<Icon name="info" size={20} color="grey" />)
            }}/>
            <Drawer.Screen name="Ajuda e suporte" component={Help} options={{
                drawerIcon: ({focused, size}) => (<Icon name="help" size={20} color="grey" />)
            }} />
        </Drawer.Navigator>
    );
}
  

const drawerStyles = StyleSheet.create({
    
})