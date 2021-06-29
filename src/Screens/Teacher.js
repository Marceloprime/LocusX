import * as React from 'react';
import { 
    createDrawerNavigator, 
    DrawerContentScrollView, 
    DrawerItem, DrawerItemList 
} from '@react-navigation/drawer';

import {AuthContext} from '../component/Global/context';

import Generic from '../component/Global/generic';
import Profile from '../component/Teacher/Profile';
import Myclasses from '../component/Teacher/Myclasses';
import Mycourses from '../component/Teacher/Mycourses';
import MyInstituicao from '../component/Global/MyInstituicao';
import AuthenticatedCourses from '../component/Teacher/AuthenticatedCourses';
import CreateContent from '../component/Teacher/CreateContent';
import CreateAtivity from '../component/Teacher/CreateAtivity';
import CreateLocation from '../component/Teacher/CreateLocation';

import Youtube from '../component/Teacher/youtube';

const Drawer = createDrawerNavigator();

export default function Teacher() {  
    const { signOut } = React.useContext(AuthContext);
  
    return (
        <Drawer.Navigator initialRouteName="Perfil" drawerContent = {props =>{
            return(
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props}></DrawerItemList>
                    <DrawerItem label='Sair'inactiveBackgroundColor='#00FFFF' onPress={signOut}></DrawerItem>
                </DrawerContentScrollView>
            )
        }}>
            <Drawer.Screen name="Home" component={Profile} />
            <Drawer.Screen name="Minhas Séries/Cursos" component={Mycourses} />
            <Drawer.Screen name="Criar Atividade" component={CreateAtivity} />
            <Drawer.Screen name="Criar Localização" component={CreateLocation} />
            <Drawer.Screen name="Minhas turmas" component={Myclasses} />
            <Drawer.Screen name="Autenticados" component={AuthenticatedCourses} />
            <Drawer.Screen name="Conteudos" component={CreateContent} />
            <Drawer.Screen name="Atividades" component={CreateAtivity} />
            <Drawer.Screen name="Youtube" component={Youtube} />
        </Drawer.Navigator>
    );
}

