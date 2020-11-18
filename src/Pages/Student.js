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
import Atividades from '../component/Student/atividades'

const Drawer = createDrawerNavigator();

//sub components
/**
      <Drawer.Screen name="Dados de um Curso" component={Generic} /> 
      <Drawer.Screen name="Dados de uma Disciplina" component={Generic} />
 */

export default function Student() {    
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
            <Drawer.Screen name="Minhas atividades" component={Atividades} />
            <Drawer.Screen name="Listar Cursos" component={Generic} />
            <Drawer.Screen name="Disciplinas" component={Generic} />
        </Drawer.Navigator>
    );
}
  

function Profile(){
    return(
        <View style={stylePerfil.main}>
            <View style={stylePerfil.container}>
                <View style={stylePerfil.container2}>
                    <Text>Instituição: </Text>
                    <Text>{'Nº inscrição: ' + data.registration_number}</Text>
                    <Text>{data.addresses[0].state}</Text>
                    <Text>{data.addresses[0].city}</Text>
                    <Text>{data.addresses[0].street}</Text>
                    <Text>{data.addresses[0].neighborhood}</Text>
                    <Text>{data.addresses[0].number}</Text>
                    <Text>{data.addresses[0].postal_code}</Text>

                </View>
                <View style={stylePerfil.container3}>
                </View>
            </View>
        </View>
     )
 }
