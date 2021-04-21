import React from 'react';
import { View, Text, StyleSheet, Dimensions} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { Button } from 'react-native';
const { width, height } = Dimensions.get("window");
import {data} from '../../routes';


export default function CreateAtivity(props){
    const myObj = {
        "name":"John",
        "age":30,
        "cars": [
          { "name":"Ford", "models":[ "Fiesta", "Focus", "Mustang" ] },
          { "name":"BMW", "models":[ "320", "X3", "X5" ] },
          { "name":"Fiat", "models":[ "500", "Panda" ] }
        ]
    }
    function create(){
        const request = new XMLHttpRequest();

        request.open('POST', 'http://class-path-content.herokuapp.com/activities/');

        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization',  'Token '+ data.token);

        request.onreadystatechange = function () {
        if (this.readyState === 4) {
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
            console.log('Body:', this.responseText);
        }
        };

        var body = {
            'title': 'Aonde fica a Torre Eiffel??',
            'description': JSON.stringify(myObj),
            'location': 117,
            'course': 11,
            'content': 98, 
        };

        request.send(JSON.stringify(body));
    }
    return(
        <ScrollView>
            <View style={stylePerfil.head}>
                <Text style={stylePerfil.TextAdm}>Criar atividade</Text>
                <TouchableOpacity style={stylePerfil.IconHead} onPress={()=>props.navigation.openDrawer()}>
                    <Icon  name='menu' color='#ffffff'/>
                </TouchableOpacity>
            </View>
            <View>
                <Text>CreateAtivity</Text>
                <Button title="Criar" onPress={create}></Button>
            </View>
        </ScrollView>
    )
}

const stylePerfil = StyleSheet.create({
    head:{
        display: 'flex',
        backgroundColor: '#46DBD2',
        width: width,
        height: 40,
        display: 'flex',
        flexDirection: 'row'
    },
    TextAdm:{
        fontSize: 17,
        fontWeight: 'bold'
    },
    IconHead:{
        width: width/2,
        display: 'flex',
        left: 70,
        top:7,
    }
});