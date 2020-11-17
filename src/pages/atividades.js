import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';


export default function Atividades(){
    return(
        <View style={styles.main}>
            <MapView style={styles.map}
                initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
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
        width:350,
        height: 300,
      },
})