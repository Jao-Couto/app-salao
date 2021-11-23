import * as React from 'react';
import { View } from 'react-native';
import styles from '../style';
import { Text, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import Globais from '../globais';




export default function Principal({ navigation }) {



  const pendentes = () => {
    navigation.navigate("Pendentes")
  }

  const pagos = () => {
    navigation.navigate("Pagos")
  }

  const servicos = () => {
    navigation.navigate("Serviços")
  }

  const sair = () => {
    Globais.user = ""
    navigation.navigate("Login")
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
          onPress={() => pagos()}
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
          title=" Fiado"
          onPress={() => pendentes()}
        />
        <Button
          buttonStyle={styles.botao}
          icon={
            <Icon
              name="wrench"
              size={15}
              color="white"
            />
          }
          title=" Serviços"
          onPress={() => servicos()}
        />
        <Button
          buttonStyle={styles.botao}
          icon={
            <Icon
              name="sign-out-alt"
              size={15}
              color="red"
            />
          }
          title=" Sair"
          onPress={() => sair()}
        />
      </View>
    </LinearGradient>
  );
}
