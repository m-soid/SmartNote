import DrawerHam from "@/components/DrawerHam";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Star } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  Animated,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function FavoritesScreen() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current;

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

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header — harus di luar body biar ga ketimpa */}
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="menu" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>The Digital Atelier</Text>
        <TouchableOpacity style={styles.avatarBtn}>
          <Ionicons name="person-circle" size={36} color="#4a6cf7" />
        </TouchableOpacity>
      </View>

      {/* Empty State — terpisah dari header */}
      <View style={styles.body}>
        <View style={styles.iconWrap}>
          <Star size={28} color="#4a6cf7" fill="#4a6cf7" />
        </View>

        <Text style={styles.title}>Belum ada Favorit</Text>
        <Text style={styles.subtitle}>
          Catatan yang Anda tandai sebagai{"\n"}favorit akan muncul di sini.
        </Text>

        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.85}
          onPress={() => router.replace("/(tabs)")}
        >
          <Text style={styles.btnText}>Mulai Menandai</Text>
        </TouchableOpacity>
      </View>

      {/* Drawer */}
      <Modal
        visible={drawerOpen}
        transparent
        animationType="none"
        onRequestClose={closeDrawer}
      >
        <View style={styles.modalOverlay}>
          <Pressable style={styles.backdrop} onPress={closeDrawer} />
          <Animated.View
            style={[styles.drawerWrapper, { transform: [{ translateX: slideAnim }] }]}
          >
            <DrawerHam onClose={closeDrawer} />
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#eef1f7",
  },

  // Header berdiri sendiri, tidak di dalam body
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111",
  },
  avatarBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  // Body terpisah, flex: 1 ke bawah
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 48,
    shadowColor: "#a0b0d0",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 36,
  },
  btn: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 36,
    paddingVertical: 16,
    borderRadius: 999,
  },
  btnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  // Drawer
  modalOverlay: { flex: 1 },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  drawerWrapper: {
    width: "75%",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
  },
});