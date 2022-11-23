import axios from 'axios';
import React, {Component, useEffect} from 'react';
import {Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {getPlace} from './src/api/maps';
const CustomMarker = () => {
  return (
    <Text style={{backgroundColor: 'red', borderRadius: 8, color: 'white'}}>
      Custom Pin
    </Text>
  );
};
const App = () => {
  const [fromLoc, setFromLoc] = React.useState({
    latitude: 43.222,
    longitude: 76.8512,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [toLoc, setToLoc] = React.useState({
    latitude: 43.222,
    longitude: 76.8512,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [inputs, setInputs] = React.useState({
    from: '',
    to: '',
  });
  useEffect(() => {
    console.log('FFF');
  }, [inputs]);
  const handleInputChange = (name, value) => {
    setInputs({...inputs, [name]: value});
    searchFromGoogle(name, value);
  };
  const searchFromGoogle = async (name, text) => {
    try {
      const res = await axios.get(
        `https://geocode-maps.yandex.ru/1.x/?apikey=9eb8bfb0-1f2d-4dd4-9782-096a4a7a6914&format=json&geocode=${text}`,
        // `https://api-maps.yandex.ru/2.1?apikey=9eb8bfb0-1f2d-4dd4-9782-096a4a7a6914&format=json&geocode=&lang=ru_RU&text=улица`,
      );

      const newLoc =
        res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(
          ' ',
        );
     
      const loc = {
        longitude: parseFloat(newLoc[0]),
        latitude: parseFloat(newLoc[1]),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    
      if (name = 'from') {
        console.log(name,loc);
        setFromLoc(loc);
      } else {
        console.log(name,loc);
        setToLoc(loc);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <View style={{flex: 1}}>
      <TextInput
        placeholder="Откуда"
        value={inputs.from}
        style={{paddingLeft: 10}}
        onChangeText={value => handleInputChange('from', 'Almaty mall')}
      />
      <TextInput
        placeholder="Куда"
        value={inputs.to}
        style={{paddingLeft: 10}}
        onChangeText={value => handleInputChange('to', 'ADK')}
      />

      <MapView
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion={{
          latitude: 43.222,
          longitude: 76.8512,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          title="ALMAU"
          description="University"
          pinColor="green"
          coordinate={toLoc}
        />

        <Marker
          title="ALMAU"
          description="University"
          pinColor="red"
          coordinate={toLoc}
        />

        {/* <Marker    coordinate={location}>
        <CustomMarker />
      </Marker> */}
      </MapView>
    </View>
  );
};
export default App;
