import React, { useState } from 'react';
import { View, TextInput, TextInputProps, TouchableOpacity } from 'react-native';
import { Eye, EyeOff, AlertCircle } from 'lucide-react-native';
import { AppText as Text } from '../common/AppText';
import { useDynamicFontSize } from '../../hooks';

/**
 * Props for the MobileFormInput component
 */
interface MobileFormInputProps extends TextInputProps {
  /** Label text for the input field */
  label: string;
  /** Current value of the input */
  value: string;
  /** Callback when the input value changes */
  onChangeText: (text: string) => void;
  /** Error message to display */
  error?: string;
  /** Hint text to display next to the label */
  hint?: string;
  /** Icon to display on the left side of the input */
  leftIcon?: React.ReactNode;
  /** Whether the field is required */
  required?: boolean;
  /** Whether to use dark mode styling */
  isDark?: boolean;
}

export const MobileFormInput: React.FC<MobileFormInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  hint,
  leftIcon,
  required = false,
  isDark = false,
  secureTextEntry,
  multiline = false,
  keyboardType = 'default',
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { scale } = useDynamicFontSize();
  const isPassword = secureTextEntry === true;

  const borderColor = error ? '#ef4444' : isFocused ? '#19c3e6' : isDark ? '#334155' : '#e2e8f0';

  const labelColor = error ? '#ef4444' : isDark ? '#94a3b8' : '#64748b';

  return (
    <View className="mb-4 w-full">
      <View className="flex-row justify-between items-center mb-1.5">
        <Text
          className="font-semibold tracking-[0.1px]"
          style={{ color: labelColor, fontSize: scale(14) }}
        >
          {label}
          {required && (
            <Text className="text-red-500" style={{ fontSize: scale(14) }}>
              {' '}
              *
            </Text>
          )}
        </Text>
        {hint && !error && (
          <Text style={{ color: isDark ? '#475569' : '#94a3b8', fontSize: scale(12) }}>
            {hint}
          </Text>
        )}
      </View>

      <View
        className="flex-row items-center border-[1.5px] rounded-xl overflow-hidden"
        style={{
          borderColor,
          backgroundColor: isDark ? '#1e293b' : '#fff',
          minHeight: multiline ? scale(100) : scale(52),
        }}
      >
        {leftIcon && <View className="px-3.5 justify-center items-center">{leftIcon}</View>}

        <TextInput
          className="flex-1 py-3.5 pr-4"
          style={{
            color: isDark ? '#f1f5f9' : '#1e293b',
            paddingLeft: leftIcon ? 0 : scale(16),
            textAlignVertical: multiline ? 'top' : 'center',
            paddingTop: multiline ? scale(14) : 0,
            fontSize: scale(15),
          }}
          placeholder={placeholder}
          placeholderTextColor={isDark ? '#475569' : '#94a3b8'}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isPassword && !showPassword}
          multiline={multiline}
          keyboardType={keyboardType}
          {...rest}
        />

        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="px-3.5"
          >
            {showPassword ? (
              <EyeOff size={scale(20)} color={isDark ? '#64748b' : '#94a3b8'} />
            ) : (
              <Eye size={scale(20)} color={isDark ? '#64748b' : '#94a3b8'} />
            )}
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <View className="flex-row items-center gap-1 mt-1">
          <AlertCircle size={scale(14)} color="#ef4444" />
          <Text className="text-red-500 flex-1" style={{ fontSize: scale(12) }}>
            {error}
          </Text>
        </View>
      )}
    </View>
  );
};

