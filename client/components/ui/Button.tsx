// components/ui/Button.tsx
import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';

type Variant = 'primary' | 'secondary' | 'destructive';

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  fullWidth?: boolean;
  LeftIcon?: React.ComponentType<{ size?: number; color?: string }>;
  RightIcon?: React.ComponentType<{ size?: number; color?: string }>;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  textStyle,
  fullWidth = true,
  LeftIcon,
  RightIcon,
}) => {
  const isDisabled = disabled || loading;

  const { buttonStyle, textColor } = getVariantStyles(variant, isDisabled);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.base,
        fullWidth && styles.fullWidth,
        buttonStyle,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size='small' color={textColor} />
      ) : (
        <View style={styles.content}>
          {LeftIcon ? (
            <View style={styles.iconLeft}>
              <LeftIcon size={18} color={textColor} />
            </View>
          ) : null}

          {typeof children === 'string' ? (
            <Text style={[styles.text, { color: textColor }, textStyle]}>
              {children}
            </Text>
          ) : (
            children
          )}

          {RightIcon ? (
            <View style={styles.iconRight}>
              <RightIcon size={18} color={textColor} />
            </View>
          ) : null}
        </View>
      )}
    </TouchableOpacity>
  );
};

const getVariantStyles = (variant: Variant, disabled: boolean) => {
  switch (variant) {
    case 'secondary':
      return {
        buttonStyle: {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: disabled ? '#D1D5DB' : '#0A84FF',
        },
        textColor: disabled ? '#9CA3AF' : '#0A84FF',
      };
    case 'destructive':
      return {
        buttonStyle: {
          backgroundColor: disabled ? '#FCA5A5' : '#EF4444',
        },
        textColor: '#FFFFFF',
      };
    case 'primary':
    default:
      return {
        buttonStyle: {
          backgroundColor: disabled ? '#93C5FD' : '#0A84FF',
        },
        textColor: '#FFFFFF',
      };
  }
};

const styles = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  disabled: {
    opacity: 0.7,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});
