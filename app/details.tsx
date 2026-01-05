import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MOCK_DEALS } from '@/data/mockDeals';

export default function DealDetailsScreen() {
  const { id } = useLocalSearchParams();
  const deal = MOCK_DEALS.find((d) => d.id === id);

  if (!deal) {
    return (
      <View style={styles.container}>
        <Text>Deal not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Title: {deal.title}</Text>
      <Text>Price: €{deal.price}</Text>
      <Text>Original Price: €{deal.originalPrice}</Text>
      <Text>Discount: {deal.discount}%</Text>
      <Text>Refurbed Score: {deal.refurbed_score}/100</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
