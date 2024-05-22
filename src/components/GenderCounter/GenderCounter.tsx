import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {GenderCardsProps, GenderCounts} from '../../types/types';

const GenderCard = ({gender, count}: {gender: string; count: number}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{gender}</Text>
      <Text style={styles.count}>{count}</Text>
    </View>
  );
};

export const GenderCards = ({genderCounts}: GenderCardsProps) => {
  const genders = Object.keys(genderCounts) as (keyof GenderCounts)[];

  return (
    <View style={styles.container}>
      {genders.map(gender => (
        <GenderCard key={gender} gender={gender} count={genderCounts[gender]} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 40,
  },
  card: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 5,
    width: 100,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  count: {
    fontSize: 18,
    marginTop: 5,
    color: 'black',
  },
});
