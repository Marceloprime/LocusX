import * as React from 'react';
import {View, Text, Button} from 'react-native';
import { Value } from 'react-native-reanimated';
import {data} from '../routes';
import  AsyncStorage from '@react-native-community/async-storage';



export default function List_courses() {
    const [list,useList] = React.useState()

    const search = async() =>{
        let request = new XMLHttpRequest();
    
        request.open('GET', 'http://class-path-auth.herokuapp.com/programs/');
        
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', 'Token '+ data.token);
    
    
        request.onreadystatechange = async function () {
          if (this.readyState === 4) {
            console.log('/////////////////////////////////////////////');
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
            let body = await JSON.parse(this.responseText,(key, value) =>{
              console.log('key: ' + key)
              console.log(value)
              console.log('///////////////////')
              return value
            });
            useList(body[0])
          }
        };
        
        request.send();
    }

    return (
      <View>       
        <Text>List_courses</Text>
        <Text>{JSON.stringify(list)}</Text>
        <Button  title="Buscar" onPress={search}></Button>
      </View>
    );
}
