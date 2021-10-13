import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { Alert, View } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { TextInputMask } from "react-native-masked-text";
import Icon from "react-native-vector-icons/FontAwesome5";
import Globais from "../globais";
import servicosService from "../service/servicosService";
import styles from "../style";


export default function CadastroServiços({navigation, route}) {

    const [nome, setNome] = useState("");
    const [errorNome, setErrorNome] = useState("");

    const [valor, setValor] = useState("");
    const [errorValor, setErrorValor] = useState("");

    let valorField = null;


    const validar = () => {
        let error = true
        if (nome == "") {
            setErrorNome("Nome inválido")
            error = false
        }
        if (!valorField.isValid()) {
            setErrorValor("Valor inválido")
            error = false
        }
        return error
    }

    const cadastrar = () => {
        if (validar()) {
            let aux = valor.substring(2)
            aux = aux.replace(".", "")
            aux = aux.replace(",", ".")
            let data = {
                nome: nome,
                valor: aux,
                usuario: Globais.user
            }
            servicosService.cadastrarServico(data)
                .then((response) => {
                    Alert.alert("Sucesso!", "Serviço cadastrado com sucesso", [
                        { text: 'OK' }
                    ])
                    navigation.navigate("Serviços", { num: route.params.num + 1 })
                })
                .catch((error) => {
                    console.log(error)
                    console.log("Erro ao cadastrar")
                })
        }
    }

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.safeArea}>
            <LinearGradient
                colors={['#b23dff', '#782bab', '#2e034a']}
                style={styles.safeArea}>
                <ScrollView>
                    <View style={styles.container}>

                        <Text h1 style={styles.loginTit}>Cadastro de serviço</Text>
                        <Text h4 style={styles.label}>Nome:</Text>
                        <Input
                            inputContainerStyle={{ backgroundColor: '#fff', padding: 2, borderRadius: 7 }}
                            placeholder="Nome do serviço"
                            leftIcon={{ type: 'font-awesome', name: 'user' }}
                            autoCapitalize='words'
                            onChangeText={value => {
                                setNome(value)
                                setErrorNome("")
                            }}
                            errorMessage={errorNome}
                            errorStyle={{ fontSize: 16 }}
                        />

                        <Text h4 style={styles.label}>Valor:</Text>
                        <View style={styles.containerMask}>
                            <Icon
                                type="font-awesome"
                                name="money-bill-wave"
                                style={styles.icon}
                            ></Icon>
                            <TextInputMask
                                style={styles.inputMask}
                                placeholder=" Insira o valor"
                                type={"money"}
                                options={{
                                    precision: 2,
                                    separator: ",",
                                    delimiter: ".",
                                    unit: "R$",
                                    suffixUnit: "",
                                }}
                                value={valor}
                                onChangeText={(value) => {
                                    setValor(value);
                                    setErrorValor("");
                                }}
                                keyboardType="number-pad"
                                returnKeyType="done"
                                ref={(ref) => (valorField = ref)}
                            />
                        </View>
                        <Text style={styles.errorMsg}>{errorValor}</Text>

                        <Button
                            buttonStyle={{ marginBottom: 50 }}
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