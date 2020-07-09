import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { handleInitialData } from '../actions/decks';
import DeckPreview from './DeckPreview'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  }
});

const renderItem = (item, navigation) => {
  return (
    <DeckPreview item={item} navigation={navigation}/>
  )
}

const Home = ({navigation}) => {
  /**
   * The selector will be called whenvever the function component renders (unless)
   * its reference hasn't changed since a previous render of the component. useSelector()
   * will also subscribe to the Redux store, and run your selector whenever an action is
   * dispatched
   */
  const decks = useSelector(state => state.decks);
  const dispatch = useDispatch();

  // Load initial set of books into state
  useEffect(() => {
    dispatch(handleInitialData());
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.keys(decks).sort().map(key => decks[key])} 
        renderItem={({item}) => renderItem(item, navigation)}
        keyExtractor={(item, index) => index.toString()} 
        numColumns='2'
        />
    </View>
  );
}

export default Home;