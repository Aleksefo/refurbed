import { useState, useRef, useLayoutEffect, useMemo, useCallback } from 'react';
import { FlatList, Text, Pressable, View, StyleSheet, ViewToken } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { MOCK_DEALS, Deal } from '@/data/mockDeals';
import { analytics } from '@/services/analytics';
import { featureFlags } from '@/services/featureFlags';
import MaintenanceWarning from '@/components/MaintenanceWarning';
import FeatureFlagToggle from '@/components/FeatureFlagToggle';
import DealListItem from '@/components/DealListItem';
import { filterAndSortDeals, SortOption } from '@/utils/dealFilters';

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

  const filteredAndSortedDeals = useMemo(
    () => filterAndSortDeals(MOCK_DEALS, sortBy, minScore),
    [sortBy, minScore]
  );

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
          <Text style={[styles.buttonText, sortBy === 'price' && styles.activeButtonText]}>
            Price
          </Text>
        </Pressable>
        <Pressable
          style={[styles.button, sortBy === 'score' && styles.activeButton]}
          onPress={() => setSortBy('score')}
        >
          <Text style={[styles.buttonText, sortBy === 'score' && styles.activeButtonText]}>
            Score
          </Text>
        </Pressable>
        <Pressable
          style={[styles.button, minScore === 90 && styles.activeButton]}
          onPress={() => setMinScore(minScore === 90 ? 0 : 90)}
        >
          <Text style={[styles.buttonText, minScore === 90 && styles.activeButtonText]}>
            Score ≥ 90
          </Text>
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
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  controlsBar: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  activeButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  buttonText: {
    fontSize: 13,
    color: '#333',
  },
  activeButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  listContent: {
    paddingVertical: 8,
  },
});
