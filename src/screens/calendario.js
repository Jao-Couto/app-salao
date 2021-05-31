import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import styles from '../style';

export default function Calendario({navigation}) {
  const [selectedStartDate, setSelectedStartDate] = useState("");
  


  const onDateChange = (date) => {
    setSelectedStartDate(date) 
    let data = date.format("DD/MM/YYYY")
    let dataSql = date.format("YYYY-MM-DD")
    navigation.navigate("Atendimentos", {data: data, dataSql: dataSql})
  }



    return (
      <LinearGradient
    colors={['#b23dff', '#782bab', '#2e034a']}
    style={styles.safeArea}>
      <View style={styles.container}>
        <CalendarPicker
            nextTitle={'Próximo'}
            previousTitle={'Anterior'}
            textStyle={{ color: '#fff', fontSize: 15}}
            todayBackgroundColor= '#f0ebd1'
            selectedDayColor= '#6190c2'
            yearTitleStyle={{color:'#fbff00', fontSize: 20}}
            monthTitleStyle={{color:'#fbff00', fontSize: 20}}
            nextTitleStyle={{color:'red'}}
            previousTitleStyle={{color:'red'}}
            showDayStragglers= {false}
            weekdays={['Dom','Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']}
            months={['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']}
            onDateChange={onDateChange}
        />
      </View>
      </LinearGradient>
    );
  }
