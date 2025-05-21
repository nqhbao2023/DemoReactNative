import React from 'react';
import { View, Text, StyleSheet, Linking, ScrollView } from 'react-native';
import ContactThumbnail from '../components/ContactThumbnail';
import DetailListItem from '../components/DetailListItem';
import colors from '../utility/colors';

const Profile = ({ route }) => {
  const { contact } = route.params || {};

  if (!contact) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Không có dữ liệu liên hệ.</Text>
      </View>
    );
  }

  const { avatar = '', name = '', phone = '', cell = '', email = '' } = contact;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatarSection}>
        <ContactThumbnail avatar={avatar} name={name} phone={phone} />
      </View>
      <View style={styles.detailsSection}>
        {email && (
          <DetailListItem
            icon="mail"
            title="Email"
            subtitle={email}
            onPress={() => Linking.openURL(`mailto:${email}`)}
          />
        )}
        {phone && (
          <DetailListItem
            icon="phone"
            title="Công việc"
            subtitle={phone}
            onPress={() => Linking.openURL(`tel:${phone}`)}
          />
        )}
        {cell && (
          <DetailListItem
            icon="smartphone"
            title="Cá nhân"
            subtitle={cell}
            onPress={() => Linking.openURL(`tel:${cell}`)}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.greyLight,
    flex: 1,
  },
  avatarSection: {
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  detailsSection: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.grey,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default Profile;