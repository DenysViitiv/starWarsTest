/* eslint-disable react/react-in-jsx-scope */
import {Button, StyleSheet, Text, View} from 'react-native';
import {PaginationProps} from '../../types/types';

export const Pagination = ({
  allPages,
  page,
  onPressNext,
  onPressPrev,
}: PaginationProps) => {
  return (
    <View style={styles.paginationContainer}>
      <Button title="Prev Page" onPress={onPressPrev} disabled={page === 1} />
      <Text>{`${page} of ${allPages}`}</Text>
      <Button
        title="Next Page"
        onPress={onPressNext}
        disabled={page === allPages}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: '5%',
    paddingBottom: '15%',
  },
});
