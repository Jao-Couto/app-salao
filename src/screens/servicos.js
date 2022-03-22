import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import styles from '../style';
import { Text, Button } from 'react-native-elements';
import { ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import servicosService from '../service/servicosService';



export default function Serviços({ navigation, route }) {
  const [servicos, setServicos] = useState([]);
  let countRef = useRef(0);

  const entrar = (servico) => {
    navigation.navigate("CadastroServiços", { num: countRef.current })
  }

  const listar = () => {
    servicosService.listarServicos()
      .then((response) => {
        setServicos(response.data)
        console.log("Listado serviços com sucesso")

      })
      .catch((error) => {
        console.log(error)
        console.log("Erro ao Listar")
      })
  }


  const deletar = (id) => {
    servicosService.deletarId(id)
      .then((response) => {
        console.log("Sucesso deletar serviço")
        listar()
      })
      .catch((error) => {
        console.log(error)
        console.log("Erro ao deletar atendimento")
      })
  }



  if (route.params != undefined)
    countRef.current = route.params.num;

  useEffect(() => {
    listar()
  }, [countRef.current]);


  return (
    <LinearGradient
      colors={['#b23dff', '#782bab', '#2e034a']}
      style={styles.safeArea}>
      <ScrollView >
        <View style={{ alignItems: 'center' }}>
          <Text h4 style={{ color: '#fbff00' }}>Serviços</Text>
          <View style={{ alignSelf: 'flex-end', marginRight: 10 }}>
            <Button
              buttonStyle={{ width: 50, height: 50, borderRadius: 100 }}
              icon={
                <Icon
                  name="plus"
                  size={20}
                  color="white"
                />
              }
              onPress={() => entrar()}
            />
          </View>

          {servicos.map(servico => (
            <View style={styles.alinhaBotao} key={servico.id}>
              <View style={styles.texto}  >
                <Text h4>{(servico.nome)}</Text>
                <Text style={{ fontSize: 18 }}>R$ {parseFloat(servico.valor).toFixed(2).replace(".", ",")}</Text>
              </View>
              <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
                <Button
                  onPress={() => deletar(servico.id)}
                  type="clear"
                  icon={<Icon name="trash-alt" size={20} color="red" />}
                ></Button>
              </View>
            </View>
          ))}

        </View>

      </ScrollView>
    </LinearGradient>
  );
}