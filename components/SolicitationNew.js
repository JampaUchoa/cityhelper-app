import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { get, post } from '../utils/fetch';
import timeSince from '../utils/timesince';

export default function SolicitationNew({navigation}) {

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
