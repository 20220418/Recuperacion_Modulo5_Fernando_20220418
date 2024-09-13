import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import {
  TextInput,
  Button,
  PaperProvider,
  Card,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { auth } from '../config/firebase'; // Ajusta el path según tu estructura de proyecto
import { createUserWithEmailAndPassword } from "firebase/auth";

// Constante para manejar el alto de la pantalla
const windowHeight = Dimensions.get("window").height;

const SignUp = () => {
  // Constantes para el manejo de datos
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");

  // Constante de navegación entre pantallas
  const navigation = useNavigation();

  // Método para manejar el registro de usuarios
  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, correo, clave);
      const user = userCredential.user;
      console.log("User registered: ", user);
      // Puedes redirigir al usuario a otra pantalla después del registro
      navigation.navigate("Login"); // Ajusta "Home" a la pantalla a la que quieres navegar
    } catch (error) {
      if (error.code === 'auth/network-request-failed') {
        alert("Error de red. Por favor, verifica tu conexión a Internet.");
      } else {
        alert(`Error: ${error.message}`);
      }
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
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Registrarse </Text>
        <Image source={require('../img/profile.png')} style={styles.logo} />
        <View style={styles.inputContainer}>
            <View style={styles.rowContent}>
              <TextInput
                style={styles.Inputs}
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
                style={styles.Inputs}
                value={clave}
                onChangeText={setClave}
                placeholder="Clave:"
                placeholderTextColor={"#000"}
                keyboardType="email-address" />
          </View>
        </View>
        <Button
          style={styles.button}
          mode="contained"
          onPress={handleRegister}
        >
          Registrarse
        </Button>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")} // Ajusta el nombre de la pantalla de inicio de sesión
        >
          <Text style={styles.loginText}>
            ¿Ya tienes cuenta? Inicia sesión aquí
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUp;

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
    marginBottom: 1,
    width: 200,
    height:200,
    marginLeft: 10,
    alignItems: 'center',
  },
  profileCard: {
    width: "100%",
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  rowContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  Inputs: {
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
    backgroundColor: "#737373",
  },
  loginText: {
    marginTop: 20,
    color: "black",
    textAlign: 'center'
  },
  avatarContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});