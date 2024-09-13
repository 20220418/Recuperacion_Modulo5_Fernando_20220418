// Importación de bibliotecas y componentes necesarios
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import { database, auth } from "../config/firebase"; // Importa la configuración de la base de datos de Firebase
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"; // Importa funciones de Firestore para consultas en tiempo real
import CardProductos from "../components/cardProducto"; // Importa el componente de tarjeta de producto
import { updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

// Definición del componente principal Home
const Home = ({ navigation }) => {
    const user = auth.currentUser;

    const [email, setEmail] = useState(user ? user.email : '');
    const [password, setPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState(''); // Contraseña actual del usuario
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

  // Función para navegar a la pantalla 'Add'
  const IrCuenta = () => {
    navigation.navigate("Cuenta");
  };

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Función de Firebase para cerrar sesión
      // Navegar a la pantalla de inicio de sesión después de cerrar sesión
      navigation.navigate("Login"); // Ajusta el nombre de la pantalla de inicio de sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Puedes manejar el error aquí si lo deseas
    }
  };

  // Función que renderiza cada item de la lista
  const renderItem = ({ item }) => (
    <CardProductos
      id={item.id}
      nombre={item.nombre}
      precio={item.precio}
      vendido={item.vendido}
      imagen={item.imagen}
    />
  );

  // Renderiza la interfaz del componente Home
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mi correo:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity style={styles.Button2} onPress={IrCuenta}>
        <Text style={styles.ButtonText}>Editar Cuenta</Text>
      </TouchableOpacity>
      {/* Botón para regresar al login que simula cerrar sesión */}
      <TouchableOpacity style={styles.Button3} onPress={handleLogout}>
        <Text style={styles.ButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

// Exporta el componente Home como predeterminado
export default Home;

// Estilos para el componente Home
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEFEFE",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  Subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#ff9800",
  },
  Button1: {
    backgroundColor: "#0288d1",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    marginHorizontal: 50,
    paddingVertical: 20,
  },
  Button2: {
    backgroundColor: "#FFFF00",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    marginHorizontal: 50,
    paddingVertical: 20,
  },
  Button3: {
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    marginHorizontal: 50,
    paddingVertical: 20,
  },
  ButtonText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  list: {
    flexGrow: 1,
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
});
