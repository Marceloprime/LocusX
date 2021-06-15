import React from 'react';
import { View, Text, StyleSheet, Dimensions} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { Button } from 'react-native';
const { width, height } = Dimensions.get("window");
import {data} from '../../routes';


export default function CreateAtivity(props){

    return(
        <ScrollView>
            <View style={stylePerfil.head}>
                <Text style={stylePerfil.TextAdm}>Criar atividade</Text>
                <TouchableOpacity style={stylePerfil.IconHead} onPress={()=>props.navigation.openDrawer()}>
                    <Icon  name='menu' color='#ffffff'/>
                </TouchableOpacity>
            </View>
            <View>
                <Button title="Criar" onPress={()=>{}}></Button>
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

