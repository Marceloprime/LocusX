import * as React from 'react';
import {data} from '../routes';
import Institution from './Institution';
import Teacher from './Teacher';
import Student from './Student'
import  AsyncStorage from '@react-native-community/async-storage';


export default function HomeScreen() {    

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