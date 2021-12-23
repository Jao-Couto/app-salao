import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import styles from '../style';
import { Text, Button } from 'react-native-elements';
import { ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import pagoService from '../service/pagoService';
import pendentesService from '../service/pendentesService';
import NotificarWhatsApp from './notificarWhatsApp';
import Moment from 'moment';

export default function Pendentes({ route }) {
  const [pendentes, setPendentes] = useState([]);

  const listar = () => {
    pendentesService.listarPendentes()
      .then((response) => {
        setPendentes(response.data)
        console.log("Listado fiados com sucesso")

      })
      .catch((error) => {
        console.log(error)
        console.log("Erro ao Listar")
      })
  }

  const deletar = (id) => {
    pendentesService.deletarId(id)
      .then((response) => {
        console.log("Sucesso deletar pendentes")
        listar()
      })
      .catch((error) => {
        console.log(error)
        console.log("Erro ao deletar pendente")
      })
  }

  const pago = (id) => {
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let hours = new Date().getHours();
    let min = new Date().getMinutes();
    let sec = new Date().getSeconds();
    let dataPago = year + '-' + month + '-' + date + " " + hours + ":" + min + ":" + sec;

    let data = {
      dataPago: dataPago,
      atendimento: id
    }

    pagoService.cadastrar(data)
      .then((response) => {
        console.log("Sucesso cadastro Pago")
        console.log("id" + id);
        deletar(id)
      })
      .catch((error) => {
        console.log(error)
        console.log("Erro ao cadastrar pago")
      })
  }

  useEffect(() => {
    listar()
  }, []);

  const formataData = (data) => {
    Moment.locale('pt-br');
    return Moment(data).format('DD/MM/YYYY')
  }

  const ApenasNumeros = (num) => {
    return '55' + num.replace(/([^\d])+/gim, '');
  }

  return (
    <LinearGradient
      colors={['#b23dff', '#782bab', '#2e034a']}
      style={styles.safeArea}>
      <ScrollView >
        <View style={{ alignItems: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text h3 style={styles.tit}>Pagamentos pendentes</Text>
          </View>
          {pendentes.map(pendente => (
            <View style={styles.alinhaBotao} key={pendente.pendentes_id}>
              <View style={styles.texto}  >
                <Text h4>Cliente: {(pendente.cliente_nome)}</Text>
                <Text style={{ fontSize: 18 }}>Data: {formataData(pendente.data)}</Text>
                <Text style={{ fontSize: 18 }}>Hora: {(pendente.hora).substring(0, 5)}</Text>
                <Text style={{ fontSize: 18 }}>Descrição: {pendente.servicos}</Text>
                <Text style={{ fontSize: 18 }}>R$ {parseFloat(pendente.valorTotal).toFixed(2).replace(".", ",")}</Text>
              </View>

              <View style={{ justifyContent: 'space-around' }}>
                <Button
                  buttonStyle={{ borderRadius: 10, margin: 2 }}
                  titleStyle={{ fontSize: 12 }}
                  title="Pago"
                  onPress={() => pago(pendente.pendentes_id)}
                />
                <NotificarWhatsApp num={
                  ApenasNumeros(pendente.celular)
                } texto={"Pagamento pendente do serviço " + pendente.servico + " no valor de " + parseFloat(pendente.valor).toFixed(2).replace(".", ",")}></NotificarWhatsApp>
                <Button
                  buttonStyle={{ borderRadius: 10, margin: 2, backgroundColor: 'red' }}
                  titleStyle={{ fontSize: 12 }}
                  title="Deletar"
                  onPress={() => deletar(pendente.pendentes_id)}
                />
              </View>
            </View>
          ))}

        </View>
      </ScrollView>
    </LinearGradient>
  );
}