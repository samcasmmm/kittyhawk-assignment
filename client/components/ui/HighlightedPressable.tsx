import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@/constants/colors';
interface Props {
  text: string;
  highlight: string;
  onPress?: () => void;
  colors?: {
    normal: string;
    highlight: string;
  };
  containerStyle?: ViewStyle;
}

export const HighlightedPressable: React.FC<Props> = ({
  text,
  highlight,
  onPress,
  colors: colorsProp = {
    normal: colors.text as string,
    highlight: colors.primary as string,
  },
  containerStyle,
}) => {
  const parts = text.split(new RegExp(`(${highlight})`, 'i'));

  return (
    <Pressable onPress={onPress} style={[styles.container, containerStyle]}>
      <Text style={styles.text}>
        {parts.map((part, index) => {
          const isMatch = part.toLowerCase() === highlight.toLowerCase();
          return (
            <Text
              key={index}
              style={{
                color: isMatch ? colorsProp.highlight : colorsProp.normal,
                textDecorationLine: isMatch ? 'underline' : 'none',
              }}
            >
              {part}
            </Text>
          );
        })}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: 14,
  },
});
