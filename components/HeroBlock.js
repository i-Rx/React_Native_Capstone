import { View, Text, Image, StyleSheet } from 'react-native';

import { title, subtitle, leadText, contentContainer } from '../styles/sharedStyles';
import { AppColors } from '../styles/styleGuide';

const introText =
  'We are a family owned Mediterranean restaurant, ' +
  'focused on traditional recipes served with a modern twist.';

const HeroBlock = () => {
  const imageSource = require('../assets/images/hero.jpg');

  return (
    <View style={styles.container}>
      <Text style={[title, styles.title]}>Little Lemon</Text>
      <Text style={[subtitle, styles.subtitle]}>Chicago</Text>
      <View style={styles.intro.container}>
        <Text style={[styles.intro.text, leadText]}>{introText}</Text>
        <Image style={styles.intro.image} source={imageSource} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...contentContainer,
    backgroundColor: AppColors.darkGreen,
    paddingBottom: 15,
  },
  title: {
    lineHeight: 50,
  },
  subtitle: {
    lineHeight: 30,
    position: 'relative',
    top: -10,
  },
  intro: {
    container: {
      flexDirection: 'row',
    },
    text: {
      flex: 2,
      paddingRight: 10,
    },
    image: {
      flex: 1,
      aspectRatio: 1,
      borderRadius: 20,
    },
  },
});

export default HeroBlock;
