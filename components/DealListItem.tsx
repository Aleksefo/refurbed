import { memo } from 'react';
import { Text, Pressable, View, StyleSheet } from 'react-native';
import { Deal } from '@/data/mockDeals';

interface DealListItemProps {
  deal: Deal;
  onPress: (deal: Deal) => void;
}

function DealListItem({ deal, onPress }: DealListItemProps) {
  return (
    <Pressable style={styles.container} onPress={() => onPress(deal)}>
      <View style={styles.card}>
        <Text style={styles.title} numberOfLines={1}>
          {deal.title}
        </Text>
        <View style={styles.row}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>€{deal.price.toFixed(2)}</Text>
            <Text style={styles.originalPrice}>€{deal.originalPrice.toFixed(2)}</Text>
          </View>
          <View style={styles.badgeContainer}>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{deal.discount}%</Text>
            </View>
            <View style={styles.scoreBadge}>
              <Text style={styles.scoreText}>{deal.refurbed_score}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1a1a1a',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  discountBadge: {
    backgroundColor: '#ff5252',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  scoreBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  scoreText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default memo(DealListItem);
