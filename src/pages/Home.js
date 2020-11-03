import * as React from 'react';
import {data} from '../routes';
import Institution from '../pages/Institution';
import Teacher from '../pages/Teacher';
import Student from '../pages/Student'


export default function Home() {    
    
    if(data.is_admin === true){
        return(
            <Institution/>
        )
    }
    else if(data.is_teacher === true){
        return(
            <Teacher/>
        )
    }
    else if(data.is_student === true){
        return(
            <Student/>
        )
    }
}
  
 
/*

 function Profile(){
    const { signOut } = React.useContext(AuthContext);
    getData
    return(
        <View style={stylePerfil.main}>
            <View style={stylePerfil.container}>
                <View style={stylePerfil.container2}>
                    <Text>Aluno: </Text>
                    <Text>{JSON.stringify(data)}</Text>
                    <Text>{data.email}</Text>
                    <Text>{data.registration_number}</Text>
                    <Text>{data.anddresses}</Text>
              

                </View>
                <View style={stylePerfil.container3}>
                <Icon
                    name='mail'
                    type='evilicon'
                    color='#517fa4'
                    />
                </View>
            </View>
            <Button title="Sair" onPress={signOut} />
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

*/