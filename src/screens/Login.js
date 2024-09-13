// Importamos las dependencias necesarias.
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Image, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { auth } from '../config/firebase'; // La clase para conectar con el archivo .env
import { signInWithEmailAndPassword } from "firebase/auth";

//Constante para manejar el alto de la pantalla
const windowHeight = Dimensions.get("window").height;

const LoginScreen = () => {
  //Constantes para el manejo de datos para iniciar sesión.
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");

  //Constante de navegación entre pantallas.
  const navigation = useNavigation();

  //Metodo para manejar el inicio de sesión de usuarios por medio de correo y contraseña.
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, correo, clave);
      const user = userCredential.user;
      console.log("User logged in: ", user);
      // Navegar a la pantalla principal o la que desees después del inicio de sesión
      navigation.navigate("Home"); // Ajusta "Home" a la pantalla a la que quieres navegar
    } catch (error) {
      console.error("Error logging in: ", error);
      setError("Error al iniciar sesión. Por favor, verifica tus credenciales.");
    }
  };

  // Limpiar campos al montar el componente
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCorreo('');
      setClave('');
    });

    return unsubscribe;
  }, [navigation]);

  // Diseño de la pantalla del Inicio de Sesión.
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Image source={require('../img/login.png')} style={styles.logo} />
        <Text style={styles.title}>Bienvenido! </Text>
        <View style={styles.inputContainer}>
            <View style={styles.rowContent}>
              <TextInput
              style={styles.correoInput}
              value={correo}
              onChangeText={setCorreo}
                placeholder="Correo electrónico:"
                placeholderTextColor={"#000"}
                keyboardType="email-address" />
            </View>
        </View>
        <View style={styles.inputContainer}>
            <View style={styles.rowContent}>
              <TextInput
                style={styles.correoInput}
                value={clave}
                onChangeText={setClave}
                placeholder="Clave:"
                placeholderTextColor={"#000"}
                secureTextEntry={true}
              />
            </View>
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Button
          style={styles.button}
          mode="contained"
          onPress={handleLogin}
        >
          Iniciar Sesión
        </Button>
        <TouchableOpacity
          onPress={() => navigation.navigate("Registro")}
        >
          <Text style={styles.loginText}>
            ¿No tienes cuenta? Registrate aquí
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>

  );
};

export default LoginScreen;

// Variables para el diseño de la pantalla de Inicio de Sesión.
const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: windowHeight * 0.15,
    paddingTop: 50,
  },
  logo: {
    marginTop: 1,
    alignItems: "center",
    marginBottom: 10,
    width: 400,
    height:200,
    marginLeft: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    marginRight:200
  },
  profileCard: {
    width: "100%",
    marginTop: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  infoRow: {
    padding: 12,
    margin: 2,
    borderRadius: 10,
    width: "100%",
    elevation: 2,
  },
  rowContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  correoInput: {
        borderRadius: 10,
        width: "100%",
        height: 43,
        paddingHorizontal: 10,
        color: "black",
        marginBottom: 10,
        marginTop: 10,
        borderColor: "black",
        borderWidth: 2,
        backgroundColor:'white'
  },
  pickerText: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: "black",
    flex: 1,
  },
  fila: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    width: "100%",
    paddingVertical: 10,
    marginTop: 10,
    backgroundColor: "#000",
  },
  loginText: {
    marginTop: 20,
    color: "black",
    textAlign: 'center'

  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});