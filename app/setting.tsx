import DrawerHam from "@/components/DrawerHam";
import SettingRow from "@/components/settingrow";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PengaturanScreen() {
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
          <Text style={styles.workspace}>PERSONALIZE WORKSPACE</Text>
          <Text style={styles.pageTitle}>Settings</Text>
          <Text style={styles.pageDesc}>
            Refine your creative environment. Manage your identity, visual
            preferences, and localized experience within the digital atelier.
          </Text>
        </View>

        {/* ── Card: Akun ── */}
        <View style={styles.card}>
          <Ionicons name="person-circle-outline" size={28} color="#2563eb" />
          <Text style={styles.cardTitle}>Akun</Text>
          <Text style={styles.cardDesc}>
            Manage your profile and subscription status
          </Text>
          <View style={styles.rowsWrap}>
            <SettingRow
              icon="person-outline"
              label="Informasi Profil"
              onPress={() => router.push("/profile")}
            />
            <SettingRow
              icon="shield-checkmark-outline"
              label="Keamanan"
              onPress={() => router.push("/keamanan")}
              showDivider={false}
            />
          </View>
        </View>

        {/* ── Card: Tampilan ── */}
        <View style={styles.card}>
          <Ionicons name="color-palette-outline" size={28} color="#2563eb" />
          <Text style={styles.cardTitle}>Tampilan</Text>
          <Text style={styles.cardDesc}>Customize themes and typography</Text>

          <TouchableOpacity style={styles.themeBtn} activeOpacity={0.85}>
            <Text style={styles.themeBtnText}>Buka Galeri Tema →</Text>
          </TouchableOpacity>

          {/* Theme preview image */}
          <View style={styles.themePreview}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" }}
              style={styles.themeImage}
              resizeMode="cover"
            />
            <View style={styles.themeOverlay}>
              <View style={styles.themeBar} />
            </View>
          </View>
        </View>

        {/* ── Card: Bahasa ── */}
        <View style={[styles.card, styles.cardRow]}>
          <View style={styles.langIconWrap}>
            <Ionicons name="globe-outline" size={22} color="#2563eb" />
          </View>
          <View style={styles.langInfo}>
            <Text style={styles.langTitle}>Bahasa</Text>
            <Text style={styles.langSub}>Indonesia (ID)</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.langUbah}>Ubah</Text>
          </TouchableOpacity>
        </View>

        {/* ── Card: Tentang Aplikasi ── */}
        <TouchableOpacity
          style={[styles.card, styles.cardRow]}
          activeOpacity={0.8}
        >
          <View style={styles.langIconWrap}>
            <Ionicons name="information-circle-outline" size={22} color="#555" />
          </View>
          <View style={styles.langInfo}>
            <Text style={styles.langTitle}>Tentang Aplikasi</Text>
            <Text style={styles.langSub}>v2.4.0 • Enterprise Edition</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#bbb" />
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerBrand}>SmartNote</Text>
          <Text style={styles.footerTagline}>DESIGNED FOR DIGITAL CRAFTSMEN</Text>
          <View style={styles.footerLinks}>
            <TouchableOpacity><Text style={styles.footerLink}>Privacy</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.footerLink}>Terms</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.footerLink}>Support</Text></TouchableOpacity>
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
    marginBottom: 24,
  },
  workspace: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2563eb",
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  pageTitle: {
    fontSize: 40,
    fontWeight: "800",
    color: "#111",
    letterSpacing: -1,
    marginBottom: 10,
  },
  pageDesc: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },

  // Card
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    marginTop: 10,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 13,
    color: "#888",
    marginBottom: 16,
  },
  rowsWrap: {
    gap: 0,
  },

  // Theme
  themeBtn: {
    backgroundColor: "#2563eb",
    borderRadius: 999,
    paddingVertical: 13,
    alignItems: "center",
    marginBottom: 14,
  },
  themeBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  themePreview: {
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  themeImage: {
    width: "100%",
    height: 120,
  },
  themeOverlay: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  themeBar: {
    width: 60,
    height: 4,
    backgroundColor: "#2563eb",
    borderRadius: 2,
  },

  // Bahasa
  langIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#eef1ff",
    alignItems: "center",
    justifyContent: "center",
  },
  langInfo: {
    flex: 1,
  },
  langTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
  },
  langSub: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  langUbah: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563eb",
  },

  // Footer
  footer: {
    alignItems: "center",
    paddingTop: 16,
    gap: 4,
  },
  footerBrand: {
    fontSize: 15,
    fontWeight: "700",
    color: "#aaa",
  },
  footerTagline: {
    fontSize: 10,
    color: "#bbb",
    letterSpacing: 1,
    marginBottom: 6,
  },
  footerLinks: {
    flexDirection: "row",
    gap: 20,
  },
  footerLink: {
    fontSize: 12,
    color: "#888",
    fontWeight: "500",
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