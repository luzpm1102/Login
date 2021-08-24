import {useState} from 'react';
import {Alert} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as RNFS from 'react-native-fs';

interface Props {
  type: 'Profile' | 'Background';
}
export const useGallery = () => {
  const [tempUri, setTempUri] = useState<string>(' ');
  const [tempUriBg, setTempUriBg] = useState<string>(' ');

  var pathPP = RNFS.DocumentDirectoryPath + 'pp/.jpg';
  var pathBg = RNFS.DocumentDirectoryPath + '/bg.jpg';
  const takePhoto = ({type}: Props) => {
    launchCamera({mediaType: 'photo', quality: 0.5}, resp => {
      if (resp.didCancel) return;
      if (!resp.assets?.[0].uri) return;
      console.log(resp.assets![0].uri);
      var imgFileName = resp.assets![0].fileName;

      if (type === 'Profile') {
        setTempUri(resp.assets?.[0].uri);
        pathPP = 'file://' + RNFS.DocumentDirectoryPath + '/pp.jpg';

        RNFS.writeFile(pathPP, tempUri, 'base64')
          .then(success => {
            console.log('FILE WROTE!');
            console.log({pathPP});
            console.log({tempUri});
          })
          .catch(err => {
            console.log({pathPP});
            console.log(err.message);
          });
      } else {
        setTempUriBg(resp.assets?.[0].uri);
        RNFS.writeFile(pathBg, tempUriBg, 'utf8')
          .then(success => {
            console.log('FILE WRITTEN!');
            console.log(pathBg);
          })
          .catch(err => {
            console.log(err.message);
          });
      }

      console.log(imgFileName);
    });
  };
  const openLibrary = ({type}: Props) => {
    launchImageLibrary({mediaType: 'photo', quality: 0.5}, resp => {
      if (resp.didCancel) return;
      if (!resp.assets?.[0].uri) return;
      console.log(resp.assets![0].uri);
      var imgFileName = resp.assets![0].fileName;

      if (type === 'Profile') {
        setTempUri(resp.assets?.[0].uri);
        pathPP = RNFS.DocumentDirectoryPath + imgFileName;
        RNFS.copyFile(tempUri, pathPP)
          .then(success => {
            console.log('FILE cpied!');
          })
          .catch(err => {
            console.log(err.message);
          });
      } else {
        setTempUriBg(resp.assets?.[0].uri);
        RNFS.writeFile(pathBg, tempUriBg, 'utf8')
          .then(success => {
            console.log('FILE WRITTEN!');
          })
          .catch(err => {
            console.log(err.message);
          });
      }

      console.log(imgFileName);
    });
  };

  const changeUserImage = () => {
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
          onPress: () => takePhoto({type: 'Profile'}),
          style: 'default',
        },
        {
          text: 'Abrir galeria',
          onPress: () => openLibrary({type: 'Profile'}),
          style: 'default',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const changeUserBackgroundImg = () => {
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
          onPress: () => takePhoto({type: 'Background'}),
          style: 'default',
        },
        {
          text: 'Abrir galeria',
          onPress: () => openLibrary({type: 'Background'}),
          style: 'default',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return {
    changeUserImage,
    changeUserBackgroundImg,
    pathPP,
  };
};
