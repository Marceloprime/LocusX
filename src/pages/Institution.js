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
//import { Card, Icon } from 'react-native-elements'


import Generic from '../component/generic'
import List_courses from '../component/List_courses'


const Drawer = createDrawerNavigator();

//sub components
/**
      <Drawer.Screen name="Dados de um Curso" component={Generic} /> 
      <Drawer.Screen name="Dados de uma Disciplina" component={Generic} />
 */

export default function Institution() {    
    return (
        <Drawer.Navigator initialRouteName="Perfil">
            <Drawer.Screen name="Perfil" component={Profile} />
            <Drawer.Screen name="Listar Cursos" component={List_courses} />
            <Drawer.Screen name="Disciplinas" component={Generic} />
        </Drawer.Navigator>
    );
}


function Profile(){
    const { signOut } = React.useContext(AuthContext);
    return(
        <View style={stylePerfil.main}>
            <View style={stylePerfil.container}>
                <View style={stylePerfil.container2}>
                    <Text>Aluno: </Text>
                    <Text>{JSON.stringify(data)}</Text>
                    <Text>{data.email}</Text>
                    <Text>{data.registration_number}</Text>
                    <Text>{data.anddresses}</Text>
              

                </View>
                <View style={stylePerfil.container3}>
                </View>
            </View>
            <Button title="Sair" onPress={signOut} />
        </View>
     )
 }


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