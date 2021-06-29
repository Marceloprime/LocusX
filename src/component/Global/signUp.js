import React, { useState } from "react";
import { 
  Alert, 
  Modal, 
  StyleSheet, 
  Text, 
  Pressable, 
  View, 
  TextInput,
  Dimensions,
  TouchableOpacity 
} from "react-native";
import Icon from 'react-native-vector-icons/Entypo';

const windowWidth = Dimensions.get('window').width;
const axios = require('axios');

const SignUp = (props) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [modalCreated, setModalCreated] = useState(false);
  const [modalErro, setModalErro] = useState(false);


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [password, setPassword] = useState('');
  const [testPassword, setTestPassword] = useState('');
  const [is_student, setIs_student] = useState(false);
  const [is_teacher, setIs_teacher] = useState(false);
  const [is_institution_adm, setIs_institution_adm] = useState(false);

  //Style of password
  const [showPas, setShow] = React.useState(true)
  const eye = <Icon name="eye" size={20} color="grey" />;
  const eyeWithLine = <Icon name="eye-with-line" size={20} color="grey" />;
  const [eyes, setEyes] = React.useState(eye)


  const create = () => {
    axios.post('https://locusx.herokuapp.com/api/users/',{
      "username": username,
      "first_name":first_name,
      "last_name": last_name,
      "email": email,
      "password": password,
      "is_active": true,
      "is_student": is_student,
      "is_teacher": is_teacher,
      "is_institution_adm": is_institution_adm
    }).then(function (response){
      setModalCreated(!modalCreated);
    }).catch(function (error){
      setModalErro(!modalErro)
    })
    
  }

  return (
    <View style={styles.container}>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalCreated}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalCreated(!modalCreated);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                props.navigation.navigate('SignIn')
                setModalCreated(!modalCreated)
              }}
            >
              <Text style={styles.textStyle}>Salvo</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalErro}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalErro(!modalErro);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalErro(!modalErro)
              }}
            >
              <Text style={styles.textStyle}>Email ou Username icorrentos</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setIs_institution_adm(true) 
                setModalVisible(!modalVisible)
              }}
            >
              <Text style={styles.textStyle}>Sou uma Instituição</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setIs_teacher(true)
                setModalVisible(!modalVisible)
              }}
            >
              <Text style={styles.textStyle}>Sou um(a) Professor(a)</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setIs_student(true)
                setModalVisible(!modalVisible)
              }}
            >
              <Text style={styles.textStyle}>Sou um(a) aluno(a)</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Text style={styles.title}>Locus X</Text>  

      <TextInput style={styles.inscricao} value={username} placeholder='Username' autoCorrect={true} onChangeText={text => { setUsername(text)}}/>
      <TextInput style={styles.inscricao} value={email} placeholder='Email' autoCorrect={true} onChangeText={text => { setEmail(text)}}/>
      <TextInput style={styles.inscricao} value={first_name} placeholder='Primeiro nome' autoCorrect={true} onChangeText={text => { setFirst_name(text)}}/>
      <TextInput style={styles.inscricao} value={last_name} placeholder='Sobrenome' autoCorrect={true} onChangeText={text => { setLast_name(text)}}/>
     
      <View style={styles.senha}>
          <TextInput  value={password} placeholder='Senha' autoCorrect={false} secureTextEntry={showPas} onChangeText={text => { setPassword(text)}}/>
          <TouchableOpacity style={styles.iconEye} onPress={ async () => {
                if(showPas === true){
                  setShow(false)
                  setEyes(eye)
                }
                else{
                  setShow(true)
                  setEyes(eyeWithLine)
                }            

              }} >{eyes}</TouchableOpacity>
      </View>
      <View style={styles.senha}>
          <TextInput  value={testPassword} placeholder='Confirme a senha' autoCorrect={false} secureTextEntry={showPas} onChangeText={text => { setTestPassword(text)}}/>
          <TouchableOpacity style={styles.iconEye} onPress={ async () => {
                if(showPas === true){
                  setShow(false)
                  setEyes(eye)
                }
                else{
                  setShow(true)
                  setEyes(eyeWithLine)
                }            

              }} >{eyes}</TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={ async () => {
            await create()
          }} ><Text style={styles.text}>Salvar</Text></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#46DBD2',
  },
  modalView: {
    margin: 20,
    marginTop: windowWidth/2,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 15,
    padding: 12,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginBottom: 15
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  inscricao:{
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    width: 242,
    borderRadius: 12,
    paddingLeft: 10,
  },
  senha:{
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    width: 242,
    borderRadius: 12,
    paddingLeft: 10,
  },
  iconEye:{
    position: 'absolute',
    top: 15,
    left: 210,
    width: 30,
    height: 42,
    bottom: 20,
  },
  button:{
    marginTop: 15,
    marginBottom: 20,
    display: "flex",
    alignItems:"center",
    justifyContent: "center",
    height: 48,
    width: 180,
    backgroundColor: 'blue',
    borderRadius: 20,
  },
  text:{
    color: '#ffffff',
    fontWeight: 'bold'
  },
  title:{
    marginTop: 10,
    fontFamily: 'Times',
    fontSize: 44,
    fontWeight: "bold"
},
});

export default SignUp;