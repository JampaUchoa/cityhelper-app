import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { get } from '../utils/fetch';
import timeSince from '../utils/timesince';

export default function SolicitationNew() {

    const [form, setForm] = useState({})
    const [errors, setErrors] = useState([])

    const changeForm = (key,val) => {
        const updatedForm = { ...form, [key]: val };
        setForm(updatedForm);
    }

    const sendForm = async (e) => {
        try {
            post("/api/solicitacoes/", form);
        } catch (e) {
            setErrors(Object.values(e));
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{flex: 1, flexGrow: 1, width: "100%"}}>
                <View style={styles.card}>
                        <Text style={styles.title}>
                            Nova solicitação
                        </Text>

                        <View style={styles.formSection}>
                            <Text style={styles.textDesc}>
                                Descrição
                            </Text>
                            <TextInput
                                multiline={true}
                                numberOfLines={4}
                                style={styles.textInput}
                                onChangeText={text => changeForm("solicitacao_descricao", text)}
                                value={form.solicitacao_descricao}
                            />
                        </View>

                        <View style={styles.formSection}>
                            <Text style={styles.textDesc}>
                                Endereço
                            </Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={text => changeForm("solicitacao_endereco", text)}
                                value={form.solicitacao_endereco}
                            />
                        </View>

                        <View style={styles.formSection}>
                            <Text style={styles.textDesc}>
                                Referencia
                            </Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={text => changeForm("solicitacao_roteiro", text)}
                                value={form.solicitacao_roteiro}
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
        padding: 10,
        paddingTop: 0
    },
    title: {
        fontSize: 22,
        fontWeight: "500",
        margin: 20,
        marginTop: 0,

        textAlign: "center"
    },
    card: {
        // backgroundColor: '#fff',
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 20,
        padding: 20,
        flexGrow: 1
    },
    textInput: {
        borderColor: 'gray', 
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: "rgba(255,255,255,22)"
    },
    formSection: {
        marginVertical: 7
    },
    textDesc:{
        marginHorizontal: 5,
        fontSize: 18
    }

});
