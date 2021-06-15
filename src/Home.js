import * as React from 'react';
import {data} from './routes';
import Institution from './Pages/Institution.js';
import Teacher from './Pages/Teacher';
import Student from './Pages/Student'
import {View, Text} from 'react-native'

export default function Home(props) { 
    
    if(data.is_institution_adm === true){
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
    else{
        return(
            <View>
                <Text>Erro</Text>
            </View>
        )
    }
}
