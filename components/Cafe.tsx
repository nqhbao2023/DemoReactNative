
import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

const Cat = ({ name }: { name: string }) => {
  const [isHungry, setIsHungry] = useState(true);

  return (
    <View>
      <Text >
        I am {name}, and I am {isHungry ? 'hungry' : 'full'}!
      </Text>
      <Button
        title={isHungry ? 'Pour me some milk, please!' : 'Thank you!'}
        onPress={() => setIsHungry(false)}
        disabled={!isHungry}
      />
    </View>
  );
};

const Cafe = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Cat name="Mimi" />
        <Cat name="Tom" />
        <Cat name="Luna" />
        <Cat name="Leo" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cafe;

const styles = StyleSheet.create({
 
});
