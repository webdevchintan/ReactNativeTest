import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {AppButton, AppText} from '.';
import {palette} from '../theme/palette';

interface Props {
  option: Array<any>;
  question: string;
  answer: string;
  translation: object;
  index: number;
  id: string;
  englishVersion: string;
  updateAnswer: (answer: any, id: any, isCorrect) => void;
  checkAnswer: (id: any) => void;
}

const renderQuestion = (
  question: string,
  answer: string,
  translation: object,
) => {
  const questionString = question?.split(' ');
  return (
    <View style={styles.questionContainer}>
      {questionString?.map(questionPart =>
        questionPart === '${BLANK}' && answer ? (
          <AppButton
            title={answer}
            onPress={() => null}
            style={styles.answerButton}
            textStyle={styles.answerText}
          />
        ) : questionPart === '${BLANK}' ? (
          <View style={styles.blankValue} />
        ) : (
          <AppText
            style={styles.questionStyle}
            onPress={() => console.log(translation[questionPart])}>
            {questionPart}
          </AppText>
        ),
      )}
    </View>
  );
};

const renderOptions = (options: Array<any>, updateAnswer, id) => {
  return (
    <View style={styles.optionContainer}>
      <FlatList
        data={options}
        numColumns={2}
        renderItem={({item}) => (
          <AppButton
            title={item.title}
            onPress={() => updateAnswer(item.title, id, item.ans)}
            style={styles.optionButton}
            textStyle={styles.optionText}
          />
        )}
      />
    </View>
  );
};
const RenderList: FC<Props> = props => {
  console.log('props', props);
  return (
    <View style={styles.container}>
      <AppText text="Fill in the missing word" style={styles.headingStyle} />
      <View>
        <AppText style={styles.englishTranslation}>
          {props.englishVersion}
        </AppText>
      </View>
      <View>
        {renderQuestion(props.question, props.answer, props.translation)}
      </View>
      <View>{renderOptions(props.option, props.updateAnswer, props.id)}</View>
      <View style={styles.checkAnswerButton}>
        <AppButton
          title="Check Answer"
          onPress={() => (props.answer ? props.checkAnswer(props.id) : null)}
          style={styles.buttonStyle}
          textStyle={styles.buttonText}
        />
      </View>
    </View>
  );
};

export default RenderList;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    marginVertical: 5,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  highlightText: {
    backgroundColor: 'yellow',
    fontSize: 26,
    textAlign: 'center',
  },
  blankValue: {
    borderBottomWidth: 1,
    width: 50,
  },
  questionStyle: {
    marginHorizontal: 2,
    marginVertical: 15,
    color: palette.white,
  },
  optionContainer: {
    alignItems: 'center',
    marginVertical: 55,
  },
  answerButton: {
    height: 50,
    backgroundColor: palette.white,
  },
  answerText: {
    fontSize: 15,
    color: palette.weldonBlue,
    fontWeight: 'bold',
  },
  optionButton: {
    marginVertical: 10,
    height: 50,
    backgroundColor: palette.white,
  },
  optionText: {
    fontSize: 15,
    color: palette.weldonBlue,
    fontWeight: 'bold',
  },
  answerStyle: {marginHorizontal: 2},
  checkAnswerButton: {
    marginVertical: 25,
  },
  questionContainer: {
    flexDirection: 'row',
  },
  headingStyle: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '400',
    color: palette.white,
  },
  buttonStyle: {
    marginVertical: 40,
    height: 70,
    backgroundColor: palette.robinEggBlue,
  },
  buttonText: {
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  englishTranslation: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.white,
    textAlign: 'center',
    marginVertical: 15,
  },
});
