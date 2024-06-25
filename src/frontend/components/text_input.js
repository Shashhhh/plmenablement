import React from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default function TextInputter({onPress}) {
  const [text, onChangeText] = React.useState('Start Typing Here!');
  const handlePress = () => {
    if (text.trim() !== '') {
      onPress(text);
      onChangeText('')
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeText}
          value={text}
          textAlign="left"
          clearTextOnFocus={true}
          paddingHorizontal= {10}
          onSubmitEditing={handlePress}
        />
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Icon name="arrow-up-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#009999',
    paddingVertical: 10,
    flex: 1,
    marginRight: 10,
    borderRadius: 20,
    opacity: 0.5,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 20,
    backgroundColor: '#009999',
  },
});


