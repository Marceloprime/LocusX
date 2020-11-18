import React, { useState } from 'react';
import { StyleSheet, View, Dimensions} from 'react-native';
import MapView , {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const { width, height } = Dimensions.get("window");

export default function Atividades(){
    const [longitude, useLong] = useState(0);
    const [latitude, useLati] = useState(0);

    Geolocation.getCurrentPosition(info => {
        useLati(info.coords.latitude)
        useLong(info.coords.longitude)
    });

    return(
        <View style={styles.main}>
            <MapView style={styles.map}
                initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
            />
        </View>
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
        height: 300,
      },
})