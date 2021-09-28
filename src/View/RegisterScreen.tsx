import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useEffect} from 'react';
import {useForm} from '../hooks/useForm';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}
export const RegisterScreen = ({navigation}: Props) => {
  const {signUp, errorMessage, removeError} = useContext(AuthContext);
  const {name, email, password, onChange} = useForm({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (errorMessage.length === 0) return;

    Alert.alert('SignUp Incorrecto', errorMessage, [
      {
        text: 'OK',
        onPress: removeError,
      },
    ]);
  }, [errorMessage]);

  const onRegister = () => {
    if (!email.includes('@' && '.com')) {
      return Alert.alert('Ingrese un email valido');
    } else {
      signUp({nombre: name, correo: email, password});
      Alert.alert('Registro correcto', `${email} registrado correctamente`);
      Keyboard.dismiss();
    }
  };
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Registro</Text>
        <Text style={styles.text}>Nombre</Text>
        <TextInput
          placeholder="  Ingrese su nombre:"
          placeholderTextColor="rgba(255,255,255,0.4)"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          value={name}
          onChangeText={value => onChange(value, 'name')}
        />
        <Text style={styles.text}>Correo</Text>
        <TextInput
          placeholder="  Ingrese su correo:"
          placeholderTextColor="rgba(255,255,255,0.4)"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          value={email}
          onChangeText={value => onChange(value, 'email')}
        />
        <Text style={styles.text}>Contraseña</Text>
        <TextInput
          placeholder=" *********"
          placeholderTextColor="rgba(255,255,255,0.4)"
          secureTextEntry
          style={styles.input}
          selectionColor="white"
          onChangeText={value => onChange(value, 'password')}
          value={password}
          onSubmitEditing={onRegister}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={onRegister}
            disabled={!email || !password || !name}
            style={
              !email || !password || !name
                ? styles.buttonDisabled
                : styles.button
            }>
            <Text style={styles.buttonText}>Registrarse </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            ...styles.buttonContainer,
            borderWidth: 0,
          }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.replace('LoginScreen')}>
            <Text style={styles.buttonText}>Iniciar sesion </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    backgroundColor: '#242424',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    bottom: 20,
  },
  text: {
    color: 'white',
    fontSize: 20,
    left: 12,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    borderRadius: 15,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  button: {
    borderWidth: 1,
    borderColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: 'grey',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  buttonDisabled: {
    borderWidth: 2,
    borderColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 15,
  },
});
