import React from 'react';
import { SafeAreaView, KeyboardAvoidingView, FlatList, Text, View, StyleSheet, Platform } from 'react-native';
import TextInputter from './text_input';

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
    backgroundColor: '#fff',
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
    backgroundColor: '#DCF8C6', // Light green for user messages
  },
  responseMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E1E1E1', // Light gray for responses
  },
  messageText: {
    fontSize: 16,
  },
});

export default ChatScreen;
