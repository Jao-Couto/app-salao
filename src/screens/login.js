
import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView } from 'react-native';
import { View } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../style';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform } from 'react-native';
import { ScrollView } from 'react-native';
import Globais from '../globais';
import usuarioService from '../service/usuarioService';


export default function Login({navigation}) {

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorUser, setErrorUser] = useState("");
  const [errorPass, setErrorPass] = useState("");



  const validar = () =>{
    
    let error = true
    if(user == ""){
      setErrorUser("Usuário inválido")
      error = false
    }
    if(password == ""){
      setErrorPass("Senha inválido")
      error = false
    }
    return error
  }

  const entrar = () => {
    if(validar()){
      data = {
        email: user,
        senha: password
      };
      usuarioService.loginUsuario(data)
      .then((response)=>{
        if(response.data.status){
          Globais.user = response.data.mensagem
          navigation.reset({
            index: 0,
            routes: [{name:"MyTabs"}]
          })
        }else
          Alert.alert("ERRO!", "Email e/ou senha incorretos",[
            {text: 'OK'}
          ])
          setPassword("");
      })
      .catch((error)=>{
        console.log(error);
      })
      
    }
  }

  const telaCadastro = ()=>{
    navigation.navigate("CadastroUsuario")
  }


  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS=="ios" ? "padding" : "height"}
    style={styles.safeArea}>
      
    <LinearGradient
        colors={['#b23dff', '#782bab', '#2e034a']}
        style={styles.container}>
      <View style={styles.logo}>
        <Text h2 style={styles.loginTit}>Serviços Hora Certa</Text>
        <Image source={require("../../assets/icon.png")} style={{width: 150, height: 150 }}>
      </Image>
      </View>
      <View style={styles.login}>
      <Input
        inputContainerStyle={{backgroundColor: '#fff', padding: 2, borderRadius: 7}}
        placeholder="Usuário"
        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
        onChangeText={value => {
          setUser(value)
          setErrorUser("")
        }}
        keyboardType="email-address"
        errorMessage={errorUser}
      />
      <Input 
      inputContainerStyle={{backgroundColor: '#fff', padding: 2, borderRadius: 7}}
        placeholder="Senha"
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        onChangeText={value => {
          setPassword(value)
          setErrorPass("")
        }}
        secureTextEntry={true}
        errorMessage={errorPass}
      />
      <Text
        style={{color:'white', fontSize:15, marginBottom:20}}
        onPress={() => telaCadastro()}
      >
        Cadastrar
      </Text>
      
      <Button
        icon={
          <Icon
            name="check"
            size={15}
            color="white"
            alignItems="center"
          />
        }
        title=" Entrar"
        onPress={() => entrar()}
      />
      </View>
    </LinearGradient>
    </KeyboardAvoidingView>
  );
}


