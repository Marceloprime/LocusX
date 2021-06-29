import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList,useIsDrawerOpen } from '@react-navigation/drawer';
import {AuthContext} from '../component/Global/context';

import Generic from '../component/Global/generic';
import List_courses from '../component/Adm/List_courses';
import Listar_Disciplinas from '../component/Adm/ListarDisciplinas';
import Profile from '../component/Adm/Profile';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ListUsers from '../component/Adm/UsuariosInstituicao';
import MyInstituicao from '../component/Global/MyInstituicao';


const Drawer = createDrawerNavigator();

export default function Institution() {    
    const { signOut } = React.useContext(AuthContext);
    return (
        <Drawer.Navigator initialRouteName="Perfil" drawerContent = {props =>{
            return(
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props}></DrawerItemList>
                    <DrawerItem label='Sair'inactiveBackgroundColor='#FFFFF' onPress={signOut} options={{
                    title: 'Sair',
                    drawerIcon: <Icon  name="exit-to-app" size={20} color="#00FFF" />
                    ,
                    }}></DrawerItem>
                </DrawerContentScrollView>
            )
        }}>
            <Drawer.Screen name="Perfil" component={Profile} />
            <Drawer.Screen name="Listar Cursos" component={List_courses} />
            <Drawer.Screen name="Listar Disciplinas" component={Listar_Disciplinas} />
            <Drawer.Screen name="Usuarios" component={ListUsers} />
            <Drawer.Screen name="Instituição" component={MyInstituicao} />
            <Drawer.Screen name="Sobre" component={Generic} />
        </Drawer.Navigator>
    );
}
