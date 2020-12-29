import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import {AuthContext} from '../Global/context';
import Generic from '../component/generic';
import Profile from '../component/Teacher/Profile';
import Myclasses from '../component/Teacher/Myclasses';
import Mycourses from '../component/Teacher/Mycourses';
import MyInstituicao from '../component/MyInstituicao';
import AuthenticatedCourses from '../component/Teacher/AuthenticatedCourses';
import CreateLocation from '../component/Teacher/CreateLocation';
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
            <Drawer.Screen name="Perfil" component={Profile} />
            <Drawer.Screen name="Listar Cursos" component={Generic} />
            <Drawer.Screen name="Disciplinas" component={Generic} />
            <Drawer.Screen name="Minhas turmas" component={Myclasses} />
            <Drawer.Screen name="Minhas Séries/Cursos" component={Mycourses} />
            <Drawer.Screen name="Minha Instituição" component={MyInstituicao} />
            <Drawer.Screen name="Autenticados" component={AuthenticatedCourses} />
            <Drawer.Screen name="Criar Localização" component={CreateLocation} />
        </Drawer.Navigator>
    );
}
  