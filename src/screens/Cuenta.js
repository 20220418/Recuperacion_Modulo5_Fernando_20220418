import React, { useState } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth } from "../config/firebase";

function Cuenta() {
  const user = auth.currentUser;

  const [email, setEmail] = useState(user ? user.email : '');
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState(''); // Contraseña actual del usuario
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const reauthenticate = async () => {
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    try {
      await reauthenticateWithCredential(user, credential);
      return true;
    } catch (err) {
      setError('La re-autenticación falló: ' + err.message);
      return false;
    }
  };

  const handlePasswordUpdate = async () => {
    const isReauthenticated = await reauthenticate();
    if (isReauthenticated) {
      try {
        await updatePassword(user, password);
        setSuccess('Contraseña actualizada correctamente');
        setError('');
      } catch (err) {
        setError('Error actualizando contraseña: ' + err.message);
        setSuccess('');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Cuenta</Text>
      <Text style={styles.label}>No podras cambiar el correo electrónico, por reglas de Firebase. Ingrese su contraseña actual para cambiarla.</Text>

      <View style={styles.container2}></View>
      {/* Sección para ingresar la contraseña actual */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contraseña Actual:</Text>
        <TextInput
          style={styles.input}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
        />
      </View>

      {/* Sección para actualizar Email */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Correo actual:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Sección para actualizar Contraseña */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nueva Contraseña:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handlePasswordUpdate}>
          <Text style={styles.buttonText}>Actualizar Contraseña</Text>
        </TouchableOpacity>
      </View>

      {/* Mensajes de éxito o error */}
      {success ? <Text style={styles.success}>{success}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  container2: {
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#008000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  success: {
    color: 'green',
    marginTop: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default Cuenta;
