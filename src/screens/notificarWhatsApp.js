import React from 'react';
import {Linking } from 'react-native';
import { Button } from 'react-native-elements';

export default function NotificarWhatsApp(props) {
    let num = props.num
    let texto = props.texto

    return(
        <Button
                  buttonStyle={{borderRadius: 10, margin: 2, backgroundColor:'green', marginTop: 10}}
                  titleStyle={{fontSize: 12}}
                    title="Notificar"
                    onPress={() =>Linking.openURL(`whatsapp://send?text=${texto}&phone=${num}`)
                    }
                />

    );
}