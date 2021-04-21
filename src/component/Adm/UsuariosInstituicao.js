import * as React from 'react';
import {View, Text, Button, StyleSheet, FlatList, ScrollView} from 'react-native';
import {data} from '../../../src/routes';
import { TextInput } from 'react-native-gesture-handler';



export default function ListUsers() {
    const [list,useList] = React.useState()
    const [dlist,useDlist] = React.useState()
    const [id,useId] = React.useState()
   

    const search = async() =>{
        let request = new XMLHttpRequest();
    
        request.open('GET', 'http://class-path-auth.herokuapp.com/users/');
        
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

    const detailsearch = async() =>{
      let request = new XMLHttpRequest();
  
      request.open('GET',  'http://class-path-auth.herokuapp.com/users/'+id+'/');
      
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
          useDlist(body)
        }
      };
      
      request.send();
    }
    return (
      <ScrollView scrollEnabled={true} >
        <View>       
          <Text style={styles.head}>Lista Usuarios</Text>
          <TextInput value={id} autoCorrect={false} placeholder='Digite o id do curso ou série:' onChangeText={text => { useId(text),detailsearch}}/>
          <Button  title="Buscar" onPress={detailsearch}></Button>
          <FlatList
          data={list}
          renderItem={({item}) => <Text style={styles.item}>{item.email} id: {JSON.stringify(item.profile.user)}</Text>}
        />
          <Button  title="Listar" onPress={search}></Button>
        </View>
        <View>
          <Text style={styles.head}>Detalhes</Text>
          <Text>{JSON.stringify(dlist)}</Text>
        </View>
      </ScrollView>
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
    borderBottomWidth: StyleSheet.hairlineWidth
  }
})