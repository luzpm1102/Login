import React from 'react';
import {View, Text, Image, ImageProps, StyleSheet} from 'react-native';

interface Props {
  imgSrc: ImageProps;
  width?: number;
  height?: number;
  userName: string;
}
export const UserInfo = ({
  imgSrc,
  userName,
  height = 200,
  width = 200,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={imgSrc} style={{...styles.image, width, height}} />
      </View>
      <View>
        <Text style={styles.text}>Nombre: {userName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  imageContainer: {
    height: 200,
    width: 400,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  image: {},
  text: {
    textAlign: 'center',
    fontSize: 25,
  },
});
