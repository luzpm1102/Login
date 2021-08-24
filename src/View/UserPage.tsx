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
import {UserInfo} from '../Components/UserInfo';
import {AuthContext} from '../context/AuthContext';
import {useGallery} from '../hooks/useGallery';

export const UserPage = () => {
  const [imagen, setImagen] = useState('');
  const {logOut, token, user} = useContext(AuthContext);
  const {changeUserImage, changeUserBackgroundImg, pathPP} = useGallery();
  useEffect(() => {
    setImagen('../Assets/user.png');
  }, []);

  // useEffect(() => {
  //   setTimeout(logOut, 50000);
  // }, [token]);
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
              backgroundColor: 'black',
              height: 40,
              width: 90,
              borderRadius: 15,
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
        {pathPP && (
          <View style={styles.userContainer}>
            <View style={styles.imageContainer}>
              <Image source={{uri: pathPP}} style={styles.image} />
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
            title="Establecer Imagen de fondo"
            onPress={changeUserBackgroundImg}
            style={{
              alignItems: 'center',
              top: 20,
            }}
          />
        </View>
        <View
          style={{
            top: 35,
            borderBottomWidth: 1,
            marginVertical: 8,
            borderBottomColor: 'black',
          }}
        />
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
});