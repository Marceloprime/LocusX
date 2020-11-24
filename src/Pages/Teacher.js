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
import Generic from '../component/generic'

const Drawer = createDrawerNavigator();

//sub components
/**
      <Drawer.Screen name="Dados de um Curso" component={Generic} /> 
      <Drawer.Screen name="Dados de uma Disciplina" component={Generic} />
 */

export default function Teacher() {  
    const { signOut } = React.useContext(AuthContext);
  
    return (
        <Drawer.Navigator initialRouteName="Perfil" drawerContent = {props =>{
            return(
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props}></DrawerItemList>
                    <DrawerItem label='Sair'inactiveBackgroundColor='#00FFFF' onPress={signOut}></DrawerItem>
                </DrawerContentScrollView>
            )
        }}>
            <Drawer.Screen name="Perfil" component={Generic} />
            <Drawer.Screen name="Listar Cursos" component={Generic} />
            <Drawer.Screen name="Disciplinas" component={Generic} />
            <Drawer.Screen name="Lista de turmas" component={Generic} />
            <Drawer.Screen name="Criar Tarefa" component={Generic} />
            <Drawer.Screen name="Minhas Tarefas Tarefa" component={Generic} />
        </Drawer.Navigator>
    );
}
  