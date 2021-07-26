import * as React from 'react';
import { View } from 'react-native';
import styles from '../style';
import { Text, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';




export default function Principal({navigation}) {

  const entrar = () => {
      navigation.navigate("CadastroCliente")
  }

  const pendentes = () => {
    navigation.navigate("Pendentes")
  }

  const pagos = () => {
    navigation.navigate("Pagos")
  }


  return (
    <LinearGradient
    colors={['#b23dff', '#782bab', '#2e034a']}
    style={[styles.safeArea, styles.container]}>
      <View style={styles.buttonArea}>
        <Button
          buttonStyle={styles.botao}
          icon={
            <Icon
              name="book"
              size={15}
              color="white"
            />
          }
          title=" Pagos"
          //onPress={() => pagos()}
        />
        <Button
        buttonStyle={styles.botao}
          icon={
            <Icon
              name="user-plus"
              size={15}
              color="white"
              
            />
          }
          title=" Cadastrar"
          onPress={() => entrar()}
        />
        <Button
        buttonStyle={styles.botao}
          icon={
            <Icon
              name="users"
              size={15}
              color="red"
            />
          }
          title=" Pendentes"
          onPress={()=>pendentes()}
        />
      </View>
    </LinearGradient>
  );
}
