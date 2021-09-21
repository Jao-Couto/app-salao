import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import styles from '../style';
import { Text, Button } from 'react-native-elements';
import clienteService from '../service/clienteService';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/core';



export default function Clientes() {
    const [clientes, setClientes] = useState([]);
    let countRef = useRef(0);
    const navigation = useNavigation();
    const route = useRoute();

    const listar = () =>{
        clienteService.listarClientes()
        .then((response)=>{
            
            setClientes(response.data)
            console.log("Listado com sucesso")
            
        })
        .catch((error) => {
            console.log(error)
        console.log("Erro ao Listar")
        })
    }

    const entrar = () => {
        navigation.navigate("CadastroCliente", {num: countRef.current})
    }

    

    if(route.params != undefined){
        countRef.current = route.params.num;
    }

    useEffect(()=>{
        clienteService.listarClientes()
            .then((response)=>{
                setClientes(response.data)
                console.log("Listado com sucesso")
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
      <ScrollView>
      <View style={{alignItems: 'center'}}>
          <Text h2 style={styles.tit}>Clientes</Text>
          {clientes.map(cliente =>(
              <View style={styles.texto}  key={cliente.id}> 
                <Text h4>Nome: {cliente.nome}</Text>
                <Text style={styles.info}>CPF: {cliente.cpf}</Text>
                <Text style={styles.info}>Rua: {cliente.rua}</Text>
                <Text style={styles.info}>Bairro: {cliente.bairro}</Text>
                <Text style={styles.info}>Número: {cliente.numero}</Text>
                <Text style={styles.info}>Cidade: {cliente.cidade}</Text>
                <Text style={styles.info}>Celular: {cliente.celular}</Text>
                <Text style={styles.info}>Data de Nascimento: {cliente.nascimento}</Text>
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