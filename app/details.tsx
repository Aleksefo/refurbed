import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function DealDetailsScreen() {
  const { id, name } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text>Deal ID: {id}</Text>
      <Text>Name: {name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
