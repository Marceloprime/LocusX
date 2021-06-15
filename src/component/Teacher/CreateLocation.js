import React, { useState } from 'react';
import { 
    StyleSheet, 
    View, 
    Dimensions,
    Text,
    Button,
    TextInput
} from 'react-native';
import MapView , {Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';
const axios = require('axios');
import AsyncStorage from '@react-native-community/async-storage';


const { width, height } = Dimensions.get("window");

export default function CreateLocation(props){
    Geolocation.getCurrentPosition(info => {
        useLati(info.coords.latitude)
        useLong(info.coords.longitude)

    });

    const [longitude, useLong] = useState(0);
    const [latitude, useLati] = useState(0);
    const [initLongitude, useinitLong] = useState(0);
    const [initLatitude, useinitLati] = useState(0);
    const [cood,useCood] = useState(0);
    const [name,useName] = useState();
    const [token,SetData] = React.useState("");
    const [description,useDescription] = useState("");


    React.useEffect(()=>{SalveLocation},[])

    const SalveLocation = async () =>{
        await AsyncStorage.getItem('@data')
        .then((data)=>{
            const obj = JSON.parse(data)
            AsyncStorage.getItem('userToken')
            .then((token)=>{

            let access_token = token
            axios.post('https://locusx.herokuapp.com/api/location/',{
              "name": name,
              "description": description,
              "latitude": latitude,
              "longitude": longitude,
              "teacher": obj.teacher_id
            },{
              headers: {
                'Authorization': `token ${access_token}`
              }
            }).then(function (response){
              console.log(response)
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

    return(
        <SafeAreaView>
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
                    }} provider={PROVIDER_GOOGLE} 
                >
                    <Marker.Animated
                        coordinate={{
                            latitude: initLatitude,
                            longitude: initLongitude,
                        }}

                    />
                </MapView>
                <View style={{top:height/1.81,height:height}}>
                    <View>
                        <Text>Lat:{initLongitude}</Text>
                        <Text>Lon:{cood.longitude}</Text>
                        <TextInput style={{borderRadius: 4,borderColor:'#000000'}} placeholder="Nome da Localização" value={name} onChangeText={(text)=>{useName(text)}} />
                        <Button title="Salvar" onPress={SalveLocation}></Button>
                    </View>
                </View>
            </View>
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
        height: height/1.8,
    },
})
