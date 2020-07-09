import * as React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  tile: {
    backgroundColor: '#1c9ce6',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 5,
    borderRadius: 5,
    height: Dimensions.get('window').width / 2, // approximate a square
  },
  name: {
    textAlign: 'center',
    padding: 5,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  count: {
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
  }
});

const DeckPreview = (props) => {
  const {item, navigation} = props;
  const name = item.name;
  const count = item.questions.length;
  return (
    <View style={styles.tile}>
      <TouchableOpacity
        style={styles.tile}
        onPress={() => 
            navigation.navigate('Deck', {name})
          }
      >
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.count}>{count} {count === 1 ? 'card' : 'cards'}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default DeckPreview;