import * as React from 'react';
import { 
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
const { width, height } = Dimensions.get("window");
import {data} from '../../routes';
import Head2 from '../generalUse/header_level_2'

export default function Profile(props){


    return(
        <ScrollView style={stylePerfil.main}>
            <View style={stylePerfil.head}>
                <Text style={stylePerfil.TextAdm}>Professor(a)</Text>
                <View style={stylePerfil.IconHead} >
                <TouchableOpacity onPress={()=>props.navigation.openDrawer()}>
                    <Icon size={32} name='menu' color='#ffffff'/>
                </TouchableOpacity>
                </View>
            </View>
            <Image style={stylePerfil.image} source={require('../../assets/How-to-Study-featured-image.jpg')}/>
            <Head2 name={data.username} />
            <View style={stylePerfil.container}>

                <View style={stylePerfil.DefaultViewText}>
                    <Text style={stylePerfil.DefaultText}>Email:</Text>
                    <Text style={stylePerfil.DefaultText2} >{data.email}</Text>
                </View>
                <View style={stylePerfil.DefaultViewText}>
                    <Text style={stylePerfil.DefaultText}>Nome:</Text>
                    <Text style={stylePerfil.DefaultText2} >{data.first_name} {data.last_name}</Text>
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
    }
});

