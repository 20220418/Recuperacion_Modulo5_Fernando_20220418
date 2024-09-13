// SplashScreen.js

import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';

const SplashScreen = ({ navigation }) => {
  // Create an array of animated values for the spinner dots
  const animationValues = useRef([
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
  ]).current;

  useEffect(() => {
    // Define the bouncing animation for the spinner dots
    const createBounceAnimation = (animValue, delay) => {
      return Animated.sequence([
        Animated.timing(animValue, {
          toValue: 1.5, // Scale up
          duration: 500,
          delay: delay, // Delay before starting the animation
          useNativeDriver: true,
        }),
        Animated.timing(animValue, {
          toValue: 1, // Scale down
          duration: 500,
          useNativeDriver: true,
        }),
      ]);
    };

    const animations = animationValues.map((animValue, index) =>
      createBounceAnimation(animValue, index * 250) // Stagger the start of each animation
    );

    const bounceAnimation = Animated.loop(
      Animated.sequence(animations)
    );

    bounceAnimation.start();

    // Start the fade-in animation
    const fadeAnim = new Animated.Value(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 4000, // 2 seconds fade-in
      useNativeDriver: true,
    }).start();

    // Simular una carga o proceso
    setTimeout(() => {
      // Navegar a la siguiente pantalla después de cierto tiempo
      navigation.replace('Login'); // Reemplaza la pantalla actual en la navegación
    }, 3000); // Tiempo de carga simulado en milisegundos (3 segundos en este caso)

  }, [navigation, animationValues]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.imageContainer }}>
        <Image
          source={require('../img/group.png')}
          style={styles.image}
        />
      </Animated.View>
      <Animated.View style={{ ...styles.textContainer }}>
        <Text style={styles.text}>Cargando...</Text>
      </Animated.View>
      <View style={styles.spinnerContainer}>
        <View style={styles.spinner}>
          {animationValues.map((animValue, index) => (
            <Animated.View
              key={index}
              style={[
                styles.spinnerDot,
                {
                  transform: [
                    {
                      scale: animValue, // Use animated value for scale transformation
                    },
                  ],
                },
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
  },
  textContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 24,
    color: '#000',
    textAlign: 'center',
  },
  spinnerContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 100, // Adjust width to ensure dots have enough space to move
    height: 60,
  },
  spinnerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
    opacity: 0.6,
  },
});

export default SplashScreen;
