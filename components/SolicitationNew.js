import React, { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { post } from '../utils/fetch';
import soap from "soap-everywhere";
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SolicitationNew({ navigation }) {

    const [form, setForm] = useState({
        solicitacao_descricao: "",
        solicitacao_endereco: "",
        solicitacao_roteiro: "",
        latitude: "",
        longitude: "",
    })
    const [region, setRegion] = useState({
        latitude: -8.0695356,
        longitude: -34.9155052,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    useEffect(() => {
        let myUUID;
        async function fetchData() {
        try{
            myUUID = await AsyncStorage.getItem('@uuid')

        } catch(e){
            console.log(e)
        }

          if (!myUUID) {
            myUUID = uuidv4()
            AsyncStorage.setItem('@uuid', uuidv4())
          }
          changeForm("enviado_por", myUUID)
        }
    
        fetchData();
      }, [])

    const [errors, setErrors] = useState([])

    async function getLocation() {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});

        decodeCoords(location);
    }



    const changeForm = (key, val) => {
        const updatedForm = { ...form, [key]: val };
        setForm(updatedForm);
    }

    const sendForm = async () => {
        post("/api/solicitation/", form).then(res => alert(res)).catch(e => alert(JSON.stringify(e)))
        //navigation.navigate("Home")
    }

    function decodeCoords({ coords }) {
        const url = 'http://localhost:7000/geocoder?wsdl';
        const args = { latitude: coords.latitude, longitude: coords.longitude };
        soap.createClient(url, function (err, client) {
            if (err) console.error(err);
            else {
                client.reverseGeocode(args, function (err, response) {
                    setForm({ ...form, 
                        latitude: coords.latitude, 
                        longitude: coords.longitude,
                        solicitacao_endereco: response.endereco
                    })

                    setRegion({
                        latitude: coords.latitude, 
                        longitude: coords.longitude,
                        latitudeDelta: 0.002,
                        longitudeDelta: 0.001,
                
                    })

                });
            }
        });
    }

    function searchAddress(address) {
        if (form.latitude !== "") return;
        const url = 'http://localhost:7000/geocoder?wsdl';
        const args = { endereco: address };
        soap.createClient(url, function (err, client) {
            if (err) console.error(err);
            else {
                client.performGeocode(args, function (err, response) {
                    changeForm("latitude", response.latitude)
                    changeForm("longitude", response.longitude)
                    setRegion({
                        latitude: response.latitude, 
                        longitude: response.longitude,
                        latitudeDelta: 0.002,
                        longitudeDelta: 0.001,
                    })
                });
            }
        });
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1, flexGrow: 1, width: "100%" }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}>

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
                                style={{ height: 100 }}
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
                                placeholder={"Digite ou selecione no mapa..."}
                                onBlur={() => searchAddress(form.solicitacao_endereco)}
                            />
                        </View>
                        <Button
                            onPress={() => getLocation()}
                            title="Meu Local"
                            color="#ddf"
                        ></Button>

                        <MapView
                            style={styles.map}
                            region={region}
                        >

                            {form.latitude !== "" ?
                                <Marker
                                    draggable
                                    coordinate={{
                                        latitude: form.latitude,
                                        longitude: form.longitude
                                    }}
                                    onDragEnd={(e) => {
                                        decodeCoords({coords: e.nativeEvent.coordinate})
                                    }}
                                />
                                :
                                null
                            }
                        </MapView>
                        {/* <Text> {JSON.stringify(form)} </Text> */}
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
                            onPress={() => { sendForm() }}
                            title="Abrir chamado"
                            color="#1874f5"
                            backgroundColor="#fff"
                            accessibilityLabel="Realizar nova solicitação"
                            disabled={Object.values(form).indexOf("") !== -1}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>

            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1874f5',
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
        color: "#1874f5"
    },
    textDesc: {
        fontSize: 18,
        marginBottom: 5,
        color: "#fff"
    },
    map: {
        width: "100%",
        height: 150
    }

});
