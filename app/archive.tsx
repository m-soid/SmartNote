import DrawerHam from "@/components/DrawerHam";
import FeatureCard from "@/components/featurecard";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Archive, History, PlusSquare, Search } from "lucide-react-native";
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

export default function ArchiveScreen() {
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
        {/* Page Title */}
        <View style={styles.titleSection}>
          <Text style={styles.workspace}>WORKSPACE</Text>
          <Text style={styles.pageTitle}>Archive.</Text>
          <View style={styles.titleUnderline} />
        </View>

        {/* Empty State */}
        <View style={styles.emptySection}>
          <View style={styles.iconWrap}>
            <Archive size={36} color="#94a3b8" strokeWidth={1.5} />
            <View style={styles.plusBadge}>
              <Ionicons name="add" size={12} color="#fff" />
            </View>
          </View>
          <Text style={styles.emptyTitle}>Arsip Kosong</Text>
          <Text style={styles.emptySubtitle}>
            Pindahkan catatan yang jarang{"\n"}digunakan ke sini untuk menjaga{"\n"}ruang kerja Anda tetap rapi dan{"\n"}terfokus.
          </Text>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.85}
            onPress={() => router.replace("/(tabs)")}
          >
            <PlusSquare size={16} color="#fff" />
            <Text style={styles.btnText}>Mulai Mengarsipkan</Text>
          </TouchableOpacity>
        </View>

        {/* Feature Cards */}
        <View style={styles.cardsSection}>
          <FeatureCard
            icon={<Ionicons name="brush-outline" size={22} color="#2563eb" />}
            title="Minimalist Focus"
            description="Menyembunyikan kebisingan visual membantu Anda berkonsentrasi pada apa yang penting saat ini."
          />
          <FeatureCard
            icon={<History size={22} color="#2563eb" />}
            title="Keamanan Data"
            description="Catatan yang diarsipkan tidak akan pernah dihapus secara otomatis. Mereka aman bersama kami."
          />
          <FeatureCard
            icon={<Search size={22} color="#2563eb" />}
            title="Pencarian Global"
            description="Gunakan fitur cari untuk menemukan catatan dalam arsip secara instan kapan pun Anda membutuhkannya."
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 The Digital Atelier. All rights reserved.</Text>
          <View style={styles.footerLinks}>
            <TouchableOpacity><Text style={styles.footerLink}>PRIVACY</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.footerLink}>TERMS</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.footerLink}>SUPPORT</Text></TouchableOpacity>
          </View>
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
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  // Title
  titleSection: {
    marginBottom: 32,
  },
  workspace: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2563eb",
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  pageTitle: {
    fontSize: 42,
    fontWeight: "800",
    color: "#111",
    letterSpacing: -1,
    marginBottom: 10,
  },
  titleUnderline: {
    width: 48,
    height: 3,
    backgroundColor: "#2563eb",
    borderRadius: 2,
  },

  // Empty state
  emptySection: {
    alignItems: "center",
    marginBottom: 36,
  },
  iconWrap: {
    width: 90,
    height: 90,
    borderRadius: 24,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#a0b0d0",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 5,
    position: "relative",
  },
  plusBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 13,
    color: "#888",
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 24,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#2563eb",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 999,
  },
  btnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  // Feature cards
  cardsSection: {
    marginBottom: 32,
  },

  // Footer
  footer: {
    alignItems: "center",
    gap: 8,
    paddingTop: 8,
  },
  footerText: {
    fontSize: 12,
    color: "#aaa",
    textAlign: "center",
  },
  footerLinks: {
    flexDirection: "row",
    gap: 20,
  },
  footerLink: {
    fontSize: 11,
    fontWeight: "700",
    color: "#555",
    letterSpacing: 0.5,
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