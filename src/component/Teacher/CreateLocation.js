import React, { useState } from 'react';
import { StyleSheet, View, Dimensions,Text,Button} from 'react-native';
import MapView , {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import {data} from '../../routes';
import { SafeAreaView } from 'react-native';

const { width, height } = Dimensions.get("window");

export default function Atividades(){
    Geolocation.getCurrentPosition(info => {
        useLati(info.coords.latitude)
        useLong(info.coords.longitude)
    });

    const [longitude, useLong] = useState(0);
    const [latitude, useLati] = useState(0);
    const [cood,useCood] = useState(0);
    const [name,useName] = useState();
    const [list,useList] = React.useState()

    const search = async() =>{
        let request = new XMLHttpRequest();
    
        request.open('GET', 'http://class-path-location.herokuapp.com/locations/');
        
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

    const SalveLocation = async () =>{
        let request = new XMLHttpRequest();
     
        request.open('POST', 'http://class-path-location.herokuapp.com/locations/');
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Authorization', 'Token '+ data.token);
        request.onreadystatechange = async function () {
          if (this.readyState === 4) {
            console.log('Status:', this.status);
            console.log('Headers:', JSON.stringify(this.getAllResponseHeaders()));
            console.log('Response:', body);
          }
        };
        let body = {
          'name': name,
          'latitude': latitude,
          'longitude': longitude,
        };
        request.send(JSON.stringify(body));
    }

    return(
        <SafeAreaView>
            <ScrollView scrollEnabled={true} >
                <View style={styles.main}>
                    <MapView style={styles.map}
                        initialRegion={{
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: 0.000922,
                            longitudeDelta: 0.000421,
                        }} showsUserLocation={true} showsMyLocationButton={true}
                        onRegionChange={(region) =>{
                            useCood(region)
                        }}
                    >
                    </MapView>
                    <View style={{top:height/1.5,height:height}}>
                        <View>
                            <Text>Lat:{cood.latitude}</Text>
                            <Text>Lon:{cood.longitude}</Text>
                            <TextInput style={{borderRadius: 4,borderColor:'#000000'}} placeholder="Nome da Localização" value={name} onChangeText={(text)=>{useName(text)}} />
                            <Button title="Salvar" onPress={SalveLocation}></Button>
                            <Text>{JSON.stringify(list)}</Text>
                            <Button title="Listar" onPress={search}></Button>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main:{
        flex : 1,
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: width,
        height: height/1.5,
    },
})

