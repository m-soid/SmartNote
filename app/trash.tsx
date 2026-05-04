import DrawerHam from "@/components/DrawerHam";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { History, Shield, Trash2 } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  Animated,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ─── Reusable InfoItem ────────────────────────────────────────────────────────
interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  description: string;
}

function InfoItem({ icon, label, description }: InfoItemProps) {
  return (
    <View style={styles.infoItem}>
      <View style={styles.infoIcon}>{icon}</View>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoDesc}>{description}</Text>
    </View>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

export default function TrashScreen() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current;

  const openDrawer = () => {
    setDrawerOpen(true);
    Animated.timing(slideAnim, { toValue: 0, duration: 280, useNativeDriver: true }).start();
  };

  const closeDrawer = () => {
    Animated.timing(slideAnim, { toValue: -300, duration: 240, useNativeDriver: true }).start(
      () => setDrawerOpen(false)
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={openDrawer}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="menu" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>The Digital Atelier</Text>
        <TouchableOpacity style={styles.avatarBtn}>
          <Ionicons name="person-circle" size={36} color="#4a6cf7" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Empty State */}
        <View style={styles.emptySection}>
          {/* Trash icon circle */}
          <View style={styles.iconCircle}>
            <Trash2 size={40} color="#94a3b8" strokeWidth={1.5} />
          </View>

          {/* Title */}
          <Text style={styles.title}>Sampah{"\n"}Kosong</Text>

          {/* Subtitle with blue "30 hari" */}
          <Text style={styles.subtitle}>
            Catatan yang dihapus akan tetap{"\n"}berada di sini selama{" "}
            <Text style={styles.highlight}>30 hari</Text>
            {" "}sebelum{"\n"}dihapus permanen.
          </Text>

          {/* Button */}
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.8}
            onPress={() => router.replace("/(tabs)")}
          >
            <Text style={styles.btnText}>Kembali ke Catatan</Text>
          </TouchableOpacity>
        </View>

        {/* Info Items */}
        <View style={styles.infoSection}>
          <InfoItem
            icon={<Ionicons name="refresh-circle-outline" size={24} color="#94a3b8" />}
            label="AUTOMASI"
            description="Pembersihan berkala otomatis dilakukan setiap bulan."
          />
          <InfoItem
            icon={<Shield size={24} color="#94a3b8" strokeWidth={1.5} />}
            label="PRIVASI"
            description="Data Anda tetap terenkripsi bahkan saat berada di sampah."
          />
          <InfoItem
            icon={<History size={24} color="#94a3b8" strokeWidth={1.5} />}
            label="PEMULIHAN"
            description="Satu klik untuk mengembalikan catatan ke folder utama."
          />
        </View>
      </ScrollView>

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
  scrollContent: {
    paddingHorizontal: 28,
    paddingBottom: 60,
  },

  // Empty state
  emptySection: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 52,
  },
  iconCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    shadowColor: "#b0bcd4",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 4,
  },
  title: {
    fontSize: 40,
    fontWeight: "800",
    color: "#111",
    textAlign: "center",
    lineHeight: 46,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  highlight: {
    color: "#2563eb",
    fontWeight: "600",
  },
  btn: {
    backgroundColor: "#f0f2f7",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 999,
  },
  btnText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },

  // Info items
  infoSection: {
    gap: 36,
  },
  infoItem: {
    gap: 4,
  },
  infoIcon: {
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#94a3b8",
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  infoDesc: {
    fontSize: 13,
    color: "#94a3b8",
    lineHeight: 20,
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