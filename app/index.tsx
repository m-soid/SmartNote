import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import InputField from '@/components/inputfield';
import Button from '@/components/button';
import { router } from 'expo-router';

export default function CreateAccountScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleRegister = () => {
    // Handle registration logic
    console.log({ name, email, password, confirm });
  };

  const handleGoogleRegister = () => {
    // Handle Google OAuth
    console.log('Google register');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {/* Logo */}
      <Text style={styles.logo}>SmartNote</Text>

      {/* Header */}
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Begin your journey in the Digital Atelier.</Text>

      {/* Form */}
      <View style={styles.form}>
        <InputField
          label="Name"
          placeholder="Alex Rivera"
          icon={<Feather name="user" size={16} color="#bbb" />}
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

        <InputField
          label="Email Address"
          placeholder="alex@smartnote.ai"
          icon={<Feather name="mail" size={16} color="#bbb" />}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <InputField
          label="Password"
          placeholder="••••••••"
          icon={<Feather name="lock" size={16} color="#bbb" />}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <InputField
          label="Confirm"
          placeholder="••••••••"
          icon={<Feather name="shield" size={16} color="#bbb" />}
          value={confirm}
          onChangeText={setConfirm}
          secureTextEntry
          autoCapitalize="none"
        />

        {/* Register Button */}
        <Button
          label="Register"
          onPress={() => router.replace("/login")}
          variant="primary"
          style={styles.registerBtn}
        />

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR REGISTER WITH</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Google Button */}
        <Button
          label="Google Account"
          onPress={() => router.replace("/login")}
          variant="outline"
          textStyle={styles.googleText}
        />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.replace("/login")}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#eef0f3',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingTop: 48,
    paddingBottom: 40,
  },
  logo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginBottom: 32,
    letterSpacing: -0.3,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 36,
  },
  form: {
    width: '100%',
  },
  registerBtn: {
    marginTop: 8,
    marginBottom: 4,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#dde0e6',
  },
  dividerText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#aaa',
  },
  googleText: {
    color: '#222',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#888',
  },
  loginLink: {
    fontSize: 14,
    color: '#4f8ef7',
    fontWeight: '500',
  },
});