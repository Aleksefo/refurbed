import { View, Text, Image, StyleSheet } from 'react-native';

export default function MaintenanceWarning() {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/refurbed-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.text}>This page is under maintenance</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});
