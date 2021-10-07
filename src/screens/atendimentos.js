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
import NotificarWhatsApp from './notificarWhatsApp';


export default function Atendimentos({navigation, route}) {
    const [atendimentos, setAtendimentos] = useState([]);
    
    let countRef = useRef(0);

    console.log("inicio "+countRef.current);
    const entrar = ()=>{
        navigation.navigate("Marcar", {data: route.params.data, dataSql: route.params.dataSql, num: countRef.current})
    }

    const listar = ()=>{
      atendimentoService.listarData(route.params.dataSql)
        .then((response)=>{ 
            setAtendimentos(response.data)
            console.log("Listado atendimentos com sucesso")

        })
        .catch((error) => {
            console.log(error)
        console.log("Erro ao Listar")
        })
    }

    
    const deletar= (id) =>{
      atendimentoService.deletarId(id)
      .then((response)=>{
        console.log("Sucesso deletar atendimento")
        console.log(response.data)
        listar()
      })
      .catch((error) => {
          console.log(error)
        console.log("Erro ao deletar atendimento")
      })
    }

    const pago= (id) => {
      let date = new Date().getDate();
      let month = new Date().getMonth() + 1;
      let year = new Date().getFullYear();
      let hours = new Date().getHours(); 
      let min = new Date().getMinutes();
      let sec = new Date().getSeconds();
      let dataPago =  year + '-' + month + '-' + date +" "+hours+":"+min+":"+sec;


      let data ={
        dataPago: dataPago,
        atendimento: id
      }

      pagoService.cadastrar(data)
      .then((response)=>{
        console.log("Sucesso cadastro Pago")
        listar()

      })
      .catch((error) => {
          console.log(error)
        console.log("Erro ao cadastrar pago")
      })
    }

    const pendente= (id) => {
      let data ={
        atendimento: id
      }

      pendentesService.cadastrar(data)
      .then((response)=>{
        listar()
        console.log("Sucesso cadastro fiado")
      })
      .catch((error) => {
          console.log(error)
        console.log("Erro ao cadastrar fiado")
      })
    }


    if(route.params.num != undefined)
      countRef.current = route.params.num;
    console.log("depois "+countRef.current);
    useEffect(()=>{
      listar()
    },[countRef.current]);

  const ApenasNumeros= (num)=>{
    return '55'+num.replace(/([^\d])+/gim, '');
  }
  

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
                <Text h4>Cliente: {(atendimento.nome)}</Text>
                <Text style={{fontSize:18}}>Hora: {(atendimento.hora).substring(0,5)}</Text>
                <Text style={{fontSize:18}}>Descrição: {atendimento.descricao}</Text>
                <Text style={{fontSize:18}}>R$ {parseFloat(atendimento.valor).toFixed(2).replace(".", ",")}</Text>
                <NotificarWhatsApp num={
                  ApenasNumeros(atendimento.celular)
                  } texto='Atendimento marcado para o dia 23/09/2021! Confirmar comparacimento.'></NotificarWhatsApp>
              </View>
              <View style={{justifyContent:'space-around'}}>
              <Button
                  buttonStyle={{borderRadius: 10, margin: 2}}
                  titleStyle={{fontSize: 12}}
                    title="Pago"
                    onPress={() => pago(atendimento.id)}
                />
                <Button
                    buttonStyle={{borderRadius: 10, margin: 2}}
                    titleStyle={{fontSize: 12}}
                    title="Fiado"
                    onPress={() => pendente(atendimento.id)}
                />
                <Button
                    buttonStyle={{borderRadius: 10, margin: 2, backgroundColor: 'red'}}
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