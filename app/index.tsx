import { useState } from 'react';
import { FlatList, Text, Pressable, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MOCK_DEALS, Deal } from '@/data/mockDeals';

type SortOption = 'price' | 'score';

export default function DealsListScreen() {
  const router = useRouter();
  const [sortBy, setSortBy] = useState<SortOption>('price');
  const [minScore, setMinScore] = useState<number>(0);

  const getFilteredAndSortedDeals = (): Deal[] => {
    let deals = [...MOCK_DEALS];

    if (minScore > 0) {
      deals = deals.filter((deal) => deal.refurbed_score >= minScore);
    }

    deals.sort((a, b) => {
      if (sortBy === 'price') {
        return a.price - b.price;
      } else {
        return b.refurbed_score - a.refurbed_score;
      }
    });

    return deals;
  };

  return (
    <View style={styles.container}>
      <View style={styles.controlsBar}>
        <Pressable
          style={[styles.button, sortBy === 'price' && styles.activeButton]}
          onPress={() => setSortBy('price')}
        >
          <Text>Sort by Price</Text>
        </Pressable>
        <Pressable
          style={[styles.button, sortBy === 'score' && styles.activeButton]}
          onPress={() => setSortBy('score')}
        >
          <Text>Sort by Score</Text>
        </Pressable>
        <Pressable
          style={[styles.button, minScore === 90 && styles.activeButton]}
          onPress={() => setMinScore(minScore === 90 ? 0 : 90)}
        >
          <Text>Score ≥ 90</Text>
        </Pressable>
      </View>
      <FlatList
        data={getFilteredAndSortedDeals()}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  controlsBar: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: '#007AFF',
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
