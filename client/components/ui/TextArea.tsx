import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import { colors } from '@/constants/colors';

interface TextAreaProps extends TextInputProps {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  error?: string;
  isInvalid?: boolean;
  rows?: number;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  containerStyle,
  error,
  isInvalid,
  rows = 4,
  ...textInputProps
}) => {
  return (
    <View style={containerStyle}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View
        style={[
          styles.wrapper,
          isInvalid && { borderColor: colors.inputErrorBorder },
        ]}
      >
        <TextInput
          style={[styles.input, { height: rows * 22 }]}
          placeholderTextColor={
            isInvalid ? colors.inputErrorBorder : colors.inputPlaceholder
          }
          multiline
          textAlignVertical='top'
          {...textInputProps}
        />
      </View>

      {isInvalid && error ? <Text style={styles.errorMsg}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    color: colors.text,
  },
  wrapper: {
    borderWidth: 1,
    borderColor: colors.inputBorder,
    backgroundColor: colors.inputBackground,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  input: {
    fontSize: 15,
    color: colors.inputText,
  },
  errorMsg: {
    color: colors.inputErrorText,
    fontSize: 12,
    marginTop: 4,
  },
});
