import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import styles from '../style';
import { Text, Button } from 'react-native-elements';
import atendimentoService from '../service/atendimentoService';
import { ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import pagoService from '../service/pagoService';
import pendentesService from '../service/pendentesService';



export default function Atendimentos({navigation, route}) {
    const [atendimentos, setAtendimentos] = useState([]);
    
    let countRef = useRef(0);

    const entrar = ()=>{
        navigation.navigate("Marcar", {data: route.params.data, dataSql: route.params.dataSql, num: countRef.current})
    }

    const deletar= (id) =>{
      atendimentoService.deletarId(id)
      .then((response)=>{
        console.log("Sucesso deletar atendimento")
        console.log(response.data)
        atendimentoService.listarData(route.params.dataSql)
      .then((response)=>{ 
          setAtendimentos(response.data)
          console.log("Listado atendimentos com sucesso")

      })
      .catch((error) => {
          console.log(error)
      console.log("Erro ao Listar")
      })
      })
      .catch((error) => {
          console.log(error)
        console.log("Erro ao deletar atendimento")
      })
    }

    const pago= (id, cliente, hora, desc, valor) => {
      let date = new Date().getDate();
      let month = new Date().getMonth() + 1;
      let year = new Date().getFullYear();
      let hours = new Date().getHours(); 
      let min = new Date().getMinutes();
      let sec = new Date().getSeconds();
      let dataPago =  year + '-' + month + '-' + date +" "+hours+":"+min+":"+sec;


      let data ={
        cliente: cliente,
        data: route.params.dataSql,
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

    const pendente= (id, cliente, hora, desc, valor) => {
      let data ={
        cliente: cliente,
        data: route.params.dataSql,
        hora: hora,
        descricao: desc,
        valor: valor,
      }

      pendentesService.cadastrar(data)
      .then((response)=>{
        console.log("Sucesso cadastro Pendente")
        console.log(response.data)
        deletar(id)
      })
      .catch((error) => {
          console.log(error)
        console.log("Erro ao cadastrar pendente")
      })
    }
    countRef.current = route.params.num;
    useEffect(()=>{
      console.log("entrou aqui");
        atendimentoService.listarData(route.params.dataSql)
        .then((response)=>{ 
            setAtendimentos(response.data)
            console.log("Listado atendimentos com sucesso")

        })
        .catch((error) => {
            console.log(error)
        console.log("Erro ao Listar")
        })

    },[countRef.current]);




  return(
        <LinearGradient
        colors={['#b23dff', '#782bab', '#2e034a']}
        style={styles.safeArea}>
          <ScrollView >
          <View style={{alignItems: 'center'}}>
            <View style={{flexDirection: 'row'}}>
          <Text h3 style={styles.tit}>{route.params.data}</Text>
              </View>
          {atendimentos.map(atendimento =>(
            <View style={styles.alinhaBotao} key={atendimento.id}>
              <View style={styles.texto}  > 
                <Text h4>Cliente: {(atendimento.cliente.nome)}</Text>
                <Text style={{fontSize:18}}>Hora: {(atendimento.hora).substring(0,5)}</Text>
                <Text style={{fontSize:18}}>Descrição: {atendimento.descricao}</Text>
                <Text style={{fontSize:18}}>R$ {parseFloat(atendimento.valor).toFixed(2).replace(".", ",")}</Text>
                
              </View>
              <View style={{justifyContent:'space-around'}}>
              <Button
                  buttonStyle={{borderRadius: 10, margin: 2}}
                  titleStyle={{fontSize: 12}}
                    title="Pago"
                    onPress={() => pago(atendimento.id, atendimento.cliente.id, atendimento.hora, atendimento.descricao, atendimento.valor)}
                />
                <Button
                    buttonStyle={{borderRadius: 10, margin: 2}}
                    titleStyle={{fontSize: 12}}
                    title="Pendente"
                    onPress={() => pendente(atendimento.id, atendimento.cliente.id, atendimento.hora, atendimento.descricao, atendimento.valor)}
                />
                <Button
                    buttonStyle={{borderRadius: 10, margin: 2}}
                    titleStyle={{fontSize: 12}}
                    title="Deletar"
                    onPress={() => deletar(atendimento.id)}
                />
                </View>
            </View>
          ))}
          
      </View>
      <View style={{alignSelf: 'flex-end', marginRight: 10}}>
      <Button
                    buttonStyle={{width: 50, height:50, borderRadius: 100}}
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
      </ScrollView>
      </LinearGradient>
  );
}