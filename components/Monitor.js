import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { get } from '../utils/fetch';
import searchAddress from './SolicitationNew';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import soap from "soap-everywhere";

export default function Monitor({ navigation }) {


    const [backend, setBackend] = useState("UNKNOWN");
    const [geolocation, setGeolocation] = useState("UNKNOWN");
    const [worker, setWorker] = useState("UNKNOWN");

    // useEffect(() => {

    //   fetchData();
    // }, [offset, search])

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    )

    async function fetchData() {

        try {
            const res = await get(`/api/solicitation/`)
            if (res) {
                setBackend("WORKING")
            }
        }
        catch {
            setBackend("OFFLINE")
        }

        // FIX hanging
        const timeout = setTimeout(() => setGeolocation("OFFLINE"), 5000)

        const url = 'http://localhost:7000/geocoder?wsdl';
        const args = { endereco: "1 Infinite Loop, Cupertino, CA" };
        soap.createClient(url, function (err, client) {
            if (err) {
                setGeolocation("OFFLINE")
            }
            else {
                client.performGeocode(args, function (err, response) {
                    if (err) {
                        setGeolocation("OFFLINE")
                    }
                    clearTimeout(timeout)
                    setGeolocation("WORKING")

                });
            }
        });



        try {
            const res = await get(`http://localhost:7500/`)
            if (res) {
                setWorker("WORKING")
            }
        }
        catch (e) {
            console.log(e)
            setWorker("OFFLINE")
        }

    }

    return (
        <View style={styles.container}>

            <View style={styles.service}>
                <Text>Serviço Django (REST)</Text>
                <Badge status={backend} />
            </View>

            <View style={styles.service}>
                <Text>Serviço de Geolocalização (SOAP)</Text>
                <Badge status={geolocation} />
            </View>

            <View style={styles.service}>
                <Text>Serviço de Atendimendo de Solicitações (REST)</Text>
                <Badge status={worker} />
            </View>

        </View>
    );
}

function Badge({ status }) {

    if (status == "WORKING") {
        return (
            <Text>
                🟢 ON-LINE
            </Text>
        )
    } else if (status == "OFFLINE") {
        return (
            <Text>
                🔴 Indisponível
            </Text>
        )

    } else {
        return (
            <Text>
                🟡 Carregando...
            </Text>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1874f522',
        padding: 10,
        paddingTop: 0,
    },
    service: {
        marginVertical: 10
    }
});
