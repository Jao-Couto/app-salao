import { StyleSheet} from 'react-native';
import { colors } from 'react-native-elements';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 50
    },
    logo:{
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
    },
    login:{
      flex: 1,
      width: '90%',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    loginTit:{
      fontWeight: 'bold',
      color: '#fbff00',
      marginBottom: 10,
    },
    safeArea:{
      flex: 1,
      justifyContent: 'flex-start',
      paddingTop:30,
      backgroundColor: '#b23dff',
    },
    buttonArea:{
      flexDirection: 'column',
      justifyContent: 'center',
    },
    botao:{
      margin: 10
    },
    label:{
      alignSelf: 'flex-start',
      marginLeft: 10,
      color: '#00f518'
    },
    endereco:{
      flexDirection: 'row',
    },
    enderecoTit:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      top:5
    },
    inputMask:{
      flexGrow: 1,
      height: 40,
      fontSize: 18,
      alignSelf: 'flex-start',
      color: '#000'
    },
    containerMask:{
      flexDirection: 'row',
      margin: 10,
      marginTop: 0,
      flexWrap: 'wrap',
      backgroundColor: '#fff',
      padding: 2, 
      borderRadius: 7,
      paddingBottom: 5,
      paddingTop: 5
    },
    icon:{
      fontSize: 25,
      alignSelf: 'center',
      marginRight: 5,
    },
    errorMsg:{
      alignSelf: 'flex-start',
      marginLeft: 15,
      color: 'red',
      fontSize: 16
    },
    tit:{
      color: '#fbff00'
    },
    texto:{
      flex:1,
      width: '80%',
      backgroundColor: '#ffe599',
      margin: 10,
      padding: 20,
      borderRadius: 5
    },
    alinhaBotao:{
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 10,
      borderColor:'#999',
      borderWidth: 1,
      padding: 5,
      width: '90%',
      backgroundColor: '#ffe599',
      borderRadius: 15,
    },
    info:{
      fontSize: 17
    },
  });

  export default styles