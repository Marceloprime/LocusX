import * as React from 'react';
import {View, Text, KeyboardAvoidingView,Image, StyleSheet } from 'react-native'

//Tela de carregamento
export default function Carregamento() {
    return (
      <KeyboardAvoidingView style = {styles.background}>
        <View style = {styles.container}>
          <View>
             <Text style={styles.title}>Locus X</Text>  
             <Image style={styles.logo} source={require('../../../locus/src/assets/cnpq.png')}></Image>  
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  const styles = StyleSheet.create({
    background:{
        flex: 1,
        backgroundColor: '#46DBD2'
    },
    container:{
      flex: 2,
      alignItems: "center",
      justifyContent: "center",
    },
    title:{
        marginTop: 0,
        marginBottom: 20,
        fontFamily: 'Times',
        fontSize: 64,
        fontWeight: "bold"
    },
    
    text:{
        color: '#ffffff',
        fontWeight: 'bold'
    },
    logo:{
        height: 50,
        width: 120,
        alignSelf: 'center',
        borderRadius: 20,
  
    }
  
  });
  