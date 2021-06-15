import React, { useState } from 'react';
import { StyleSheet, View, Dimensions,Text,Button} from 'react-native';
import MapView , {Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';
const axios = require('axios');
import AsyncStorage from '@react-native-community/async-storage';
import { useEffect } from 'react';

const { width, height } = Dimensions.get("window");

export default function DoAtividades(){
    const [longitude, useLong] = useState(0);
    const [latitude, useLati] = useState(0);
    const [questions,SetQuestion] = useState('');


    function myLocation(){
        Geolocation.getCurrentPosition(async info => {
            await useLati(info.coords.latitude)
            await useLong(info.coords.longitude)
        }) 
    }

    function degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
    }
      
    function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
        var earthRadiusKm = 6371;
      
        var dLat = degreesToRadians(lat2-lat1);
        var dLon = degreesToRadians(lon2-lon1);
      
        lat1 = degreesToRadians(lat1);
        lat2 = degreesToRadians(lat2);
      
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        return earthRadiusKm * c;
    }

    useEffect(()=>{
        console.log(distanceInKmBetweenEarthCoordinates(latitude,longitude,-22.00333511199598,-47.89704964955428))
    })

    const getQuestion = async () =>{
        console.log('passou')
        if(questions === ''){
            await AsyncStorage.getItem('@data')
            .then((data)=>{
                const obj = JSON.parse(data)
                AsyncStorage.getItem('userToken')
                .then((token)=>{
    
                let access_token = token
                axios.get('https://locusx.herokuapp.com/api/activityTeacher/',{
                  headers: {
                    'Authorization': `token ${access_token}`
                  }
                }).then(function (response){
                  console.log(response.data)
                  SetQuestion(response.data)
                }).catch(function (error){
                  console.log(error)
                })
            }).catch(function (error){
                console.log(error)
            })
    
            }).catch(function (error){
                console.log(error)
            })
        }
    }

    getQuestion()
    myLocation()
    
    return(
        <SafeAreaView>
            <ScrollView scrollEnabled={true} >
                <View style={styles.main}>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        region={{
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }} showsMyLocationButton={true}
                    >
                        <Marker key={0} coordinate={{
                                latitude: latitude,
                                longitude: longitude,
                                latitudeDelta: 0.000922,
                                longitudeDelta: 0.000421,
                        }} ></Marker>

                        <Marker key={1} coordinate={{
                                latitude: -22.00333511199598,
                                longitude: -47.89704964955428,
                                latitudeDelta: 0.000922,
                                longitudeDelta: 0.000421,
                        }} ></Marker>

                        <Marker key={2} coordinate={{
                                latitude: -22.00433511199598,
                                longitude: -47.89704964955428,
                                latitudeDelta: 0.000922,
                                longitudeDelta: 0.000421,
                        }} ></Marker>
                    </MapView>
                    </View>
                    <View style={{top:height/1.5,height:height}}>

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
        height: height/2,
      },
    title:{
        backgroundColor: '#46DBD2',
        textAlign:'center',
        fontWeight: 'bold'
    },
   descricao:{

    borderBottomColor: "blue",
    borderBottomWidth: StyleSheet.hairlineWidth
   },
   pergunta:{
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: "blue",
    borderBottomWidth: StyleSheet.hairlineWidth
   }
})