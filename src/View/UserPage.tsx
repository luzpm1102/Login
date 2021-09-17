import React, {useEffect, useState} from 'react';
import {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';

import {TOButton} from '../Components/TOButton';
import {AuthContext} from '../context/AuthContext';
import {useGallery} from '../hooks/useGallery';
import {useFs} from '../hooks/useFs';
import { Permissions } from '../hooks/Permissions';

export const UserPage = () => {
  const [imagen, setImagen] = useState('');
  const {logOut, user} = useContext(AuthContext);
  const {changeUserImage, changeUserBackgroundImg} = useGallery(setImagen);
  const {readLastImage} = useFs();
  const firstFile = '/data/user/0/com.login/files/ReactNativeDevBundle.js';
  const {requestPermission}=  Permissions()
  useEffect(() => {
    readLastImage().then(setImagen).catch(console.log);
    // console.log(imagen);
    requestPermission()
  }, []);
 

  return (
    <SafeAreaView>
      <View
      //   style={styles.container}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            Pagina de usuario
          </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={logOut}
            style={{
              backgroundColor: '#ff0a2b',
              height: 40,
              width: 90,
              borderRadius: 10,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                color: 'white',
              }}>
              Salir
            </Text>
          </TouchableOpacity>
        </View>

        {imagen !== '' || imagen !== `file://${firstFile}` ? (
          <View style={styles.userContainer}>
            <View style={styles.imageContainer}>
              <Image source={{uri: `file://${imagen}`}} style={styles.image} />
            </View>
            <View>
              <Text style={styles.text}>Nombre: {user?.nombre}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.userContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../Assets/user.png')}
                style={styles.image}
              />
            </View>
            <View>
              <Text style={styles.text}>Nombre: {user?.nombre}</Text>
            </View>
          </View>
        )}

        <View>
          <TOButton
            title="Cambiar Foto de Perfil"
            onPress={changeUserImage}
            style={{alignItems: 'center', top: 10}}
          />
          <TOButton
            title="Cambiar Imagen de fondo"
            onPress={changeUserBackgroundImg}
            style={{
              alignItems: 'center',
              top: 20,
            }}
          />
        </View>
       
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userContainer: {
    alignItems: 'center',
  },
  imageContainer: {
    borderRadius: 100,
    height: 250,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    flexDirection: 'column',
  },
  image: {
    marginTop: 20,
    width: '100%',
    flex: 1,
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
  },
  userText: {
    alignItems: 'center',
    fontSize: 18,
  },
});
