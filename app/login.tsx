import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import InputBox from '@/components/inputbox';
import Button from '@/components/button';
import { router } from 'expo-router';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log({ email, password });
  };

  const handleGoogleLogin = () => {
    console.log('Google login');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {/* Logo + Branding */}
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Feather name="file-text" size={32} color="#fff" />
        </View>
        <Text style={styles.appName}>SmartNote</Text>
        <Text style={styles.tagline}>Your thoughts, refined and organized.</Text>
      </View>

      {/* Card */}
      <View style={styles.card}>
        {/* Email */}
        <InputBox
          label="Email"
          placeholder="name@company.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password + Forgot */}
        <InputBox
          label="Password"
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          rightElement={
            <TouchableOpacity onPress={() => navigation?.navigate('ForgotPassword')}>
              <Text style={styles.forgot}>Forgot?</Text>
            </TouchableOpacity>
          }
        />

        {/* Login Button */}
        <Button
          label="Login"
          onPress={() => router.replace("/(tabs)")}
          variant="primary"
          style={styles.loginBtn}
        />

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Google Button */}
        <Button
          label="Login with Google"
          onPress={() => router.replace("/(tabs)")}
          variant="outline"
        />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.replace("/")}>
          <Text style={styles.signUpLink}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#eef1f7',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#3a7bd5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111',
    marginBottom: 6,
  },
  tagline: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },
  forgot: {
    fontSize: 14,
    color: '#4f8ef7',
    fontWeight: '500',
  },
  loginBtn: {
    marginTop: 8,
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
    backgroundColor: '#e8eaf0',
  },
  dividerText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#bbb',
    letterSpacing: 1,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 28,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#888',
  },
  signUpLink: {
    fontSize: 14,
    color: '#3a7bd5',
    fontWeight: '700',
  },
});