import { FlatList, Text, View, StyleSheet } from 'react-native';

const DATA = [
  { id: '1', name: 'iPhone 10' },
  { id: '2', name: 'Samsung 23' },
];

export default function DealsListScreen() {
  return (
    <FlatList
      data={DATA}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text>{item.name}</Text>
        </View>
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
