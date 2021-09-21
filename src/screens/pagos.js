import React, { useState, useEffect } from 'react';
import { ProgressBarAndroidBase, View } from 'react-native';
import styles from '../style';
import { Text, Button } from 'react-native-elements';
import { ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import pagoService from '../service/pagoService';



export default function Pagos({ route}) {
    const [pagos, setPagos] = useState([]);
    

    useEffect(()=>{
      pagoService.listar()
        .then((response)=>{ 
            setPagos(response.data)
            console.log("Listado pagos com sucesso")

        })
        .catch((error) => {
            console.log(error)
        console.log("Erro ao Listar")
        })

    }, []);




  return(
        <LinearGradient
        colors={['#b23dff', '#782bab', '#2e034a']}
        style={styles.safeArea}>
          <ScrollView >
          <View style={{alignItems: 'center'}}>
            <View style={{flexDirection: 'row'}}>
          <Text h3 style={styles.tit}>Pagos</Text>
              </View>
          {pagos.map(pago =>(
            <View style={styles.alinhaBotao} key={pago.id}>
              <View style={styles.texto}  > 
                <Text h4>Cliente: {(pago.cliente.nome)}</Text>
                <Text style={{fontSize:18}}>Data: {(pago.data)}</Text>
                <Text style={{fontSize:18}}>Hora: {(pago.hora).substring(0,5)}</Text>
                <Text style={{fontSize:18}}>Descrição: {pago.descricao}</Text>
                <Text style={{fontSize:18}}>R$ {parseFloat(pago.valor).toFixed(2).replace(".", ",")}</Text>
                
              </View>
            </View>
          ))}
          
      </View>
      </ScrollView>
      </LinearGradient>
  );
}