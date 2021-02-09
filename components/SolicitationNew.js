import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { post } from '../utils/fetch';
import soap from "soap-everywhere";
import * as Location from 'expo-location';

export default function SolicitationNew({navigation}) {

  async function getLocation() {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
    setErrorMsg('Permission to access location was denied');
    return;
    }

    let location = await Location.getCurrentPositionAsync({});
    decodeCoords(location);
  }

    const [form, setForm] = useState({
        solicitacao_descricao: "",
        solicitacao_endereco: "",
        solicitacao_roteiro: ""
    })

    const [errors, setErrors] = useState([])

    const changeForm = (key,val) => {
        const updatedForm = { ...form, [key]: val };
        setForm(updatedForm);
    }

    const sendForm = async () => {
        post("/api/solicitation/", form).then(res => alert(res))
        //navigation.navigate("Home")
    }

    function decodeCoords({coords}) {
        const url = 'http://localhost:7000/geocoder?wsdl';
        const args = { latitude: coords.latitude, longitude: coords.longitude };
        soap.createClient(url, function(err, client) {
        if (err) console.error(err);
        else {
            client.reverseGeocode(args, function(err, response) {
                changeForm("solicitacao_endereco", response.endereco)
            });
        }
        });
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{flex: 1, flexGrow: 1, width: "100%"}}>
                <View style={styles.card}>
                    {/* <Text style={styles.title}>
                        Nova solicitação
                    </Text> */}

                    <View style={styles.formSection}>
                        <Text style={styles.textDesc}>
                            Descrição
                        </Text>
                        <View style={styles.textInput}>
                        <TextInput
                            multiline={true}
                            style={{height: 100}}
                            numberOfLines={4}
                            onChangeText={text => changeForm("solicitacao_descricao", text)}
                            value={form.solicitacao_descricao}
                        />
                        </View>

                    </View>

                    <View style={styles.formSection}>
                        <Text style={styles.textDesc}>
                            Endereço
                        </Text>
                        <View style={styles.textInput}>
                        <TextInput
                            onChangeText={text => changeForm("solicitacao_endereco", text)}
                            value={form.solicitacao_endereco}
                        />
                        </View>
                        <Button
                            onPress={() => getLocation()}
                            title="Meu Local"
                            color="#ddf"
                        ></Button>
                    </View>

                    <View style={styles.formSection}>
                        <Text style={styles.textDesc}>
                            Referencia
                        </Text>
                        <View style={styles.textInput}>
                        <TextInput
                            onChangeText={text => changeForm("solicitacao_roteiro", text)}
                            value={form.solicitacao_roteiro}
                        />
                        </View>

                    </View>
                    <View style={styles.button}>
                    <Button
                        onPress={() => {sendForm()}}
                        title="Abrir chamado"
                        color="purple"
                        backgroundColor= "#fff"
                        accessibilityLabel="Realizar nova solicitação"
                        disabled={Object.values(form).indexOf("") !== -1}
                    />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'purple',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 0
    },
    title: {
        fontSize: 22,
        fontWeight: "500",
        margin: 20,
        marginTop: 0,
        color: "#fff",
        textAlign: "center"
    },
    card: {
        // backgroundColor: '#fff',
        marginVertical: 10,
        marginHorizontal: 0,
        borderRadius: 20,
        padding: 20,
        flexGrow: 1
    },
    textInput: {
        padding: 10,
        backgroundColor: "rgba(255,255,255,0.4)",
        borderRadius: 5,
        fontSize: 16
    },
    formSection: {
        marginVertical: 7,
        backgroundColor: "rgba(255,255,255,0.2)",
        padding: 10,
        borderRadius: 10
    },
    button: {
        marginVertical: 7,
        backgroundColor: "rgba(255,255,255,1)",
        padding: 10,
        borderRadius: 10,
        color: "purple"
    },
    textDesc:{
        fontSize: 18,
        marginBottom: 5,
        color: "#fff"
    }

});
