/* eslint-disable react/react-in-jsx-scope */
import {Pressable, StyleSheet, Text, View} from 'react-native';

export const Header = ({onReset}: {onReset: () => void}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Fans</Text>
      <Pressable onPress={onReset}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Clear fans</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '10%',
  },
  button: {
    borderWidth: 1,
    borderColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
