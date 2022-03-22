import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, TextInput } from "react-native";
import { Alert, View } from "react-native";
import { Text, Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { TextInputMask } from "react-native-masked-text";
import Icon from "react-native-vector-icons/FontAwesome5";
import atendimentoService from "../service/atendimentoService";
import clienteService from "../service/clienteService";
import servicosService from "../service/servicosService"
import styles from "../style";
import ModalSelector from 'react-native-modal-selector-searchable';
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import servicoMarcar from "../service/servicoMarcarService";

export default function Marcar({ navigation, route }) {
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState("");
  const [errorClienteSelecionado, setErrorClienteSelecionado] = useState("");
  const [clienteNameSelecionado, setClienteNameSelecionado] = useState("");

  const [horaSelecionado, setHoraSelecionado] = useState("");
  const [errorHoraSelecionado, setErrorHoraSelecionado] = useState("");
  const [horaNameSelecionado, setHoraNameSelecionado] = useState("");

  const horas = ['7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'];
  const [times, setTimes] = useState([])


  const [servicos, setServicos] = useState([]);
  const [servicoSelecionado, setServicoSelecionado] = useState([]);
  const [errorServicoSelecionado, setErrorServicoSelecionado] = useState("");
  let countRef = useRef(0);

  const [valor, setValor] = useState("");
  const [errorValor, setErrorValor] = useState("");

  let valorField = null;

  useEffect(() => {
    clienteService.listarClientes()
      .then((response) => {
        setClientes(response.data);
        console.log("Listado Clientes com sucesso");
      })
      .catch((error) => {
        console.log(error);
        console.log("Erro ao Listar Clientes");
      });

    servicosService.listarServicos()
      .then((response) => {
        setServicos(response.data);
        console.log("Listado Serviços com sucesso");
      }).catch((error) => {
        console.log(error);
        console.log("Erro ao Listar Serviços");
      })

    atendimentoService.listarHora(route.params.dataSql)
      .then((response) => {
        setHorarios(response.data)
      })
      .catch((error) => {
        console.log(error)
        console.log("Erro ao Listar")
      })




  }, []);

  useEffect(() => {
    let val = 0
    servicos.map((servico) => {
      servicoSelecionado.map((sele) => {
        if (servico.id == sele.id) {
          val += servico.valor
        }
      })

    })
    console.log(val);

    setValor(val)

  }, [countRef.current]);

  const setHorarios = (data) => {
    let horario
    let igual
    let time = []
    for (let hora in horas) {
      for (let min = 0; min < 60; min += 10) {
        horario = ('0' + horas[hora]).slice(-2) + ':' + ('0' + min).slice(-2)
        igual = data.filter((item) => {
          return horario + ':00' == item.hora
        })

        if (igual.length == 0) {
          time.push(
            {
              key: horario + ':00',
              label: horario
            })
        }


      }
    }
    setTimes(time)
  }


  const validar = () => {
    let error = true;
    if (servicoSelecionado == "") {
      setErrorServicoSelecionado("Serviço inválido");
      error = false;
    }
    if (clienteSelecionado == "") {
      setErrorClienteSelecionado("Cliente inválido");
      error = false;
    }
    if (horaSelecionado == "") {
      setErrorHoraSelecionado("Valor inválido");
      error = false;
    }

    return error;
  };

  const cadastrar = () => {
    if (validar()) {
      let data = {
        cliente: clienteSelecionado,
        data: route.params.dataSql,
        hora: horaSelecionado,
        valor: valor
      };
      atendimentoService
        .marcarHora(data)
        .then((response) => {
          servicoSelecionado.map((elem) => {
            data = {
              "atendimento": parseInt(response.data.mensagem),
              "servico": parseInt(elem.id)
            }
            servicoMarcar.marcarServico(data)
          })
          Alert.alert("Sucesso!", "Atendimento marcado", [{ text: "OK" }]);
          navigation.navigate("Atendimentos", { data: route.params.data, dataSql: route.params.dataSql, num: route.params.num + 2 })
        })
        .catch((error) => {
          console.log(error);
          console.log("Erro ao marcar");
        });
    }
  };

  function onMultiChange() {
    return (item) => {
      setServicoSelecionado(xorBy(servicoSelecionado, [item], 'id'))
      countRef.current++
    }

  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.safeArea}
    >
      <LinearGradient
        colors={["#b23dff", "#782bab", "#2e034a"]}
        style={styles.safeArea}
      >
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
              onChange={(option) => {
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
          <Text style={styles.errorMsg}>{errorClienteSelecionado}</Text>

          <Text h4 style={styles.label}>
            Horário:
          </Text><View style={styles.containerMask}>
            <Icon type="font-awesome" name="clock" style={styles.icon}></Icon>
            <ModalSelector
              style={styles.inputMask}
              data={times}
              initValue=""
              onChange={(option) => {
                setHoraSelecionado(option.key);
                setHoraNameSelecionado(option.label)
              }}
            >
              <TextInput
                style={styles.inputMask}
                editable={false}
                placeholder="Selecione um hora"
                value={horaNameSelecionado} />
            </ModalSelector>
          </View>
          <Text style={styles.errorMsg}>{errorHoraSelecionado}</Text>


          <Text h4 style={styles.label}>
            Serviço:
          </Text>
          <View style={styles.containerMask}>
            <Icon type="font-awesome" name="wrench" style={styles.icon}></Icon>
            <SelectBox
              style={styles.inputMask}
              label=""
              options={servicos.map((servico) => {
                return {
                  item: servico.nome + ' - ' + servico.valor,
                  id: servico.id,
                }
              })}
              selectedValues={servicoSelecionado}
              onMultiSelect={onMultiChange()}
              onTapClose={onMultiChange()}
              isMulti
              inputPlaceholder="Selecionar Serviço"
            />
          </View>
          <Text style={styles.errorMsg}>{errorServicoSelecionado}</Text>

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
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
