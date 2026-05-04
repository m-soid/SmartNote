import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const TAGS = ['PERSONAL', 'STRATEGY', 'PROJECT', 'MEETING', 'INSIGHT'];

export default function AddNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    setCurrentDate(today.toLocaleDateString('id-ID', options));
  }, []);

  const toggleTag = () => {
    if (!tag) {
      setTag(TAGS[0]);
      return;
    }
    const currentIndex = TAGS.indexOf(tag);
    const nextIndex = (currentIndex + 1) % TAGS.length;
    setTag(TAGS[nextIndex]);
  };

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) {
      Alert.alert('Eits!', 'Judul atau isi catatan nggak boleh kosong dong.');
      return;
    }
    try {
      const existingNotes = await AsyncStorage.getItem('@smartnote_notes');
      let notesArray = existingNotes ? JSON.parse(existingNotes) : [];
      const newNote = {
        id: Date.now().toString(),
        title: title.trim() || 'Tanpa Judul',
        snippet: content.trim() || '...',
        tag: tag || 'PERSONAL',
        date: currentDate,
      };
      notesArray.unshift(newNote);
      await AsyncStorage.setItem('@smartnote_notes', JSON.stringify(notesArray));
      router.back();
    } catch (error) {
      console.error('Gagal menyimpan catatan:', error);
      Alert.alert('Error', 'Gagal menyimpan catatan.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerLeft}>
            <Feather name="arrow-left" size={22} color="#1f2933" />
            <Text style={styles.headerTitle}>Tulis Catatan</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveButton}>Simpan</Text>
          </TouchableOpacity>
        </View>

        {/* META PILLS */}
        <View style={styles.metaContainer}>
          {/* Date pill */}
          <View style={styles.pill}>
            <Feather name="calendar" size={13} color="#64748b" />
            <Text style={styles.pillText}>{currentDate}</Text>
          </View>
          {/* Tag pill */}
          <TouchableOpacity style={styles.pill} onPress={toggleTag} activeOpacity={0.7}>
            <Feather name="plus-circle" size={13} color="#2563eb" />
            <Text style={[styles.pillText, { color: '#2563eb' }]}>
              {tag || 'Tambah Tag'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* INPUT AREA */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.titleInput}
            placeholder="Judul Catatan"
            placeholderTextColor="#b8c4d4"
            value={title}
            onChangeText={setTitle}
          />
          <View style={styles.titleUnderline} />
          <TextInput
            style={styles.contentInput}
            placeholder="Mulai mengetik ide kamu di sini..."
            placeholderTextColor="#b8c4d4"
            multiline
            textAlignVertical="top"
            value={content}
            onChangeText={setContent}
          />
        </View>

        
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f2f5', // ← abu terang kayak di foto
  },
  flex: {
    flex: 1,
  },

  // ── Header ──────────────────────────────────────────
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: '#f0f2f5',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2933',
  },
  saveButton: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2563eb',
  },

  // ── Pills ────────────────────────────────────────────
  metaContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 28,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',          // ← putih
    borderWidth: 1,
    borderColor: '#e2e8f0',           // ← border tipis
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    gap: 6,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#475569',
  },

  // ── Input Area ───────────────────────────────────────
  inputContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',          // ← area tulis putih bersih
    marginHorizontal: 0,
    paddingTop: 24,
  },
  titleInput: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1f2933',
    padding: 0,
    letterSpacing: -0.5,
  },
  titleUnderline: {
    width: 44,
    height: 3,
    backgroundColor: '#2563eb',
    borderRadius: 2,
    marginTop: 10,
    marginBottom: 20,
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 26,
    paddingTop: 0,
  },

  // ── Toolbar ──────────────────────────────────────────
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2d2d2d',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 40,
  },
  toolbarIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 22,
  },
  formatB: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
  formatI: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    fontStyle: 'italic',
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    gap: 6,
  },
  aiButtonText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
    lineHeight: 14,
    textAlign: 'center',
  },
});