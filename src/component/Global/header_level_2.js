import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native'

export default function Head2(props) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{props.name}</Text>
      </View>
    );
}

styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#46DBD2' 
    },
    title:{
        marginTop: 0,
        marginBottom: 1,
        fontFamily: 'Times',
        fontSize: 24,
        fontWeight: "bold",
    },
})

