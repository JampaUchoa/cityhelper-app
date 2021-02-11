import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { get } from '../utils/fetch';
import timeSince from '../utils/timesince';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SolicitationList({navigation}) {

  const [solicitations, setSolicitations] = useState([]);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let myUUID;
    async function fetchData() {
      try {
        myUUID = await AsyncStorage.getItem('@uuid')
        if (!myUUID){
          myUUID = uuidv4()
          AsyncStorage.setItem('@uuid', uuidv4())
      }

    } catch(e) {
      console.log(e)
      myUUID = uuidv4();
    }
  
    const res = await get(`/api/solicitation/?ordering=-solicitacao_data&offset=${offset}&search=${search}&sent_by=${myUUID}`)
    setSolicitations(res.results);
    setCount(res.count);
      
    }

    fetchData();
  }, [offset, search])

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView>
        <View style={styles.button}>
          <Button
            onPress={() => {navigation.navigate("Nova Solicitação")}}
            title="+ Nova Solicitação"
            color="#1874f5"
            backgroundColor= "#fff"
            accessibilityLabel="Realizar nova solicitação"
          />
        </View>

        {solicitations.map(solicitation => <Card key={solicitation.id} solicitation={solicitation} />)}
      </ScrollView>


    </View>
  );
}

function Card({ solicitation }) {

  return (
    <SafeAreaView>

      <View style={styles.card}>
        <View style={styles.header}>
          <Text> {solicitation.processo_numero} </Text>
          <Text> {solicitation.processo_status} </Text>
        </View>
        <Text> há {timeSince(solicitation.solicitacao_data)} </Text>
        <Text numberOfLines={3}> {solicitation.solicitacao_descricao} </Text>
        <Text numberOfLines={1}> {solicitation.solicitacao_endereco} </Text>

      </View>
    </SafeAreaView>

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
});
