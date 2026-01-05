import { memo } from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { Deal } from '@/data/mockDeals';

interface DealListItemProps {
  deal: Deal;
  onPress: (deal: Deal) => void;
}

function DealListItem({ deal, onPress }: DealListItemProps) {
  return (
    <Pressable style={styles.item} onPress={() => onPress(deal)}>
      <Text>{deal.title}</Text>
      <Text>€{deal.price}</Text>
      <Text>{deal.discount}% off</Text>
      <Text>Refurbed Score: {deal.refurbed_score}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default memo(DealListItem);
