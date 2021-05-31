
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Alert, View } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/FontAwesome';
import clienteService from '../service/clienteService';
import styles from '../style';



export default function CadastroCliente({navigation}) {

    const [nome, setNome] = useState("");
    const [errorNome, setErrorNome] = useState("");

    const [CPF, setCPF] = useState("");
    const [errorCPF, setErrorCPF] = useState("");

    const [rua, setRua] = useState("");
    const [errorRua, setErrorRua] = useState("");

    const [bairro, setBairro] = useState("");
    const [errorBairro, setErrorBairro] = useState("");

    const [num, setNum] = useState("");
    const [errorNum, setErrorNum] = useState("");

    const [cidade, setCidade] = useState("");
    const [errorCidade, setErrorCidade] = useState("");

    const [cel, setCel] = useState("");
    const [errorCel, setErrorCel] = useState("");

    const [nascimento, setNascimento] = useState("");
    const [errorNascimento, setErrorNascimento] = useState("");

    let cpfField = null
    let nascimentoField = null
    let celField = null

    const validar = () =>{
        let error = true
        if(nome == ""){
            setErrorNome("Nome inválido")
            error = false
        }
        if(!cpfField.isValid()){
          setErrorCPF("CPF inválido")
          error = false
        }
        if(rua == ""){
            setErrorRua("Rua inválida")
            error = false
        }
        if(bairro == ""){
            setErrorBairro("Bairro inválido")
            error = false
        }
        if(num == ""){
            setErrorNum("Número inválido")
            error = false
        }
        if(cidade == ""){
            setErrorCidade("Cidade inválida")
            error = false
        }
        if(!nascimentoField.isValid()){
            setErrorNascimento("Data inválida")
            error = false
        }
        if(!celField.isValid()){
            setErrorCel("Celular inválido")
            error = false
        }
        return error
      }

      const cadastrar = () => {
        if(validar()){
          let data ={
              nome: nome,
              cpf: CPF,
              rua: rua,
              bairro: bairro,
              numero: num,
              cidade: cidade,
              celular: cel,
              nascimento: nascimento
          }
          clienteService.cadastrarCliente(data)
          .then((response)=>{
            Alert.alert("Sucesso!", "Cliente cadastrado com sucesso",[
                {text: 'OK'}
            ])
            console.log(response.data)
          })
          .catch((error) => {
              console.log(error)
            console.log("Erro ao cadastrar")
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
                <Text h1 style={styles.loginTit}>Cadastro Cliente</Text>

                <Text h4 style={styles.label}>Nome:</Text>
                <Input 
                inputContainerStyle={{backgroundColor: '#fff', padding: 2, borderRadius: 7}}
                placeholder="Nome Completo"
                leftIcon={{ type: 'font-awesome', name: 'user' }}
                onChangeText={value => {
                setNome(value)
                setErrorNome("")
                }}
                errorMessage={errorNome}
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

                <Text h4 style={styles.label}>Rua:</Text>
                <Input 
                inputContainerStyle={{backgroundColor: '#fff', padding: 2, borderRadius: 7}}
                placeholder="Informe a rua"
                errorStyle={{fontSize: 16}}
                leftIcon={{ type: 'font-awesome', name: 'road' }}
                onChangeText={value => {
                setRua(value)
                setErrorRua("")
                }}
                errorMessage={errorRua}
                />

                <Text h4 style={styles.label}>Bairro:</Text>
                <Input
                    inputContainerStyle={{backgroundColor: '#fff', padding: 2, borderRadius: 7}}
                    placeholder="Informe o bairro"
                    errorStyle={{fontSize: 16}}
                    leftIcon={{ type: 'font-awesome', name: 'tree' }}
                    onChangeText={value => {
                    setBairro(value)
                    setErrorBairro("")
                    }}
                    errorMessage={errorBairro}
                />

                <Text h4 style={styles.label}>Número:</Text>
                <Input 
                    inputContainerStyle={{backgroundColor: '#fff', padding: 2, borderRadius: 7}}
                    placeholder="Informe o número"
                    errorStyle={{fontSize: 16}}
                    leftIcon={{ type: 'font-awesome', name: 'home' }}
                    onChangeText={value => {
                    setNum(value)
                    setErrorNum("")
                    }}
                    errorMessage={errorNum}
                    keyboardType= 'decimal-pad'
                />

                <Text h4 style={styles.label}>Cidade:</Text>
                <Input 
                    inputContainerStyle={{backgroundColor: '#fff', padding: 2, borderRadius: 7}}
                    placeholder="Informe a cidade"
                    errorStyle={{fontSize: 16}}
                    leftIcon={{ type: 'font-awesome', name: 'building' }}
                    onChangeText={value => {
                    setCidade(value)
                    setErrorCidade("")
                    }}
                    errorMessage={errorCidade}
                />

                <Text h4 style={styles.label}>Celular:</Text>
                <View style={styles.containerMask}>
                <Icon type= 'font-awesome'
                        name= 'mobile' 
                        style={styles.icon}
                        ></Icon>
                <TextInputMask
                    style={styles.inputMask}
                    placeholder=" Insira o celular"
                    type={'cel-phone'}
                    value={cel}
                    onChangeText={value => {
                        setCel(value)
                        setErrorCel("")
                    }}
                    errorMessage={errorCel}
                    keyboardType= 'number-pad'
                    returnKeyType= 'done'
                    ref={(ref) => celField = ref}
                    />
                </View>
                <Text style={styles.errorMsg}>{errorCel}</Text>

                <Text h4 style={styles.label}>Data de nascimento:</Text>
                <View style={styles.containerMask}>
                <Icon type= 'font-awesome'
                        name= 'birthday-cake' 
                        style={styles.icon}
                        ></Icon>
                <TextInputMask
                    options={{
                        mask: '99/99/9999',
                        validator: function(val, settings){
                            let datas = val.split("/")
                            if(datas[0] < 31 && datas[1] < 13 && datas[3] != "0000")
                                return true
                            else return false
                        }
                    }}
                    style={styles.inputMask}
                    placeholder=" Insira a data de nascimento"
                    type={'custom'}
                    value={nascimento}
                    onChangeText={value => {
                        setNascimento(value)
                        setErrorNascimento("")
                    }}
                    keyboardType= 'number-pad'
                    returnKeyType= 'done'
                    ref={(ref) => nascimentoField = ref}
                    />
                </View>
                <Text style={styles.errorMsg}>{errorNascimento}</Text>

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