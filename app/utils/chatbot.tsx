import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Keyboard, StatusBar, Platform } from 'react-native';
import { Send, ChevronLeft, Bot, User } from 'lucide-react-native';
import { Link } from 'expo-router';
import Constants from 'expo-constants';

export default function ChatbotScreen() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ type: 'user' | 'bot'; text: string }[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const statusBarHeight = Constants.statusBarHeight;

  const handleSendMessage = () => {
    if (message.trim()) {
      const newUserMessage = { type: 'user' as const, text: message };
      setChatHistory([...chatHistory, newUserMessage]);
      setMessage('');
      Keyboard.dismiss();

      // Simulate bot response
      setTimeout(() => {
        const botResponse = { 
          type: 'bot' as const, 
          text: "I'm here to help you with medical queries and provide assistance with your practice." 
        };
        setChatHistory(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  useEffect(() => {
    if (chatHistory.length > 0) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  }, [chatHistory]);

  return (
    <View style={[styles.container, { paddingTop: statusBarHeight }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View style={styles.header}>
        <Link href="/(tabs)/" asChild>
          <TouchableOpacity style={styles.backButton}>
            <ChevronLeft size={28} color="#2c3e50" />
          </TouchableOpacity>
        </Link>
        <View style={styles.headerContent}>
          <View style={styles.botIconContainer}>
            <Bot size={20} color="#ffffff" />
          </View>
          <Text style={styles.title}>Medical AI Assistant</Text>
        </View>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        style={styles.chatHistory}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {chatHistory.length === 0 ? (
          <View style={styles.welcomeContainer}>
            <View style={styles.welcomeIconContainer}>
              <Bot size={40} color="#3498db" />
            </View>
            <Text style={styles.welcomeTitle}>How can I help you today?</Text>
            <Text style={styles.welcomeText}>
              I'm your medical AI assistant. Ask me about symptoms, medications, 
              or anything related to patient care.
            </Text>
          </View>
        ) : (
          chatHistory.map((msg, index) => (
            <View
              key={index}
              style={[
                styles.messageRow,
                msg.type === 'user' && styles.userMessageRow,
              ]}
            >
              <View
                style={[
                  styles.messageContainer,
                  msg.type === 'user' ? styles.userMessage : styles.botMessage,
                ]}
              >
                <View style={styles.messageIcon}>
                  {msg.type === 'user' ? (
                    <User size={14} color="#fff" />
                  ) : (
                    <Bot size={14} color="#3498db" />
                  )}
                </View>
                <Text
                  style={[
                    styles.messageText,
                    msg.type === 'user' ? styles.userMessageText : styles.botMessageText,
                  ]}
                >
                  {msg.text}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your medical query..."
          placeholderTextColor="#95a5a6"
          multiline
          onSubmitEditing={handleSendMessage}
        />
        <TouchableOpacity
          style={[styles.sendButton, { backgroundColor: message.trim() ? '#3498db' : '#bdc3c7' }]}
          onPress={handleSendMessage}
          disabled={!message.trim()}
        >
          <Send size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  botIconContainer: {
    backgroundColor: '#3498db',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
  },
  chatHistory: {
    flex: 1,
  },
  chatContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  welcomeContainer: {
    alignItems: 'center',
    padding: 32,
    marginTop: 40,
  },
  welcomeIconContainer: {
    backgroundColor: '#ebf8ff',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: '80%',
  },
  messageRow: {
    width: '100%',
    marginBottom: 12,
  },
  userMessageRow: {
    alignItems: 'flex-end',
  },
  messageContainer: {
    maxWidth: '85%',
    padding: 14,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  messageIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  userMessage: {
    backgroundColor: '#3498db',
    borderBottomRightRadius: 4,
  },
  botMessage: {
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    flex: 1,
  },
  userMessageText: {
    color: '#ffffff',
  },
  botMessageText: {
    color: '#2c3e50',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    alignItems: 'flex-end',
    paddingBottom: Platform.OS === 'ios' ? 30 : 16,
  },
  input: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 12,
    fontSize: 16,
    color: '#2c3e50',
    maxHeight: 120,
    minHeight: 48,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
});