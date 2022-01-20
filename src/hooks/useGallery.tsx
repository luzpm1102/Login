import React from 'react';
import {Alert} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useFs} from './useFs';

interface Props {
  type: 'Profile' | 'Background';
}
export const useGallery = (updateImage: Function) => {
  const {saveImage, deleteAll, saveImageBg} = useFs();
  const takePhoto = ({type}: Props) => {
    launchCamera({mediaType: 'photo', quality: 0.5}, resp => {
      if (resp.didCancel) return;
      if (!resp.assets?.[0].uri) return;

      if (type === 'Profile') {
        deleteAll();
        saveImage(resp.assets?.[0].uri)
          .then(path => {
            updateImage(path);
            Alert.alert(
              'Cambio Exitoso',
              'Su imagen de perfil ha sido guardada correctamente',
            );
          })
          .catch(console.log);
        console.log('saved');
      } else {
        saveImageBg(resp.assets?.[0].uri)
          .then(() => {
            Alert.alert(
              'Cambio Exitoso',
              'Su imagen de fondo ha sido guardada correctamente',
            );
          })
          .catch(console.log);
        deleteAll();
      }
    });
  };
  const openLibrary = ({type}: Props) => {
    launchImageLibrary({mediaType: 'photo', quality: 0.5}, resp => {
      if (resp.didCancel) return;
      if (!resp.assets?.[0].uri) return;

      if (type === 'Profile') {
        deleteAll();
        saveImage(resp.assets?.[0].uri)
          .then(path => {
            updateImage(path);
            Alert.alert(
              'Cambio Exitoso',
              'Su imagen de perfil ha sido guardada correctamente',
            );
          })
          .catch(console.log);

        console.log('saved');
      } else {
        saveImageBg(resp.assets?.[0].uri)
          .then(() => {
            Alert.alert(
              'Cambio Exitoso',
              'Su imagen de fondo ha sido guardada correctamente',
            );
          })
          .catch(console.log);
        deleteAll();
      }
    });
  };

  const OpenCameraAlert = ({type}: Props) => {
    Alert.alert(
      'Cambiar Imagen',
      '¿Desea abrir la camara o la galeria?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Tomar foto',
          onPress: () => takePhoto({type: type}),
          style: 'default',
        },
        {
          text: 'Abrir galeria',
          onPress: () => openLibrary({type: type}),
          style: 'default',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const changeUserImage = () => {
    OpenCameraAlert({type: 'Profile'});
  };

  const changeUserBackgroundImg = () => {
    OpenCameraAlert({type: 'Background'});
  };

  return {
    changeUserImage,
    changeUserBackgroundImg,
  };
};
