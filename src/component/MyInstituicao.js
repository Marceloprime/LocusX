import * as React from 'react';
import {View, Text, Button} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {data} from '../routes';

export default function MyInstituicao(){
    const [list,useList] = React.useState()
    const search = async() =>{
        let request = new XMLHttpRequest();
    
        request.open('GET', 'http://class-path-auth.herokuapp.com/users/');
        
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', 'Token '+ data.token);
    
    
        request.onreadystatechange = async function () {
          if (this.readyState === 4) {
            console.log('////////////////////MyInstituição/////////////////////////');
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
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
    
    
    return(
        <ScrollView>
            <View>
                <Text>
                    {JSON.stringify(list)}
                </Text>
                <Button  title="Mostrar" onPress={search}></Button>
            </View>
        </ScrollView>
    );
}