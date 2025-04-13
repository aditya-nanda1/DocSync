import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { MessageCircle, Users, Calendar, Clock } from 'lucide-react-native';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Link } from 'expo-router';

const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth - 48;

export default function Home() {
  const [greeting, setGreeting] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    const fetchDoctorName = async () => {
      try {
        if (auth.currentUser) {
          const docRef = doc(db, 'doctors', auth.currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setDoctorName(docSnap.data().name);
          }
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorName();
  }, []);

  const stats = [
    { icon: Users, label: 'Patients', value: '32', change: '+5', color: '#3498db' },
    { icon: Calendar, label: 'Appointments', value: '12', change: '+2', color: '#e74c3c' },
    { icon: Clock, label: 'Hours', value: '48', change: '+8', color: '#2ecc71' },
  ];

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [15, 25, 20, 35, 28, 45, 38],
        color: (opacity = 1) => `rgba(52, 152, 219, ${opacity})`,
        strokeWidth: 3
      },
      {
        data: [10, 18, 15, 25, 20, 35, 28],
        color: (opacity = 1) => `rgba(46, 204, 113, ${opacity})`,
        strokeWidth: 3
      }
    ],
    legend: ['Consultations', 'Follow-ups']
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>{greeting}</Text>
            <Text style={styles.doctorName}>Dr. {doctorName}</Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={[styles.statCard, { borderTopColor: stat.color }]}>
              <stat.icon size={24} color={stat.color} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <View style={[styles.changeContainer, { backgroundColor: stat.change.startsWith('+') ? 'rgba(39, 174, 96, 0.1)' : 'rgba(231, 76, 60, 0.1)' }]}>
                <Text style={[styles.statChange, { color: stat.change.startsWith('+') ? '#27ae60' : '#e74c3c' }]}>
                  {stat.change} this week
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Weekly Analytics</Text>
          <View style={styles.chartWrapper}>
            <LineChart
              data={chartData}
              width={chartWidth}
              height={240}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#f8fafc',
                backgroundGradientTo: '#f8fafc',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '5',
                  strokeWidth: '2',
                  stroke: '#fff',
                },
                propsForLabels: {
                  fontSize: 11,
                  fontFamily: 'Inter-Medium'
                },
                propsForBackgroundLines: {
                  strokeWidth: 1,
                  strokeDasharray: '6',
                  stroke: 'rgba(0,0,0,0.05)'
                }
              }}
              bezier
              style={styles.chart}
              withInnerLines={true}
              withOuterLines={false}
              withVerticalLines={false}
              withHorizontalLines={true}
              withVerticalLabels={true}
              withHorizontalLabels={true}
              fromZero={false}
              segments={4}
            />
          </View>
          <View style={styles.legendContainer}>
            {chartData.legend.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: index === 0 ? '#3498db' : '#2ecc71' }]} />
                <Text style={styles.legendText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <Link href="/utils/chatbot" asChild>
        <TouchableOpacity style={styles.chatbotButton}>
          <MessageCircle size={24} color="#fff" />
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc'
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20
  },
  header: {
    backgroundColor: '#3498db',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5
  },
  greetingContainer: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
    fontFamily: 'Inter-Regular'
  },
  doctorName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Inter-Bold'
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: -30,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    width: '31%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
    borderTopWidth: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 8,
    fontFamily: 'Inter-Bold'
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 4,
    fontFamily: 'Inter-Regular'
  },
  changeContainer: {
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statChange: {
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'Inter-SemiBold'
  },
  chartContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  chartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Inter-Bold'
  },
  chart: {
    borderRadius: 16,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    gap: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#7f8c8d',
    fontFamily: 'Inter-Medium'
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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});