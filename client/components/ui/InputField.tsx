import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { colors } from '@/constants/colors';

type IconComponent = React.ComponentType<{ size?: number; color?: string }>;

interface InputFieldProps extends TextInputProps {
  label?: string;
  LeftIcon?: IconComponent;
  rightElement?: React.ReactNode;
  isPassword?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  error?: string;
  isInvalid?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  LeftIcon,
  rightElement,
  isPassword,
  containerStyle,
  secureTextEntry,
  error,
  isInvalid,
  ...textInputProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isSecure = isPassword ? !showPassword : secureTextEntry;

  const renderRight = () => {
    if (rightElement) return rightElement;

    if (isPassword) {
      return (
        <View
          style={styles.iconRight}
          onTouchEnd={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff size={20} color={colors.inputPlaceholder} />
          ) : (
            <Eye size={20} color={colors.inputPlaceholder} />
          )}
        </View>
      );
    }

    return null;
  };

  return (
    <View style={containerStyle}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View
        style={[
          styles.inputWrapper,
          isInvalid && { borderColor: colors.inputErrorBorder },
        ]}
      >
        {LeftIcon ? (
          <View style={styles.iconLeft}>
            <LeftIcon
              size={20}
              color={
                isInvalid ? colors.inputErrorBorder : colors.inputPlaceholder
              }
            />
          </View>
        ) : null}

        <TextInput
          style={styles.input}
          placeholderTextColor={
            isInvalid ? colors.inputErrorBorder : colors.inputPlaceholder
          }
          secureTextEntry={isSecure}
          {...textInputProps}
        />

        {renderRight()}
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.inputBorder,
    paddingHorizontal: 12,
    borderRadius: 10,
    height: 48,
    backgroundColor: colors.inputBackground,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.inputText,
  },
  iconLeft: { marginRight: 8 },
  iconRight: { marginLeft: 8 },
  errorMsg: {
    color: colors.inputErrorText,
    fontSize: 12,
    marginTop: 4,
  },
});
