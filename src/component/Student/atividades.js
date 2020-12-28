import React, { useState } from 'react';
import { StyleSheet, View, Dimensions,Text,Button} from 'react-native';
import MapView , {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { ScrollView } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import { SafeAreaView } from 'react-native';

const { width, height } = Dimensions.get("window");

export default function Atividades(){
    const [longitude, useLong] = useState(0);
    const [latitude, useLati] = useState(0);
    const [qa, useQA] = useState(false)
    const [qb, useQB] = useState(false)
    const [qc, useQC] = useState(false)
    const [qd, useQD] = useState(false)
    const [qe, useQE] = useState(false)

    Geolocation.getCurrentPosition(info => {
        useLati(info.coords.latitude)
        useLong(info.coords.longitude)
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
                    >
                    <Marker key={0} coordinate={{
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: 0.000922,
                            longitudeDelta: 0.000421,
                    }} >
                    </Marker>
                    <Marker key={1} coordinate={{
                            latitude: latitude+2,
                            longitude: longitude+2,
                            latitudeDelta: 0.000922,
                            longitudeDelta: 0.000421,
                    }} ></Marker>
                    </MapView>
                    <View style={{top:height/3,height:height}}>
                        <Text style={styles.title}>Questão 1</Text>
                        <Text style={styles.descricao}>Equipamentos domésticos chamados de vaporizadores para
                        roupa utilizam o vapor de água gerado por um sistema de
                        resistências elétricas a partir de água líquida. Um equipamento
                        com potência nominal de 1.600 W foi utilizado para passar
                        roupas por 20 minutos, consumindo 540 mL de água. Em relação
                        ao gasto total de energia do equipamento, o gasto de energia
                        utilizado apenas para vaporizar a água, após ela já ter atingido a
                        temperatura de ebulição, equivale a, aproximadamente,</Text>
                        <View style={{height:height/2}}>
                            <View style={styles.pergunta}>
                                <CheckBox
                                    disabled={false}
                                    value={qa}
                                    onValueChange={(newValue) => useQA(newValue)}
                                />  
                                <Text style={{paddingTop: 5.5}}>(A) 0,04%</Text>
                            </View>
                            <View style={styles.pergunta}>
                                <CheckBox
                                    disabled={false}
                                    value={qb}
                                    onValueChange={(newValue) => useQB(newValue)}
                                />  
                                <Text style={{paddingTop: 5.5}}>(B) 0,062%</Text>
                            </View> 
                            <View style={styles.pergunta}>
                                <CheckBox
                                    disabled={false}
                                    value={qc}
                                    onValueChange={(newValue) => useQC(newValue)}
                                />  
                                <Text style={{paddingTop: 5.5}}>(C) 4,6%</Text>
                            </View> 
                            <View style={styles.pergunta}>
                                <CheckBox
                                    disabled={false}
                                    value={qd}
                                    onValueChange={(newValue) => useQD(newValue)}
                                />  
                                <Text style={{paddingTop: 5.5}}>(D) 40%</Text>
                            </View>
                            <View style={styles.pergunta}>
                                <CheckBox
                                    disabled={false}
                                    value={qe}
                                    onValueChange={(newValue) => useQE(newValue)}
                                />  
                                <Text style={{paddingTop: 5.5}}>(E) 62%</Text>
                            </View>
                            <Button  title="Salvar" onPress={()=>{}}></Button>                   
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
        height: height/3,
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