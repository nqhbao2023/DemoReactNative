import { Alert, StyleSheet, Text, View, Button } from 'react-native' // Thêm Button
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper';

const Project7 = () => {
    const [name, setName] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.label}>What is your name?</Text>
            <TextInput
                style={styles.input}
                placeholder='Hoang Bao'
                placeholderTextColor="rgba(0,0,0,0.5)"
                onChangeText={(text) => setName(text)}
                value={name}
            />
            <Button
                title='Say Hi'
                onPress={() => {
                    alert(`Hi, ${name}!`)
                    setName('')
                }}
            />
        </View>
    )
}

export default Project7;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    input: {
        marginTop: 10,
        backgroundColor: 'rgba(0,0,0,0.1)', 
        padding: 10,
        borderRadius: 5,
    },
});
