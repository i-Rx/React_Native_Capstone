import { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';

import Button from '../components/Button';
import HeroBlock from '../components/HeroBlock';
import InfoField from '../components/InfoField';
import UserContext from '../contexts/UserContext';
import { saveUser } from '../persistence/userStorage';
import { blockTitle, contentContainer, screenContainer } from '../styles/sharedStyles';
import * as userUtils from '../utils/userUtils';

const OnboardingScreen = () => {
  const { setUser } = useContext(UserContext);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');

  const processUserData = () => {
    const currUser = { firstName, email, emailNotifications: {} };
    setUser(currUser);
    saveUser(currUser);
  };

  const isFirstNameValid = userUtils.isFirstNameValid(firstName);
  const isEmailValid = userUtils.isEmailValid(email);
  const isDataValid = isFirstNameValid && isEmailValid;

  return (
    <ScrollView style={screenContainer}>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset="100">
        <HeroBlock />
        <View style={contentContainer}>
          <Text style={blockTitle}>Let us get to know you</Text>
          <InfoField
            value={firstName}
            label="First name*"
            valid={isFirstNameValid}
            onChangeText={setFirstName}
          />
          <InfoField
            value={email}
            label="Email*"
            valid={isEmailValid}
            keyboardType="email-address"
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <View style={styles.buttonContainer}>
            <Button title="Menu" enabled={isDataValid} onPress={processUserData} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
  },
});

export default OnboardingScreen;
