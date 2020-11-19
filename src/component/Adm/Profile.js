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
    Button,
    Dimensions
} from 'react-native';
import {data} from '../../routes';
const { width, height } = Dimensions.get("window");
import Icon from 'react-native-vector-icons/Entypo';


export default function Profile(){
    return(
        <View style={stylePerfil.main}>
            <View style={stylePerfil.head}>
                <Text style={stylePerfil.TextAdm}>Administrado</Text>
                <Icon style={stylePerfil.IconHead} name="user" size={20} color="white" />
            </View>
            <View style={stylePerfil.container}>
                <View style={stylePerfil.container2}>
                    <Text style={stylePerfil.DefaultText}>Nº de inscrição:</Text>
                    <Text style={stylePerfil.DefaultText}>Email:</Text>
                    <Text style={stylePerfil.DefaultText}>Endereço: </Text>
                    <Text style={stylePerfil.DefaultText}>Estado:</Text>
                    <Text style={stylePerfil.DefaultText}>Cidade:</Text>
                    <Text style={stylePerfil.DefaultText}>Rua:</Text>
                    <Text style={stylePerfil.DefaultText}>Número:</Text>
                    <Text style={stylePerfil.DefaultText}>CEP:</Text>
                    <Text style={stylePerfil.DefaultText}>Ponto de Referência:</Text>
                    <Text style={stylePerfil.DefaultText}>Ultima modificação:</Text>
                </View>
                <View style={stylePerfil.container3}>
                    <Text style={stylePerfil.DefaultText2} >{data.registration_number}</Text>
                    <Text style={stylePerfil.DefaultText2} >{data.email}</Text>
                    <Text style={stylePerfil.DefaultText2} >Endereço: </Text>
                    <Text style={stylePerfil.DefaultText2} >{data.addresses[0].state}</Text>
                    <Text style={stylePerfil.DefaultText2} >{data.addresses[0].city}</Text>
                    <Text style={stylePerfil.DefaultText2} >{data.addresses[0].street}</Text>
                    <Text style={stylePerfil.DefaultText2} >{data.addresses[0].number}</Text>
                    <Text style={stylePerfil.DefaultText2} >{data.addresses[0].postal_code}</Text>
                    <Text style={stylePerfil.DefaultText2} >{data.addresses[0].neighborhood}</Text>
                    <Text style={stylePerfil.DefaultText2} >{data.addresses[0].modified_at}</Text>
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
        width: (width*0.4),
    },
    container3:{
        display: 'flex',
        width:  (width*0.6),
    },
    head:{
        display: 'flex',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#46DBD2',
        width: width,
        height: 40,
        display: 'flex',
        flexDirection: 'row',
    },
    TextAdm:{
        paddingLeft: width/10,
        fontSize: 17,
        fontWeight: 'bold'
    },
    IconHead:{
        paddingRight: width/5
    },
    DefaultText:{
        fontWeight: 'bold'
    },
    DefaultText2:{
        textAlign: 'right'
    }
});

