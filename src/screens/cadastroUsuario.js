import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {View} from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import styles from '../style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInputMask } from 'react-native-masked-text';
import usuarioService from '../service/usuarioService';



export default function CadastroUsuario({navigation}){
    const [nome, setNome] = useState("");
    const [errorNome, setErrorNome] = useState("");

    const [email, setEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState("");

    const [senha, setSenha] = useState("");
    const [errorSenha, setErrorSenha] = useState("");

    const [CPF, setCPF] = useState("");
    const [errorCPF, setErrorCPF] = useState("");
    let cpfField = null

    const validar = () => {
        let error = true
        if(nome == ""){
            setErrorNome("Nome inválido")
            error = false
        }
        if(email == ""){
            setErrorEmail("Email inválido")
            error = false
        }
        if(senha == ""){
            setErrorSenha("Senha inválida")
            error = false
        }
        if(!cpfField.isValid()){
            setErrorCPF("CPF inválido")
            error = false
        }

        return error
    }

    const cadastrar = () =>{
        if(validar()){
            data={
                nome: nome,
                email: email,
                senha: senha,
                cpf: CPF
            }

            usuarioService.cadastrarUsuario(data)
            .then((response)=>{
                Alert.alert("Sucesso!", "Usuário cadastrado com sucesso",[
                    {text: 'OK'}
                ])
                navigation.navigate("Login")
            })
            .catch((error)=>{
                console.log(error);
                Alert.alert("ERROR!", "Erro ao cadastrar usuário",[
                    {text: 'OK'}
                ])
            })
            
        }
    }

    return(
        <KeyboardAvoidingView
        behavior={Platform.OS=="ios" ? "padding" : "height"}
        style={styles.safeArea}>
        <LinearGradient
        colors={['#b23dff', '#782bab', '#2e034a']}
        style={styles.safeArea}>
        <ScrollView>
            <View style={styles.container}>
                <Text h1 style={styles.loginTit}>Cadastro de usuário</Text>

                <Text h4 style={styles.label}>Nome:</Text>
                <Input 
                    inputContainerStyle={{backgroundColor: '#fff', padding: 2, borderRadius: 7}}
                    placeholder="Nome Completo"
                    leftIcon={{ type: 'font-awesome', name: 'user' }}
                    autoCapitalize='words'
                    onChangeText={value => {
                    setNome(value)
                    setErrorNome("")
                    }}
                    errorMessage={errorNome}
                    errorStyle={{fontSize: 16}}
                />

                <Text h4 style={styles.label}>Email:</Text>
                <Input 
                    inputContainerStyle={{backgroundColor: '#fff', padding: 2, borderRadius: 7}}
                    placeholder="Email"
                    leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                    autoCapitalize='none'
                    onChangeText={value => {
                    setEmail(value)
                    setErrorEmail("")
                    }}
                    errorMessage={errorEmail}
                    errorStyle={{fontSize: 16}}
                />

                <Text h4 style={styles.label}>Senha:</Text>
                <Input 
                    inputContainerStyle={{backgroundColor: '#fff', padding: 2, borderRadius: 7}}
                    placeholder="Senha"
                    leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    autoCapitalize='none'
                    onChangeText={value => {
                    setSenha(value)
                    setErrorSenha("")
                    }}
                    secureTextEntry={true}
                    errorMessage={errorSenha}
                    errorStyle={{fontSize: 16}}
                />

                <Text h4 style={styles.label}>CPF:</Text>
                <View style={styles.containerMask}>
                    <Icon type= 'font-awesome'
                            name= 'id-card' 
                            style={styles.icon}
                            ></Icon>
                    <TextInputMask
                        style={styles.inputMask}
                        placeholder=" CPF"
                        type={'cpf'}
                        value={CPF}
                        onChangeText={value => {
                            setCPF(value)
                            setErrorCPF("")
                        }}
                        keyboardType= 'number-pad'
                        returnKeyType= 'done'
                        ref={(ref) => cpfField = ref}
                    />
                </View>
                <Text style={styles.errorMsg}>{errorCPF}</Text>

                <Button
                    buttonStyle={{marginBottom: 50}}
                    icon={
                    <Icon
                        name="user-plus"
                          size={15}
                        color="white"
                    />
                     }
                    title=" Cadastrar"
                    onPress={() => cadastrar()}
                />
            </View>
        </ScrollView>
        </LinearGradient>
        </KeyboardAvoidingView>
    );
}