import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { get } from '../utils/fetch';
import timeSince from '../utils/timesince';

export default function SolicitationList({navigation}) {

  const [solicitations, setSolicitations] = useState([]);
  const [ordering, setOrdering] = useState("-solicitacao_data");
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const [searchTarget, setSearchTargets] = useState({});

  useEffect(() => {
    get(`/api/solicitation/?ordering=${ordering}&offset=${offset}&search=${search}&${jsonToQueryString(searchTarget)}`).then(res => {
      setSolicitations(res.results);
      setCount(res.count);
    });
  }, [ordering, offset, search, searchTarget])

  const jsonToQueryString = (json) => {
    return Object.keys(json).map(function (key) {
      return encodeURIComponent(key) + '=' +
        encodeURIComponent(json[key]);
    }).join('&');
  }


  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView>
        {/* <Text style={styles.title}>Minhas Solicitações</Text> */}
        <Button
          onPress={() => {navigation.navigate("Nova Solicitação")}}
          title="Nova Solicitação"
          color="#FFF"
          backgroundColor= "#fff"
          accessibilityLabel="Realizar nova solicitação"
        />

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
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingTop: 0
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
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
