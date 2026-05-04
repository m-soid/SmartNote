import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';

interface InputFieldProps {
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'sentences' | 'words';
  style?: ViewStyle;
}

export default function InputField({
  label,
  placeholder,
  icon,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  style,
}: InputFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.wrapper, style]}>
      <Text style={styles.label}>{label.toUpperCase()}</Text>
      <View style={[styles.inputRow, focused && styles.inputRowFocused]}>
        <View style={styles.iconWrap}>{icon}</View>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#bbb"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#666',
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: '#d0d4db',
    paddingBottom: 8,
    gap: 10,
  },
  inputRowFocused: {
    borderBottomColor: '#4f8ef7',
  },
  iconWrap: {
    width: 18,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    padding: 0,
  },
});