import React, {FC, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {RenderList} from '../components';
import firestore from '@react-native-firebase/firestore';
import {FlatList} from 'react-native-gesture-handler';
import {palette} from '../theme/palette';

const Home: FC = () => {
  const [exercises, setExercises] = useState<any>([]);

  useEffect(() => {
    const subscribeExercises = firestore()
      .collection('exercises')
      .where('isChecked', '==', false)
      .limit(1)
      .onSnapshot(querySnapShot => {
        const documents = [];
        querySnapShot.forEach(documentSnapshot => {
          documents.push({
            key: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });
        setExercises(documents);
      });
    // Unsubscribe from events when no longer in use
    return () => subscribeExercises();
  }, []);

  const updateAnswer = async (answer, key, isCorrect) => {
    if (answer) {
      try {
        await firestore()
          .collection('exercises')
          .doc(key)
          .update({
            answer: answer,
            isCompleted: isCorrect || false,
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      Alert.alert('Missing Fields');
    }
  };

  const checkAnswer = async key => {
    if (key) {
      try {
        await firestore().collection('exercises').doc(key).update({
          isChecked: true,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      Alert.alert('Missing Fields');
    }
  };
  return (
    <View style={styles.container}>
      <View />
      <View style={styles.questionContainer}>
        {exercises?.length > 0 ? (
          <FlatList
            data={exercises}
            renderItem={({item, index}) => (
              <RenderList
                option={item.option}
                question={item.question}
                translation={item.trans}
                englishVersion={item.english}
                index={index}
                id={item.key}
                answer={item.answer}
                updateAnswer={updateAnswer}
                checkAnswer={checkAnswer}
              />
            )}
          />
        ) : (
          <View style={styles.noData}>
            <Text>Nothing To Display</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    borderWidth: 2,
    justifyContent: 'space-between',

    backgroundColor: palette.blue,
  },
  questionContainer: {
    marginTop: '45%',
    alignItems: 'center',
    paddingVertical: 25,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: palette.weldonBlue,
  },
  noData: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
