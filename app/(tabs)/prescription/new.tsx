import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>New Prescription</Text>

      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Patient Name</Text>
          <TextInput
            style={styles.input}
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
              value={formData.age}
              onChangeText={(text) => setFormData({ ...formData, age: text })}
            />
          </View>

          <View style={[styles.field, { flex: 1, marginLeft: 10 }]}>
            <Text style={styles.label}>Gender</Text>
            <TextInput
              style={styles.input}
              value={formData.gender}
              onChangeText={(text) => setFormData({ ...formData, gender: text })}
            />
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Symptoms</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            value={formData.symptoms}
            onChangeText={(text) => setFormData({ ...formData, symptoms: text })}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Tests/Observations</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            value={formData.tests}
            onChangeText={(text) => setFormData({ ...formData, tests: text })}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Summary</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            value={formData.summary}
            onChangeText={(text) => setFormData({ ...formData, summary: text })}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Medication</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            value={formData.medication}
            onChangeText={(text) => setFormData({ ...formData, medication: text })}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Create Prescription</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 60,
    marginBottom: 30,
  },
  form: {
    gap: 20,
  },
  field: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  label: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});