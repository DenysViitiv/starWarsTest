/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../../../App';

export const DetailsScreen = ({
  route,
}: {
  route: RouteProp<RootStackParamList, 'Details'>;
}) => {
  const navigation = useNavigation();

  const {
    name,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    gender,
    // @ts-ignore
  } = route.params.item;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.nameContainer}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>{name}</Text>
        </View>
        <View style={styles.propContainer}>
          <Text style={styles.textProp}>Heigth: {height}</Text>
        </View>
        <View style={styles.propContainer}>
          <Text style={styles.textProp}>Mass: {mass}</Text>
        </View>
        <View style={styles.propContainer}>
          <Text style={styles.textProp}>Hair color: {hair_color}</Text>
        </View>
        <View style={styles.propContainer}>
          <Text style={styles.textProp}>Skin color: {skin_color}</Text>
        </View>
        <View style={styles.propContainer}>
          <Text style={styles.textProp}>Eye color: {eye_color}</Text>
        </View>
        <View style={styles.propContainer}>
          <Text style={styles.textProp}>Birth year: {birth_year}</Text>
        </View>
        <View style={styles.propContainer}>
          <Text style={styles.textProp}>Gender: {gender}</Text>
        </View>
        <TouchableOpacity
          style={[styles.propContainer, styles.backButton]}
          onPress={() => navigation.goBack()}>
          <Text style={[styles.textProp, {color: 'white', fontWeight: 'bold'}]}>
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  nameContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  propContainer: {
    width: '100%',
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  textProp: {
    fontSize: 20,
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
});
