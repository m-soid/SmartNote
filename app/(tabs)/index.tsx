import DrawerHam from "@/components/DrawerHam";
import NoteCard, { Note } from "@/components/notecard";
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/plus-jakarta-sans";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { Menu, Plus, User } from "lucide-react-native";
import React, { useCallback, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current;

  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem("@smartnote_notes");
      if (storedNotes) setNotes(JSON.parse(storedNotes));
      else setNotes([]);
    } catch (error) {
      console.error("Gagal load catatan:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, []),
  );

  const openDrawer = () => {
    setDrawerOpen(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 280,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(slideAnim, {
      toValue: -300,
      duration: 240,
      useNativeDriver: true,
    }).start(() => setDrawerOpen(false));
  };

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={openDrawer}>
            <Menu size={22} color="#111" />
          </TouchableOpacity>
          <Text style={styles.brandTitle}>SmartNote</Text>
          <TouchableOpacity style={styles.avatarBtn}>
            <User size={20} color="#555" />
          </TouchableOpacity>
        </View>

        {/* Title & Subtitle */}
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Catatanku</Text>
          <Text style={styles.pageSubtitle}>
            You have {notes.length} active thoughts today.
          </Text>
        </View>

        {/* List Catatan */}
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <NoteCard
              note={item}
              onPress={() => console.log("Card ditekan:", item.title)}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Belum ada catatan.</Text>
              <Text style={styles.emptySubtext}>
                Tekan tombol + di bawah untuk membuat catatan baru.
              </Text>
            </View>
          }
        />

        {/* FAB */}
        <TouchableOpacity
          style={styles.fab}
          activeOpacity={0.85}
          onPress={() => router.push("/writenote")}
        >
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Drawer Modal */}
      <Modal
        visible={drawerOpen}
        transparent
        animationType="none"
        onRequestClose={closeDrawer}
      >
        <View style={styles.modalOverlay}>
          {/* Backdrop — tap buat nutup */}
          <Pressable style={styles.backdrop} onPress={closeDrawer} />

          {/* Drawer slide dari kiri */}
          <Animated.View
            style={[
              styles.drawerWrapper,
              { transform: [{ translateX: slideAnim }] },
            ]}
          >
            <DrawerHam onClose={closeDrawer} />
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ... semua styles lama tetap sama, tambah ini:
  safeArea: { flex: 1, backgroundColor: "#f4f6f9" },
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  brandTitle: {
    fontSize: 20,
    fontFamily: "PlusJakartaSans_700Bold",
    color: "#2563eb",
  },
  avatarBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#d0d8e8",
    alignItems: "center",
    justifyContent: "center",
  },
  titleSection: { marginBottom: 24, paddingHorizontal: 16 },
  pageTitle: {
    fontSize: 48,
    fontFamily: "PlusJakartaSans_800ExtraBold",
    color: "#1f2933",
    marginBottom: 6,
    letterSpacing: -2,
  },
  pageSubtitle: {
    fontSize: 14,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#6b7280",
  },
  listContainer: { paddingBottom: 130, paddingHorizontal: 16 },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
    paddingHorizontal: 16,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: "PlusJakartaSans_700Bold",
    color: "#9ca3af",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#9ca3af",
    marginTop: 8,
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    bottom: 100,
    right: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2563eb",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  // Drawer styles baru:
  modalOverlay: { flex: 1, flexDirection: "row" },
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)" },
  drawerWrapper: {
    width: "75%",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
  },
});
