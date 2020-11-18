import * as React from 'react';
import {View, Text, Button, StyleSheet, FlatList} from 'react-native';
import { Value } from 'react-native-reanimated';
import {data} from '../../../src/routes';
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
            useList(body)
          }
        };
        
        request.send();
    }

    return (
      <View>       
        <Text style={styles.head}>Lista de Cursos ou séries</Text>
        <FlatList
        data={list}
        renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}
      />
        <Button  title="Buscar" onPress={search}></Button>
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
    backgroundColor: 'blue',
    display: 'flex',
    justifyContent: 'center',
  },
  item:{
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  }
})