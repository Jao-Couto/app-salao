import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import styles from '../style';
import { Text, Button } from 'react-native-elements';
import { ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import pagoService from '../service/pagoService';
import pendentesService from '../service/pendentesService';



export default function Pendentes({route}) {
    const [pendentes, setPendentes] = useState([]);
    

    const deletar= (id) =>{
      pendentesService.deletarId(id)
      .then((response)=>{
        console.log("Sucesso deletar pendentes")
        console.log(response.data)
        pendentesService.listarPendentes()
      .then((response)=>{ 
          setPendentes(response.data)
          console.log("Listado pendentes com sucesso")

      })
      .catch((error) => {
          console.log(error)
      console.log("Erro ao Listar")
      })
      })
      .catch((error) => {
          console.log(error)
        console.log("Erro ao deletar pendente")
      })
    }

    const pago= (id, cliente, hora, dia, desc, valor) => {
      let date = new Date().getDate();
      let month = new Date().getMonth() + 1;
      let year = new Date().getFullYear();
      let hours = new Date().getHours(); 
      let min = new Date().getMinutes();
      let sec = new Date().getSeconds();
      let dataPago =  year + '-' + month + '-' + date +" "+hours+":"+min+":"+sec;

      let data ={
        cliente: cliente,
        data: dia,
        dataPago: dataPago,
        hora: hora,
        descricao: desc,
        valor: valor,
      }

      pagoService.cadastrar(data)
      .then((response)=>{
        console.log("Sucesso cadastro Pago")
        console.log(response.data)
        deletar(id)
      })
      .catch((error) => {
          console.log(error)
        console.log("Erro ao cadastrar pago")
      })
    }

    useEffect(()=>{
        pendentesService.listarPendentes()
        .then((response)=>{ 
            setPendentes(response.data)
            console.log("Listado pendentes com sucesso")

        })
        .catch((error) => {
            console.log(error)
        console.log("Erro ao Listar")
        })

    }, []);

    const reload = () => {
      pendentesService.listarPendentes()
        .then((response)=>{ 
            setPendentes(response.data)
            console.log("Listado pendentes com sucesso")

        })
        .catch((error) => {
            console.log(error)
        console.log("Erro ao Listar")
        })
    }




  return(
        <LinearGradient
        colors={['#b23dff', '#782bab', '#2e034a']}
        style={styles.safeArea}>
          <ScrollView >
          <View style={{alignItems: 'center'}}>
            <View style={{flexDirection: 'row'}}>
          <Text h3 style={styles.tit}>Pendentes</Text>
              </View>
          {pendentes.map(pendente =>(
            <View style={styles.alinhaBotao} key={pendente.id}>
              <View style={styles.texto}  > 
                <Text h4>Cliente: {(pendente.cliente.nome)}</Text>
                <Text style={{fontSize:18}}>Data: {(pendente.data)}</Text>
                <Text style={{fontSize:18}}>Hora: {(pendente.hora).substring(0,5)}</Text>
                <Text style={{fontSize:18}}>Descrição: {pendente.descricao}</Text>
                <Text style={{fontSize:18}}>R$ {parseFloat(pendente.valor).toFixed(2).replace(".", ",")}</Text>
                
              </View>
              <View style={{justifyContent:'space-around'}}>
              <Button
                  buttonStyle={{borderRadius: 10, margin: 2}}
                  titleStyle={{fontSize: 12}}
                    title="Pago"
                    onPress={() => pago(pendente.id, pendente.cliente.id, pendente.hora, pendente.data, pendente.descricao, pendente.valor)}
                />
                <Button
                    buttonStyle={{borderRadius: 10, margin: 2}}
                    titleStyle={{fontSize: 12}}
                    title="Deletar"
                    onPress={() => deletar(pendente.id)}
                />
                </View>
            </View>
          ))}
          
      </View>
      </ScrollView>
      </LinearGradient>
  );
}