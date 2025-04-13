import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { MessageCircle, Send, X, Users, Calender, Clock } from 'lucide-react-native';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function Home() {
  const [greeting, setGreeting] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [showChatbot, setShowChatbot] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ type: 'user' | 'bot'; text: string }[]>([]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    const fetchDoctorName = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, 'doctors', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDoctorName(docSnap.data().name);
        }
      }
    };

    fetchDoctorName();
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatHistory([...chatHistory, { type: 'user', text: message }]);
      // Here you would typically make an API call to your chatbot service
      // For now, we'll just echo back a response
      setTimeout(() => {
        setChatHistory(prev => [...prev, { 
          type: 'bot', 
          text: "I'm here to help you with medical queries and provide assistance with your practice." 
        }]);
      }, 1000);
      setMessage('');
    }
  };

  const stats = [
    { icon: Users, label: 'Patients', value: '32', change: '+5' },
    { icon: Calendar, label: 'Appointments', value: '12', change: '+2' },
    { icon: Clock, label: 'Hours', value: '48', change: '+8' },
  ];

  // Sample data for the last 7 days
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [15, 25, 20, 35, 28, 45, 38],
        color: (opacity = 1) => `rgba(52, 152, 219, ${opacity})`,
        strokeWidth: 2
      },
      {
        data: [10, 18, 15, 25, 20, 35, 28],
        color: (opacity = 1) => `rgba(46, 204, 113, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ['Consultations', 'Follow-ups']
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>{greeting}</Text>
            <Text style={styles.doctorName}>Dr. {doctorName}</Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <stat.icon size={24} color="#3498db" />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statChange}>{stat.change} this week</Text>
            </View>
          ))}
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Weekly Analytics</Text>
          <LineChart
            data={chartData}
            width={340}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
              },
              propsForLabels: {
                fontSize: 12,
              },
              propsForBackgroundLines: {
                strokeWidth: 1,
                strokeDasharray: '6',
              }
            }}
            bezier
            style={styles.chart}
            withInnerLines={true}
            withOuterLines={true}
            withVerticalLines={false}
            withHorizontalLines={true}
            withVerticalLabels={true}
            withHorizontalLabels={true}
            fromZero={true}
            segments={5}
            legend={chartData.legend}
          />
        </View>
      </ScrollView>

      {showChatbot ? (
        <View style={styles.chatbotContainer}>
          <View style={styles.chatbotHeader}>
            <Text style={styles.chatbotTitle}>AI Assistant</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowChatbot(false)}>
              <X size={24} color="#64748b" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.chatHistory}>
            {chatHistory.map((msg, index) => (
              <View
                key={index}
                style={[
                  styles.messageContainer,
                  msg.type === 'user' ? styles.userMessage : styles.botMessage,
                ]}>
                <Text
                  style={[
                    styles.messageText,
                    msg.type === 'user' ? styles.userMessageText : styles.botMessageText,
                  ]}>
                  {msg.text}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              placeholder="Type your message..."
              placeholderTextColor="#64748b"
              multiline
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendMessage}>
              <Send size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.chatbotButton}
          onPress={() => setShowChatbot(true)}>
          <MessageCircle size={24} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#3498db',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  greetingContainer: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  doctorName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: -30,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    width: '31%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 4,
  },
  statChange: {
    fontSize: 12,
    color: '#27ae60',
    marginTop: 4,
  },
  chartContainer: {
    backgroundColor: '#ffffff',
    margin: 20,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  chatbotButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#3498db',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  chatbotContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '80%',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  chatbotHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  chatbotTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  closeButton: {
    padding: 8,
  },
  chatHistory: {
    flex: 1,
    padding: 20,
  },
  messageContainer: {
    maxWidth: '80%',
    marginBottom: 12,
    padding: 12,
    borderRadius: 16,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#3498db',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f5f9',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
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
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    backgroundColor: '#3498db',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});