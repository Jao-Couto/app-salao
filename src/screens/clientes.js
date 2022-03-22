import React, { useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import styles from '../style';
import { Text, Button } from 'react-native-elements';
import clienteService from '../service/clienteService';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/core';
import Globais from '../globais';



export default function Clientes() {
    const [clientes, setClientes] = useState([]);
    let countRef = useRef(0);
    const navigation = useNavigation();
    const route = useRoute();

    const listar = () => {
        clienteService.listarClientes(Globais.user)
            .then((response) => {

                setClientes(response.data)
                console.log("Listado com sucesso")

            })
            .catch((error) => {
                console.log(error)
                console.log("Erro ao Listar")
            })
    }

    const entrar = (cliente = null) => {
        navigation.navigate("CadastroCliente", { num: countRef.current, cliente: cliente })
    }



    if (route.params != undefined) {
        countRef.current = route.params.num;
    }

    function confirmUserDeletion(cliente) {
        Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
            {
                text: 'Sim',
                onPress: () => {
                    clienteService.deletarId(cliente)
                        .then((response) => {
                            listar()
                        })
                        .catch((error) => {
                            console.log(error)
                            console.log("Erro ao Listar")
                        })
                }
            },
            {
                text: 'Não'
            }
        ])
    }

    useEffect(() => {
        listar()
    }, [countRef.current]);



    return (
        <LinearGradient
            colors={['#b23dff', '#782bab', '#2e034a']}
            style={styles.safeArea}>
            <ScrollView>
                <View style={{ alignItems: 'center' }}>
                    <Text h2 style={styles.tit}>Clientes</Text>
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



                    {clientes.map(cliente => (
                        <View style={styles.texto} key={cliente.id}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text h4>Nome: {cliente.nome}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Button
                                        onPress={() => entrar(cliente)}
                                        type="clear"
                                        icon={<Icon name="edit" size={20} color="orange" />}
                                    ></Button>
                                    <Button
                                        onPress={() => confirmUserDeletion(cliente.id)}
                                        type="clear"
                                        icon={<Icon name="trash-alt" size={20} color="red" />}
                                    ></Button>
                                </View>
                            </View>
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

            </ScrollView>
        </LinearGradient>
    );
}