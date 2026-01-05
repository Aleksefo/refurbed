import { FlatList, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MOCK_DEALS } from '@/data/mockDeals';

export default function DealsListScreen() {
  const router = useRouter();

  return (
    <FlatList
      data={MOCK_DEALS}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable
          style={styles.item}
          onPress={() => router.push(`/details?id=${item.id}`)}
        >
          <Text>{item.title}</Text>
          <Text>€{item.price}</Text>
          <Text>{item.discount}% off</Text>
          <Text>Refurbed Score: {item.refurbed_score}</Text>
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
