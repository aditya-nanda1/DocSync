import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, Plus } from 'lucide-react-native';

export default function NewPrescription() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    symptoms: '',
    tests: '',
    summary: '',
    medication: '',
  });

  const handleSubmit = () => {
    // Handle prescription creation
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color="#3498db" />
          </TouchableOpacity>
          <Text style={styles.title}>New Prescription</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.field}>
            <Text style={styles.label}>Patient Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter patient name"
              placeholderTextColor="#95a5a6"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.field, { flex: 1 }]}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Age"
                placeholderTextColor="#95a5a6"
                value={formData.age}
                onChangeText={(text) => setFormData({ ...formData, age: text })}
              />
            </View>

            <View style={[styles.field, { flex: 1, marginLeft: 12 }]}>
              <Text style={styles.label}>Gender</Text>
              <TextInput
                style={styles.input}
                placeholder="Gender"
                placeholderTextColor="#95a5a6"
                value={formData.gender}
                onChangeText={(text) => setFormData({ ...formData, gender: text })}
              />
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.field}>
            <Text style={styles.label}>Symptoms</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              placeholder="Describe symptoms"
              placeholderTextColor="#95a5a6"
              value={formData.symptoms}
              onChangeText={(text) => setFormData({ ...formData, symptoms: text })}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Tests/Observations</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              placeholder="Test results and observations"
              placeholderTextColor="#95a5a6"
              value={formData.tests}
              onChangeText={(text) => setFormData({ ...formData, tests: text })}
            />
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.field}>
            <Text style={styles.label}>Summary</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              placeholder="Diagnosis summary"
              placeholderTextColor="#95a5a6"
              value={formData.summary}
              onChangeText={(text) => setFormData({ ...formData, summary: text })}
            />
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.field}>
            <Text style={styles.label}>Medication</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              placeholder="Prescribed medication and dosage"
              placeholderTextColor="#95a5a6"
              value={formData.medication}
              onChangeText={(text) => setFormData({ ...formData, medication: text })}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Plus size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Create Prescription</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  field: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8fafc',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    fontSize: 16,
    color: '#2c3e50',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    shadowColor: '#3498db',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
});