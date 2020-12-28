import * as React from 'react';
import { 
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableHighlightComponent
} from 'react-native';
import {data} from '../../routes';
const { width, height } = Dimensions.get("window");


export default function Profile(){
    return(
        <ScrollView style={stylePerfil.main}>
            <View style={stylePerfil.head}>
                <Text style={stylePerfil.TextAdm}>Professor</Text>
            </View>
            <View style={stylePerfil.container}>

                <View style={stylePerfil.DefaultViewText}>
                    <Text style={stylePerfil.DefaultText}>Nº de inscrição:</Text>
                    <Text style={stylePerfil.DefaultText2} >{data.registration_number}</Text>
                </View>

                <View style={stylePerfil.DefaultViewText}>
                    <Text style={stylePerfil.DefaultText}>Email:</Text>
                    <Text style={stylePerfil.DefaultText2} >{data.email}</Text>
                </View>
            </View>
        </ScrollView>
     )
 }


 const stylePerfil = StyleSheet.create({
    main:{
        flex: 1,
    },  
    container:{
        display: 'flex'
    },
    head:{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#46DBD2',
        width: width,
        height: 40,
        display: 'flex',
    },
    TextAdm:{
        fontSize: 17,
        fontWeight: 'bold'
    },
    IconHead:{
        paddingRight: width/5
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
    }
});

