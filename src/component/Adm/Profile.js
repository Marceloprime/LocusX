import * as React from 'react';
import { 
    FlatList,
    Image,
    ImageBackground,
    Linking,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import {data} from '../../routes';


export default function Profile(){
    return(
        <View style={stylePerfil.main}>
            <View style={stylePerfil.container}>
                <View style={stylePerfil.container2}>
                    <Text>Instituição: </Text>
                    <Text>{'Nº inscrição: ' + data.registration_number}</Text>
                    <Text>{data.addresses[0].state}</Text>
                    <Text>{data.addresses[0].city}</Text>
                    <Text>{data.addresses[0].street}</Text>
                    <Text>{data.addresses[0].neighborhood}</Text>
                    <Text>{data.addresses[0].number}</Text>
                    <Text>{data.addresses[0].postal_code}</Text>

                </View>
                <View style={stylePerfil.container3}>
                </View>
            </View>
        </View>
     )
 }


 const stylePerfil = StyleSheet.create({
    main:{
        flex: 1,
    },  
    container:{
        display: 'flex',
        flex: 2,
        flexDirection: 'row',
    },
    container2:{
        width: 190,
        height: 600,
    },
    container3:{
        height: 600
    }
});