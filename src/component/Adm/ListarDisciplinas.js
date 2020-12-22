import * as React from 'react';
import {View, Text, Button, StyleSheet, FlatList} from 'react-native';
import { Value } from 'react-native-reanimated';
import {data} from '../../routes';
import  AsyncStorage from '@react-native-community/async-storage';



export default function Listar_Disciplinas() {
    const [list,useList] = React.useState()
    const search = async() =>{
        let request = new XMLHttpRequest();
    
        request.open('GET', 'http://class-path-auth.herokuapp.com/courses/');
        
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', 'Token '+ data.token);
    
    
        request.onreadystatechange = async function () {
          if (this.readyState === 4) {
            //console.log('/////////////////////////////////////////////');
            //console.log('Status:', this.status);
            //console.log('Headers:', this.getAllResponseHeaders());
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

    return (
      <View>       
        <Text style={styles.head}>Listar Disciplinas</Text>
        <Text>{JSON.stringify(list)}</Text>
        <Button  title='Busca' onPress={
          search}></Button>
      </View>
    );
}

const styles = StyleSheet.create({
  head:{
    top:0,
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#46DBD2',
    display: 'flex',
    textAlign:'center',
  },
  item:{
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    borderBottomColor: "blue",
    textAlign:'center',
    borderBottomWidth: StyleSheet.hairlineWidth
  }
})