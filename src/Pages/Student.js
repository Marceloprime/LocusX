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


const Drawer = createDrawerNavigator();

//sub components
/**
      <Drawer.Screen name="Dados de um Curso" component={Generic} /> 
      <Drawer.Screen name="Dados de uma Disciplina" component={Generic} />
 */

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
            <Drawer.Screen name="Perfil" component={Profile} />
            <Drawer.Screen name="Minhas atividades" component={Generic} />
            <Drawer.Screen name="Listar Cursos" component={Generic} />
            <Drawer.Screen name="Minhas Disciplinas" component={Generic} />
        </Drawer.Navigator>
    );
}
  

