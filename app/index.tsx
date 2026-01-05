import { FlatList, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const DATA = [
  { id: '1', name: 'iPhone 10' },
  { id: '2', name: 'Samsung 23' },
];

export default function DealsListScreen() {
  const router = useRouter();

  return (
    <FlatList
      data={DATA}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable
          style={styles.item}
          onPress={() => router.push(`/details?id=${item.id}&name=${item.name}`)}
        >
          <Text>{item.name}</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
