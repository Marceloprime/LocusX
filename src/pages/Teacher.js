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
import { createDrawerNavigator } from '@react-navigation/drawer';
import {AuthContext} from '../functions/context';
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
    return (
        <Drawer.Navigator initialRouteName="Perfil">
            <Drawer.Screen name="Perfil" component={Generic} />
            <Drawer.Screen name="Listar Cursos" component={Generic} />
            <Drawer.Screen name="Disciplinas" component={Generic} />
        </Drawer.Navigator>
    );
}
  