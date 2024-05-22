/* eslint-disable react/react-in-jsx-scope */
import {createStackNavigator} from '@react-navigation/stack';
import {MainScreen} from './src/screens/MainScreen/MainScreen';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {DetailsScreen} from './src/screens/DetailsScreen/DetailsScreen';

export type RootStackParamList = {
  Main: undefined;
  Details: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

const App = () => {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Details"
              component={DetailsScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
