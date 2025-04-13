import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { MapPin, Phone, Mail, Award, Building2, MapPinned } from 'lucide-react-native';

export default function Profile() {
  const [profile, setProfile] = useState({
    name: '',
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
    regNumber: '',
    district: '',
    village: '',
    healthCenter: '',
    phone: '+1 (555) 123-4567',
    email: 'doctor@example.com',
    specialization: 'General Medicine',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, 'doctors', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      }
    };

    fetchProfile();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image
          source={{ uri: profile.photo }}
          style={styles.photo}
        />
        <Text style={styles.name}>Dr. {profile.name}</Text>
        <Text style={styles.specialization}>{profile.specialization}</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>1.2k</Text>
            <Text style={styles.statLabel}>Patients</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5+</Text>
            <Text style={styles.statLabel}>Years</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4.9</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Professional Information</Text>
        <View style={styles.card}>
          <InfoItem
            icon={Award}
            label="Registration Number"
            value={profile.regNumber}
          />
          <InfoItem
            icon={Building2}
            label="Health Center"
            value={profile.healthCenter}
          />
          <InfoItem
            icon={MapPin}
            label="District"
            value={profile.district}
          />
          <InfoItem
            icon={MapPinned}
            label="Village"
            value={profile.village}
          />
        </View>

        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.card}>
          <InfoItem
            icon={Phone}
            label="Phone"
            value={profile.phone}
          />
          <InfoItem
            icon={Mail}
            label="Email"
            value={profile.email}
          />
        </View>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function InfoItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <View style={styles.infoItem}>
      <View style={styles.iconContainer}>
        <Icon size={20} color="#3498db" />
      </View>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
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
    backgroundColor: '#3498db',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#ffffff',
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  specialization: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    width: '100%',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    marginTop: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#ebf8ff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
  },
  editButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});