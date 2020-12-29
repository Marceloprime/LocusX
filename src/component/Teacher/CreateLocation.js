import React, { useState } from 'react';
import { StyleSheet, View, Dimensions,Text,Button} from 'react-native';
import MapView , {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { ScrollView } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
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
    const [drag,useDrag] = useState({                            
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.000922,
        longitudeDelta: 0.000421,
    });


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