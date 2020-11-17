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
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList,useIsDrawerOpen } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



import {AuthContext} from '../functions/context';
import {data} from '../routes';
//import { Card, Icon } from 'react-native-elements'


import Generic from '../component/generic'
import List_courses from '../component/List_courses'


const Drawer = createDrawerNavigator();

//sub components
/**
      <Drawer.Screen name="Dados de um Curso" component={Generic} /> 
      <Drawer.Screen name="Dados de uma Disciplina" component={Generic} />
 */
const DrawerButton = (props) => {
	return (
    <View>
      <TouchableOpacity onPress={() => {props.navigation.navigate('DrawerOpen')}}>
        <Text>MENU</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Institution() {    
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
            <Drawer.Screen name="Perfil" component={Profile} />
            <Drawer.Screen name="Listar Cursos" component={List_courses} />
            <Drawer.Screen name="Disciplinas" component={Generic} />
            <Drawer.Screen name="Usuarios" component={Generic} />
            <Drawer.Screen name="Sobre" component={Generic} />
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


 /**
  * "addresses":[{"id":4,"state":"SP","city":"São Carlos","street":"Av. Trab. São Carlense","neighborhood":"Parque São Carlos","number":400,"postal_code":"13566-590","complement":null,"user":89,"created_at":"2020-10-27T21:04:53.256400Z","modified_at":"2020-10-27T21:04:53.261228Z"}],"profile":{"id":13,"institution":13,"cpf":null,"description":"","created_at":"2020-09-03T12:11:33.753528Z","modified_at":"2020-10-27T21:05:10.153621Z"},"is_teacher":false,"is_student":false,"is_admin":true,"token":"b51628593bf8e9d34ebf3af883f757b2dd7eab20","has_institution"
  * {"user_id":89,"email":"marceloreis7777@gmail.com","registration_number":"10844309","addresses":[{"id":4,"state":"SP","city":"São Carlos","street":"Av. Trab. São Carlense","neighborhood":"Parque São Carlos","number":400,"postal_code":"13566-590","complement":null,"user":89,"created_at":"2020-10-27T21:04:53.256400Z","modified_at":"2020-10-27T21:04:53.261228Z"}],"profile":{"id":13,"institution":13,"cpf":null,"description":"","created_at":"2020-09-03T12:11:33.753528Z","modified_at":"2020-10-27T21:05:10.153621Z"},"is_teacher":false,"is_student":false,"is_admin":true,"token":"b51628593bf8e9d34ebf3af883f757b2dd7eab20","has_institution":true}
[Mon Nov 16 2020 10:35:02.787]  ERROR    TypeError: undefined is not an object (evaluating '_routes.data.is_admin')

  */

  const stylePerfil = StyleSheet.create({
    main:{
        flex: 1,
    },  
    container:{
        display: 'flex',
        flex: 2,
        flexDirection: 'row',
    },
    container2:{
        width: 190,
        height: 600,
    },
    container3:{
        height: 600
    }
});