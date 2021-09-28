import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';
interface Props {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const TOButton = ({title, onPress, style}: Props) => {
  return (
    <View style={{...(style as any), ...styles.buttonContainer}}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.button}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
  },
  button: {
    left: 10,
    height: 50,
    width: 270,
    backgroundColor: '#0071e3',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderRadius: 25,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});
