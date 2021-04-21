import React, { useState } from 'react';
import { StyleSheet, View, Dimensions,Text,Button} from 'react-native';
import MapView , {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import {data} from '../../routes';
import { SafeAreaView } from 'react-native';

const { width, height } = Dimensions.get("window");

export default function CreateContent(){
    const [list,useList] = React.useState()
    const [title,useTitle] = React.useState()
    const [description,useDescription] = React.useState()


    const search = async() =>{
        let request = new XMLHttpRequest();
    
        request.open('GET', 'http://class-path-content.herokuapp.com/contents/');
        
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', 'Token '+ data.token);
    
    
        request.onreadystatechange = async function () {
          if (this.readyState === 4) {
            console.log('/////////////////////////////////////////////');
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
            console.log('Status:', this.responseText);
            let body = await JSON.parse(this.responseText,(key, value) =>{
              console.log('key: ' + key)
              console.log(value)
              console.log('///////////////////')
              return value
            });
            useList(body)
          }
        };
        
        request.send();
    }

    const SalveContent= async () =>{
        let request = new XMLHttpRequest();
     
        request.open('POST', 'http://class-path-content.herokuapp.com/contents/');
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', 'Token '+ data.token);
        request.onreadystatechange = async function () {
          if (this.readyState === 4) {
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
            console.log('Body:' + this.responseText); 
          }
        };
        let body = {
          'title': title,
          'description': description,
        };
        request.send(JSON.stringify(body));
    }

    return(
        <SafeAreaView>
            <ScrollView scrollEnabled={true} >
                <View style={styles.main}>
                    <Text>Titulo</Text>
                    <TextInput  placeholder="Titulo" value={title} onChangeText={(text)=>{useTitle(text)}} />
                    <Text>Descrição</Text>
                    <TextInput  placeholder="Descrição" value={description} onChangeText={(text)=>{useDescription(text)}} />
                    <Button title="Salvar" onPress={SalveContent}></Button>
                    <Text>{JSON.stringify(list)}</Text>
                    <Button title="Listar" onPress={search}></Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main:{
        flex : 1,
    },
})

