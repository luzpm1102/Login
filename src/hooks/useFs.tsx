import React from 'react';
import * as RNFS from 'react-native-fs';

export const useFs = () => {
  let storage = RNFS.DocumentDirectoryPath;
  let storageBg = RNFS.ExternalDirectoryPath;

  const saveImage = (uri: string) =>
    new Promise<string>((resolve, reject) => {
      const fileName = `${new Date().getTime()}${new Date().getMilliseconds()}.jpg`;
      const filePathInAlbum = `${storage}/${fileName}`;

      RNFS.copyFile(uri, filePathInAlbum)
        .then(result => {
          resolve(filePathInAlbum);
        })
        .catch(error => {
          reject(error);
        });
    });
  const saveImageBg = (uri: string) =>
    new Promise<string>((resolve, reject) => {
      const fileName = `${new Date().getTime()}${new Date().getMilliseconds()}.jpg`;
      const filePathInAlbum = `${storageBg}/${fileName}`;

      RNFS.copyFile(uri, filePathInAlbum)
        .then(result => {
          resolve(filePathInAlbum);
        })
        .catch(error => {
          reject(error);
        });
    });
  const readLastImage = () =>
    RNFS.readDir(`${storage}`).then(result => {
      result.sort(
        (pic1, pic2) => pic1.mtime?.getTime()! - pic2.mtime?.getTime()!,
      );
      // console.log('From ReadLastImage', result);

      // console.log('GOT RESULT', result[result.length - 2]);
      return result[result.length - 2].path;
    });
  const readLastImageBG = () =>
    RNFS.readDir(`${storageBg}`).then(result => {
      // console.log('GOT RESULT', result[result.length - 1]);
      return result[result.length - 1].path;
    });
  const readAllFiles = () =>
    RNFS.readDir(`${storage}`).then(result => {
      for (let i = 0; i < result.length; i++) {
        console.log('GOT RESULT from Read ALl FIles', result[i]);
        // RNFS.unlink(result[i].path)
        //   .then(result => {
        //     console.log('eliminado');
        //   })
        //   .catch(console.log);
      }
      return result;
    });

  const deleteAll = () =>
    RNFS.readDir(RNFS.DocumentDirectoryPath).then(result => {
      console.log('GOT RESULT', result);
      var len = result.length - 2;

      for (let i = 0; i < len; i++) {
        RNFS.unlink(result[i].path)
          .then(() => {
            console.log('FILE DELETED');
          })
          .catch(err => {
            console.log(err.message);
          });
      }
    });

  return {
    saveImage,
    readLastImage,
    deleteAll,
    readAllFiles,
    readLastImageBG,
    saveImageBg,
  };
};
