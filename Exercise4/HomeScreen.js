import { Button, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.txtStyle}>Home Screen</Text>
      <Button 
        style={styles.btnStyle}
        mode="contained"
        onPress={() => navigation.navigate('Ex4_DetailScreen')}
      >
        Go to detail
      </Button>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtStyle: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 16
  },
  btnStyle: {
    backgroundColor: '#bb60f0',
  }
});
