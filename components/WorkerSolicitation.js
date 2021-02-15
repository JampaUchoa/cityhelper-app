import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { get, post } from '../utils/fetch';
import 'react-native-get-random-values';
import { Card } from './SolicitationList';
import * as Location from 'expo-location';
import { ScrollView } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';

export default function WorkerSolicitation({ navigation }) {

    const [solicitation, setSolicitation] = useState(null);
    const [location, setLocation] = useState(null);

    function createSolicitation() {
        post(`http://localhost:7500/solicitar-servico/?latitude=${location.latitude}&longitude=${location.longitude}`).then(res => {
            if (res.message == "NO_SOLICITATION"){
                alert("Não há chamados mais abertos! Bom trabalho!")
            } else {
                setSolicitation(res)
            }
        }).catch(e => console.log(e))
    }

    function finishSolicitation() {
        post(`http://localhost:7500/concluir-servico/?servico_id=${solicitation.id}`).then(() => {
            setSolicitation(null)
        }).catch(e => console.log(e))
    }


    useEffect(() => {
        async function getLocation() {

            let { status } = await Location.requestPermissionsAsync();

            if (status !== 'granted') {
                console.log(2322)
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let { coords } = await Location.getCurrentPositionAsync({});
            setLocation(coords)
        }
        getLocation();
    }, [location])



    if (!solicitation) {
        return (
            <View style={styles.container}>
                <View style={styles.button}>
                    <Button
                        onPress={() => createSolicitation()}
                        title="Solicitar novo servico"
                        color="#1874f5"
                        backgroundColor="#fff"
                        accessibilityLabel="Realizar nova solicitação"
                    />
                </View>


            </View>
        );

    }
    return (
        <View style={styles.container}>
            <ScrollView >
                <Card solicitation={solicitation} />
                <MapView
                    style={styles.map}
                    region={{
                        latitude: solicitation.latitude,
                        longitude: solicitation.longitude,
                        latitudeDelta: 0.002,
                        longitudeDelta: 0.001,
                    }}>
                    <Marker
                        coordinate={{
                            latitude: solicitation.latitude,
                            longitude: solicitation.longitude
                        }}

                    />

                </MapView>
            </ScrollView>
            <View style={styles.button}>
                <Button
                    onPress={() => finishSolicitation()}
                    title="Marcar como concluido"
                    color="#1874f5"
                    backgroundColor="#fff"
                    accessibilityLabel="Realizar nova solicitação"
                />
            </View>


        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1874f5',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        paddingTop: 0,
    },
    title: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "500",
        padding: 20
    },
    card: {
        backgroundColor: '#fff',
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        padding: 20
    },
    header: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    button: {
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: "rgba(255,255,255,1)",
        padding: 10,
        borderRadius: 10,
        color: "#1874f5",
        fontWeight: "bold"
    },
    badge: {
        textTransform: "capitalize",
        padding: 3,
        borderRadius: 5,
        backgroundColor: "#e3aa00",
        color: "#fff"
    },
    map: {
        width: "100%",
        height: 350
    }
});
