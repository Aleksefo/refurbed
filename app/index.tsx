import { useState, useRef, useLayoutEffect, useMemo, useCallback } from 'react';
import { FlatList, Text, Pressable, View, StyleSheet, ViewToken } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { MOCK_DEALS, Deal } from '@/data/mockDeals';
import { analytics } from '@/services/analytics';
import { featureFlags } from '@/services/featureFlags';
import MaintenanceWarning from '@/components/MaintenanceWarning';
import FeatureFlagToggle from '@/components/FeatureFlagToggle';
import DealListItem from '@/components/DealListItem';

type SortOption = 'price' | 'score';

export default function DealsListScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [sortBy, setSortBy] = useState<SortOption>('price');
  const [minScore, setMinScore] = useState<number>(0);
  const [featureEnabled, setFeatureEnabled] = useState(featureFlags.isEnabled('showDealsSpotlight'));
  const viewedDeals = useRef(new Set<string>());

  const handleViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      viewableItems.forEach((viewableItem) => {
        const deal = viewableItem.item as Deal;
        if (!viewedDeals.current.has(deal.id)) {
          viewedDeals.current.add(deal.id);
          analytics.trackDealImpression({
            dealId: deal.id,
            title: deal.title,
            price: deal.price,
            refurbed_score: deal.refurbed_score,
          });
        }
      });
    }
  ).current;

  const filteredAndSortedDeals = useMemo(() => {
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
  }, [sortBy, minScore]);

  const handleDealClick = useCallback(
    (deal: Deal) => {
      analytics.trackDealClick({
        dealId: deal.id,
        title: deal.title,
      });
      router.push(`/details?id=${deal.id}`);
    },
    [router]
  );

  const keyExtractor = useCallback((item: Deal) => item.id, []);

  const viewabilityConfig = useMemo(
    () => ({
      itemVisiblePercentThreshold: 50,
    }),
    []
  );

  const renderItem = useCallback(
    ({ item }: { item: Deal }) => <DealListItem deal={item} onPress={handleDealClick} />,
    [handleDealClick]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <FeatureFlagToggle
          onToggle={() => {
            const newValue = !featureEnabled;
            featureFlags.setFlag('showDealsSpotlight', newValue);
            setFeatureEnabled(newValue);
          }}
        />
      ),
    });
  }, [navigation, featureEnabled]);

  if (!featureEnabled) {
    return <MaintenanceWarning />;
  }

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
        data={filteredAndSortedDeals}
        keyExtractor={keyExtractor}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={renderItem}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={10}
        windowSize={5}
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
});
