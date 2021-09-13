import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  Keyboard,
  ImageBackground,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {useForm} from '../hooks/useForm';
import {useFs} from '../hooks/useFs';
import ImageColors from 'react-native-image-colors';
interface Props extends StackScreenProps<any, any> {}
export const LoginScreen = ({navigation}: Props) => {
  const {signIn, errorMessage, removeError} = useContext(AuthContext);
  const {email, password, onChange} = useForm({
    email: '',
    password: '',
  });
  const [imagen, setImagen] = useState('');
  const {readLastImageBG} = useFs();

  useEffect(() => {
    readLastImageBG().then(setImagen).catch(console.log);
    // getColors(`file://${imagen}`);
  }, [imagen]);
  useEffect(() => {
    if (errorMessage.length === 0) return;

    Alert.alert('Login incorrecto', errorMessage, [
      {
        text: 'Ok',
        onPress: removeError,
      },
    ]);
  }, [errorMessage]);

  const getColors = async (uri: string) => {
    const result = await ImageColors.getColors(uri, {});
    console.log(result);
  };

  const onLogin = () => {
    if (!email.includes('@' && '.com')) {
      return Alert.alert('Ingrese un email valido');
    } else {
      console.log({email, password});
      Keyboard.dismiss();
      signIn({correo: email, password});
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <View style={styles.formContainer}>
        <ImageBackground
          source={{uri: `file://${imagen}`}}
          resizeMode="cover"
          style={styles.image}>
          {/* <Text style={styles.title}>Login</Text> */}
          <View style={{padding: 30}}>
            <Text style={styles.text}>Correo</Text>
            <TextInput
              placeholder="  Ingrese su correo:"
              placeholderTextColor="rgba(255,255,255,0.4)"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              onChangeText={value => onChange(value, 'email')}
              value={email}
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
              onSubmitEditing={onLogin}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={onLogin}
                disabled={!email || !password}
                style={
                  !email || !password ? styles.buttonDisabled : styles.button
                }>
                <Text style={styles.buttonText}>Ingresar </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.replace('RegisterScreen')}>
                <Text style={styles.buttonText}>¿Nueva cuenta? </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    backgroundColor: '#242424',
    justifyContent: 'center',
    // paddingHorizontal: 30,
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
    // padding: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  button: {
    borderWidth: 2,
    borderColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
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
  notEmail: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: 'red',
    color: 'white',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
