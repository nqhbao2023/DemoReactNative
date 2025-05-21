import React from 'react'; 
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import PropTypes from 'prop-types';

const ContactThumbnail = ({name, phone, avatar, textColor, onPress,}) => {
    const colorStyle = {
        color: textColor,
    };
    const ImageComponent = onPress ? TouchableOpacity : View;

    return(
        <View style = {styles.container}>
            <ImageComponent onPress = {onPress} >
                <Image
                source={{
                    uri: avatar,
                }}
                style = {styles.avatar}
                />
            </ImageComponent>
                    { name !== '' && <Text style={[styles.name, colorStyle]}> {name} </Text> }
                    { phone !== '' && (
                      <View style={styles.phoneSection}>
                        <Icon name="phone" size={16} style={{ color: textColor }} />
                        <Text style={[styles.phone, colorStyle]}> {phone} </Text>
                      </View>
                    )}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    name: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 10,
    },
    phoneSection: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
    },
    phone: {
      fontSize: 16,
      marginLeft: 5,
    },
  });
  

export default ContactThumbnail;