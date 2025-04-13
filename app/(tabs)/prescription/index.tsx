import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { QrCode, FilePlus, MessageCircle, Clock, FileText } from 'lucide-react-native';

export default function Prescription() {
  const recentPrescriptions = [
    { id: 1, name: 'John Doe', date: '2024-02-20', time: '10:30 AM' },
    { id: 2, name: 'Jane Smith', date: '2024-02-20', time: '11:45 AM' },
    { id: 3, name: 'Mike Johnson', date: '2024-02-20', time: '2:15 PM' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Prescription Hub</Text>
        <Text style={styles.subtitle}>Create and manage patient prescriptions</Text>
      </View>
      
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/prescription/scanner')}>
          <View style={[styles.iconContainer, { backgroundColor: '#ebf8ff' }]}>
            <QrCode size={32} color="#3498db" />
          </View>
          <Text style={styles.buttonTitle}>Scan QR Code</Text>
          <Text style={styles.buttonDescription}>Quickly load patient data</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/prescription/new')}>
          <View style={[styles.iconContainer, { backgroundColor: '#e6fffa' }]}>
            <FilePlus size={32} color="#38b2ac" />
          </View>
          <Text style={styles.buttonTitle}>Create New</Text>
          <Text style={styles.buttonDescription}>Start a fresh prescription</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.recentContainer}>
        <Text style={styles.sectionTitle}>Recent Prescriptions</Text>
        {recentPrescriptions.map((prescription) => (
          <TouchableOpacity key={prescription.id} style={styles.prescriptionCard}>
            <View style={styles.prescriptionIcon}>
              <FileText size={24} color="#3498db" />
            </View>
            <View style={styles.prescriptionInfo}>
              <Text style={styles.patientName}>{prescription.name}</Text>
              <View style={styles.timeContainer}>
                <Clock size={14} color="#64748b" />
                <Text style={styles.timeText}>{prescription.time}</Text>
              </View>
            </View>
            <Text style={styles.dateText}>{prescription.date}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.chatbotButton}>
        <MessageCircle size={24} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#3498db',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  actionContainer: {
    padding: 20,
    flexDirection: 'row',
    gap: 15,
    marginTop: -30,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#ffffff',
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
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  buttonDescription: {
    fontSize: 14,
    color: '#64748b',
  },
  recentContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  prescriptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  prescriptionIcon: {
    width: 45,
    height: 45,
    backgroundColor: '#ebf8ff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  prescriptionInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  timeText: {
    fontSize: 14,
    color: '#64748b',
  },
  dateText: {
    fontSize: 14,
    color: '#64748b',
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
});