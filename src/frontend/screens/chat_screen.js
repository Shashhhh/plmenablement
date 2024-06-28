import React from 'react';
import { SafeAreaView, KeyboardAvoidingView, FlatList, Text, View, StyleSheet, Platform } from 'react-native';
import TextInputter from '../components/text_input';

const ChatScreen = ({ messages, handleSend }) => {
  const renderItem = ({ item }) => {
    return (
      <View style={[styles.messageContainer, item.isUserMessage ? styles.userMessage : styles.responseMessage]}>
        <Text style={styles.messageText}>{item.content}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <FlatList
          style={styles.list}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        <TextInputter onPress={handleSend} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2D373C',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  list: {
    flex: 1,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 20,
    maxWidth: '75%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#009999', 
  },
  responseMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#005F87',
  },
  messageText: {
    fontSize: 16,
    color: 'white',
  },
});

export default ChatScreen;
