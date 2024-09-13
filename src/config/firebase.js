// Importamos las dependencias necesarias.
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, TEST } from '@env';
import { getReactNativePersistence, initializeAuth } from "firebase/auth";


// Configuracion para la conexion de la base de datos de Firebase.
const firebaseConfig = {
  apiKey: API_KEY ,
  authDomain: AUTH_DOMAIN ,
  projectId: PROJECT_ID ,
  storageBucket: STORAGE_BUCKET ,
  messagingSenderId: MESSAGING_SENDER_ID ,
  appId: APP_ID    
};

// Mensajes de consola si funciona la conexion de Firebase.
console.log(TEST)
console.log("Valor de configuracion", firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
if (app) {
  console.log('Firebase initialized successfully'); // Funciona
} else {
  console.log('Firebase initialization failed'); // No funciona
}

const database = getFirestore(app);
if (database) {
  console.log('Firestore initialized correctly'); // Funciona
} else {
  console.log('Firestore initialization failed'); // No funciona
}

const storage = getStorage(app);

if (storage) {
  console.log('storage initialized correctly'); // Funciona
} else {
  console.log('storage initialization failed'); // No funciona
}

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { database, storage, auth };