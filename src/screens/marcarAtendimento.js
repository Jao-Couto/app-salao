import { LinearGradient } from "expo-linear-gradient";
import React, {  useState } from "react";
import { KeyboardAvoidingView, TextInput } from "react-native";
import { Alert, View} from "react-native";
import { Input, Text, Button } from "react-native-elements";
import { ScrollView, State } from "react-native-gesture-handler";
import { TextInputMask } from "react-native-masked-text";
import Icon from "react-native-vector-icons/FontAwesome5";
import atendimentoService from "../service/atendimentoService";
import clienteService from "../service/clienteService";
import styles from "../style";
import ModalSelector from 'react-native-modal-selector-searchable'

export default function Marcar({ navigation, route }) {
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState("");
  const [clienteNameSelecionado, setClienteNameSelecionado] = useState("");

  const [hora, setHora] = useState("");
  const [errorHora, setErrorHora] = useState("");

  const [desc, setDesc] = useState("");
  const [errorDesc, setErrorDesc] = useState("");

  const [valor, setValor] = useState("");
  const [errorValor, setErrorValor] = useState("");

  let horaField = null;
  let valorField = null;

  if (clientes.length == 0) {
    clienteService
      .listarClientes()
      .then((response) => {
        setClientes(response.data);
        console.log("Listado Clientes com sucesso");
      })
      .catch((error) => {
        console.log(error);
        console.log("Erro ao Listar");
      });
  }

  const validar = () => {
    let error = true;
    if (!horaField.isValid()) {
      setErrorHora("Hora inválida");
      error = false;
    }
    if (desc == "") {
      setErrorDesc("Descrição inválida");
      error = false;
    }
    if (!valorField.isValid()) {
      setErrorValor("Valor inválido");
      error = false;
    }

    return error;
  };

  const cadastrar = () => {
    if (validar()) {
      let aux = valor.substring(2);
      aux = aux.replace(".", "");
      aux = aux.replace(",", ".");
      console.log(aux);
      let data = {
        cliente: clienteSelecionado,
        data: route.params.dataSql,
        hora: hora,
        descricao: desc,
        valor: aux,
      };
      atendimentoService
        .marcarHora(data)
        .then((response) => {
          Alert.alert("Sucesso!", "Atendimento marcado", [{ text: "OK" }]);
          navigation.navigate("Atendimentos", {data: route.params.data, dataSql: route.params.dataSql, num: route.params.num++})
        })
        .catch((error) => {
          console.log(error);
          console.log("Erro ao marcar");
        });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.safeArea}
    >
      <LinearGradient
        colors={["#b23dff", "#782bab", "#2e034a"]}
        style={styles.safeArea}
      >
        <ScrollView>
          <View style={styles.container}>
            <Text h1 style={styles.loginTit}>
              Marcar Atendimento
            </Text>

            <Text h4 style={styles.label}>
              Cliente:
            </Text>

            <View style={styles.containerMask}>
              <Icon type="font-awesome" name="user" style={styles.icon}></Icon>
              <ModalSelector
               style={styles.inputMask}
                    data={clientes.map((cliente) => {
                        return ({
                            key: cliente.id,
                            label: cliente.nome
                        });
                      })}
                    initValue=""
                    onChange={(option)=>{
                      setClienteSelecionado(option.key);
                      setClienteNameSelecionado(option.label)
                    }} 
                    
              >
              <TextInput
                        style={styles.inputMask}
                        editable={false}
                        placeholder="Selecione um cliente"
                        value={clienteNameSelecionado} />
                  </ModalSelector>
            </View>

            <Text h4 style={styles.label}>
              Horário:
            </Text>
            <View style={styles.containerMask}>
              <Icon type="font-awesome" name="clock" style={styles.icon}></Icon>
              <TextInputMask
                options={{
                  mask: "99:99",
                  validator: function (val, settings) {
                    let horas = val.split(":");
                    if (horas[0] < 24 && horas[1] < 60) return true;
                    else return false;
                  },
                }}
                style={styles.inputMask}
                placeholder=" Insira o horário"
                type={"custom"}
                value={hora}
                onChangeText={(value) => {
                  setHora(value);
                  setErrorHora("");
                }}
                keyboardType="number-pad"
                returnKeyType="done"
                ref={(ref) => (horaField = ref)}
              />
            </View>
            <Text style={styles.errorMsg}>{errorHora}</Text>

            <Text h4 style={styles.label}>
              Descrição:
            </Text>
            <Input
              inputContainerStyle={{
                backgroundColor: "#fff",
                padding: 2,
                borderRadius: 7,
              }}
              placeholder="Informe o procedimento"
              errorStyle={{ fontSize: 16 }}
              leftIcon={{ type: "font-awesome", name: "paragraph" }}
              onChangeText={(value) => {
                setDesc(value);
                setErrorDesc("");
              }}
              errorMessage={errorDesc}
            />

            <Text h4 style={styles.label}>
              Valor:
            </Text>
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
              icon={<Icon name="plus" size={15} color="white" />}
              title=" Marcar"
              onPress={() => cadastrar()}
            />
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
