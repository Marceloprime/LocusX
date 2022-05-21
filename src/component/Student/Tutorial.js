import * as React from 'react';
import { 
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';
const { width, height } = Dimensions.get("window");



export default function Tutorial(props){

    return(
        <ScrollView style={stylePerfil.main}>
            <View style={stylePerfil.head}>
                <Text style={stylePerfil.TextAdm}>Tutorial</Text>
                <View style={stylePerfil.IconHead} >
                <TouchableOpacity onPress={()=>props.navigation.openDrawer()}>
                    <Icon size={32} name='menu' color='#000000'/>
                </TouchableOpacity>
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
    },
    button:{
        backgroundColor: "#FDAF2D",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        width: 100,
        height: 30
    },
    containerActivity:{
        borderColor: "#FDAF2D",
        borderWidth: 2,
        padding: 24,
        marginVertical: 8,
        backgroundColor: '#E0F8F7',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleActivity:{
        color: "#0f6fc5",
        fontSize: 20,
        fontWeight: 'bold'
    }
});

