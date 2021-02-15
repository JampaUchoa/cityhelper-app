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

export default function HomeScreen({ navigation }) {
    return (

        <View style={styles.container}>
            <StatusBar style="light" />
            <Text style={styles.title}> City Helper </Text>
            <View style={styles.button}>
                <Button
                    onPress={() => { navigation.navigate("Minhas Solicitações") }}
                    title="Minhas requisições"
                    color="#1874f5"
                    backgroundColor="#fff"
                    accessibilityLabel="Realizar nova solicitação"
                />

            </View>
            <View style={styles.button}>
                <Button
                    onPress={() => { navigation.navigate("Trabalhador") }}
                    title="Visão trabalhador"
                    color="red"
                />

            </View>

            <Button
                onPress={() => { navigation.navigate("Monitor") }}
                title="Status do Serviço"
                color="#fff"
                accessibilityLabel="Realizar nova solicitação"
            />

        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1874f5',
        padding: 10,
        paddingTop: 0,
    },
    service: {
        marginVertical: 10
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
    title: {
        color: "#fff",
        fontSize: 40,
        fontWeight: "500",
        padding: 20,
        marginVertical: 40,
        textAlign: "center"
    },
});