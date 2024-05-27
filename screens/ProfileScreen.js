import Checkbox from 'expo-checkbox';
import { useState, useContext } from 'react';
import { View, StyleSheet, Text, ScrollView, KeyboardAvoidingView } from 'react-native';

import Button from '../components/Button';
import InfoField from '../components/InfoField';
import ProfileAvatar from '../components/ProfileAvatar';
import UserContext from '../contexts/UserContext';
import { saveUserAvatar, deleteUserAvatar } from '../persistence/userFileStorage';
import { saveUser, deleteUser } from '../persistence/userStorage';
import { contentContainer, checkBox, blockTitle } from '../styles/sharedStyles';
import { colorGuide } from '../styles/styleGuide';
import * as userUtils from '../utils/userUtils';

const ProfileScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const [profile, setProfile] = useState({ ...user });

  const isFirstNameValid = userUtils.isFirstNameValid(profile.firstName);
  const isEmailValid = userUtils.isEmailValid(profile.email);
  const isPhoneNumberValid = userUtils.isPhoneNumberValid(profile.phoneNumber);
  const isDataValid = isFirstNameValid && isEmailValid && isPhoneNumberValid;

  const saveChanges = async () => {
    let phoneNumberToSave;
    if (profile.phoneNumber) {
      phoneNumberToSave = userUtils.unmaskPhoneNumber(profile.phoneNumber);
    } else {
      phoneNumberToSave = profile.phoneNumber;
    }
    let updatedUser = { ...profile, phoneNumber: phoneNumberToSave };
    if (profile.hasAvatar) {
      const userAvatarPath = await saveUserAvatar(profile.avatarPath);
      updatedUser = { ...updatedUser, avatarPath: userAvatarPath };
    } else {
      deleteUserAvatar();
    }

    saveUser(updatedUser);
    setUser(updatedUser);
  };

  const handleAvatarChange = (newAvatarPath) => {
    setProfile({ ...profile, hasAvatar: !!newAvatarPath, avatarPath: newAvatarPath });
  };

  const processLogout = () => {
    deleteUser();
    setUser(null);
  };

  const ProfileCheckBox = ({ propertyName, text }) => {
    return (
      <View style={checkBox.section}>
        <Checkbox
          style={checkBox.box}
          value={profile.emailNotifications[propertyName]}
          color={profile.emailNotifications[propertyName] ? colorGuide.checkBox.color : undefined}
          onValueChange={(value) =>
            setProfile({
              ...profile,
              emailNotifications: { ...profile.emailNotifications, [propertyName]: value },
            })
          }
        />
        <Text style={checkBox.text}>{text}</Text>
      </View>
    );
  };

  const NotificationsBlock = () => {
    return (
      <View style={styles.notificationBlock}>
        <Text style={styles.notificationsTitle}>Email notifications</Text>
        <ProfileCheckBox propertyName="orderStatuses" text="Order statuses" />
        <ProfileCheckBox propertyName="passwordChanges" text="Password changes" />
        <ProfileCheckBox propertyName="specialOffers" text="Special offers" />
        <ProfileCheckBox propertyName="newsletter" text="Newsletter" />
      </View>
    );
  };

  return (
    <View style={styles.contentContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset="100">
          <View style={styles.avatar}>
            <ProfileAvatar profile={profile} onChange={handleAvatarChange} />
          </View>
          <InfoField
            value={profile.firstName}
            label="First name*"
            onChangeText={(value) => setProfile({ ...profile, firstName: value })}
          />
          <InfoField
            value={profile.lastName}
            label="Last name"
            onChangeText={(value) => setProfile({ ...profile, lastName: value })}
          />
          <InfoField
            value={profile.email}
            label="Email*"
            onChangeText={(value) => setProfile({ ...profile, email: value })}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <InfoField
            value={profile.phoneNumber}
            label="Phone number"
            onChangeText={(value) => setProfile({ ...profile, phoneNumber: value })}
            keyboardType="number-pad"
            mask="(999) 999-9999"
          />
        </KeyboardAvoidingView>
        <View style={styles.separator} />
        <NotificationsBlock />
        <View style={styles.buttonsContainer}>
          <ButtonWrapper title="Save changes" onPress={saveChanges} enabled={isDataValid} />
          <ButtonWrapper
            title="Reset changes"
            isDestructive="true"
            onPress={() => setProfile({ ...user })}
          />
          <ButtonWrapper title="Log out" isDestructive="true" onPress={processLogout} />
        </View>
      </ScrollView>
    </View>
  );
};

const ButtonWrapper = (props) => {
  return (
    <View style={styles.buttonWrapper}>
      <Button {...props} />
    </View>
  );
};
 
const styles = StyleSheet.create({
  contentContainer: {
    ...contentContainer,
    paddingTop: 0,
    flex: 1,
  },
  avatar: {
    marginTop: 15,
  },
  title: {
    fontSize: 30,
  },
  buttonWrapper: {
    marginTop: 10,
  },
  notificationBlock: {
    marginTop: 20,
  },
  notificationsTitle: {
    ...blockTitle,
    marginBottom: 10,
  },
  buttonsContainer: {
    marginTop: 10,
    marginBottom: 100,
  },
});

export default ProfileScreen;
