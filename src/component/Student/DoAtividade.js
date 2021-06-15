import React, { useState , useEffect} from 'react';
import { StyleSheet, View, Dimensions,Text,TouchableOpacity} from 'react-native';
import MapView , {Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import { DrawerActions } from '@react-navigation/drawer';
const JSON5 = require('json5')
const axios = require('axios');
import AsyncStorage from '@react-native-community/async-storage';

const { width, height } = Dimensions.get("window");

export default function DoAtividades(props){
    const [longitude, useLong] = useState(0);
    const [latitude, useLati] = useState(0);
    const [title, setTitle] = useState('Estudante');
    console.log(props.route.params.params.name)

    useEffect(() => {
        setTitle(props.route.params.params.name)
    })
    let list =  [                        
            <Marker key={0} coordinate={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.000922,
                longitudeDelta: 0.000421,
        }} ></Marker>]
    try{
      
        let tasks = JSON.stringify(props.route.params.params.tasks)
        tasks = JSON.parse(tasks)
        tasks = JSON5.parse(tasks)
        
        for(const count in tasks){
            let location = JSON5.parse(tasks[count].location)
            
            list.push((
                <Marker key={count+1} coordinate={{
                    latitude: parseFloat(location.latitude) ? parseFloat(location.latitude) : latitude,
                    longitude: parseFloat(location.longitude) ? parseFloat(location.longitude) : longitude,

                }} ></Marker>
            ))
            
        }
    }
    catch (e){
        console.log(e)
    }
    console.log(props.route.params.params.tasks)
    function myLocation(){
        Geolocation.getCurrentPosition(async info => {
            await useLati(info.coords.latitude)
            await useLong(info.coords.longitude)
        }) 
    }

    myLocation()
    
    return(
        <SafeAreaView>
            <ScrollView scrollEnabled={true} >
                <View style={stylePerfil.head}>
                    <Text style={stylePerfil.TextAdm}>{title}</Text>
                    <View style={stylePerfil.IconHead} >
                    </View>
                </View>
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
                    {list}
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

const stylePerfil = StyleSheet.create({
    main:{
        flex: 1,
    },  
    container:{
        display: 'flex'
    },
    head:{
        display: 'flex',
        backgroundColor: '#46DBD2',
        width: width,
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    TextAdm:{
        paddingLeft: 5,
        paddingTop: 9,
        fontSize: 17,
        fontWeight: 'bold'
    },
    IconHead:{
        display: 'flex',
        paddingTop: 3,
        alignItems: 'flex-end',
        marginLeft: 10
    },
    DefaultViewText:{
        borderBottomColor: "blue",
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    DefaultText:{
        fontSize: 15,
        fontWeight: 'bold',
    },
    DefaultText2:{
        marginTop: 4,
        fontSize: 17
    },
    image:{
        height: 130,
        width: width
    },

    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 24
    }
});
