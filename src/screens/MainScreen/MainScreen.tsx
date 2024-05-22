/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useQuery} from '@tanstack/react-query';
import {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {fetchData} from '../../request/Request';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../components/Header/Header';
import BlackHeart from '../../assets/blackHeart.svg';
import Heart from '../../assets/heart.svg';
import EmptyHeart from '../../assets/emptyHeart.svg';
import {Pagination} from '../../components/Pagination/Pagination';
import {GenderCards} from '../../components/GenderCounter/GenderCounter';
import {Character, MutationProps} from '../../types/types';
import {useNavigation} from '@react-navigation/native';

export const MainScreen = () => {
  const [page, setPage] = useState(1);
  const [pressedHeart, setPressedHeart] = useState<Record<string, boolean>>({});
  const [genderCounts, setGenderCounts] = useState({
    male: 0,
    female: 0,
    other: 0,
  });

  const navigation = useNavigation();

  const {data, isLoading, isFetching} = useQuery({
    queryKey: ['people', page],
    queryFn: () => fetchData(page),
  });

  const resetCounter = () => {
    setGenderCounts({
      male: 0,
      female: 0,
      other: 0,
    });
    setPressedHeart({});
  };

  const mutationFn = ({id, gender}: MutationProps) => {
    setPressedHeart(prevState => {
      const newPressedHeart = {...prevState};
      newPressedHeart[id] = !newPressedHeart[id];
      return newPressedHeart;
    });

    setGenderCounts(prevCounts => {
      const newCounts = {...prevCounts};
      if (gender === 'male' || gender === 'female') {
        newCounts[gender] = pressedHeart[id]
          ? newCounts[gender] - 1
          : newCounts[gender] + 1;
      } else {
        newCounts.other = pressedHeart[id]
          ? newCounts.other - 1
          : newCounts.other + 1;
      }
      return newCounts;
    });
  };

  const handleToggleHeart = (
    id: number,
    gender: 'male' | 'female' | 'other',
  ) => {
    mutationFn({id, gender});
  };

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const allPages = Math.ceil(data?.count / 10);

  const renderMessage = ({item}: {item: Character}) => {
    const gender = item.gender;
    const id = item.name;
    const isPressed = pressedHeart[id] || false;

    return (
      <View key={item.name}>
        <TouchableOpacity
          style={styles.infoContainer}
          onPress={() =>
            // @ts-ignore
            navigation.navigate('Details', {
              item,
            })
          }>
          <Pressable
            onPress={() =>
              //@ts-ignore
              handleToggleHeart(id, gender)
            }>
            {isPressed ? (
              <Heart width={20} height={20} />
            ) : (
              <EmptyHeart width={20} height={20} />
            )}
          </Pressable>
          <Text style={{color: 'black'}}>{item.name}</Text>
          <Text style={{color: 'black'}}>{item.gender}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: 10}}>
      <ScrollView>
        <Header onReset={resetCounter} />
        <GenderCards genderCounts={genderCounts} />
        <View style={styles.tableContainer}>
          <View style={styles.infoContainer}>
            <BlackHeart width={20} height={20} />
            <Text style={{color: 'black'}}>Name</Text>
            <Text style={{color: 'black'}}>Gender</Text>
          </View>
          <FlatList
            data={data?.results}
            renderItem={renderMessage}
            scrollEnabled={false}
          />
        </View>
        <Pagination
          allPages={allPages}
          page={page}
          onPressPrev={handlePrevPage}
          onPressNext={handleNextPage}
        />
      </ScrollView>
      {isLoading && isFetching && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tableContainer: {
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  infoContainer: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '3%',
    paddingVertical: '3%',
  },
  character: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
