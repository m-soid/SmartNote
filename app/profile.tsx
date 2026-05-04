import DrawerHam from "@/components/DrawerHam";
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
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface MenuItemProps {
  icon: string;
  label: string;
  onPress?: () => void;
  showDivider?: boolean;
}

function MenuItem({ icon, label, onPress, showDivider = true }: MenuItemProps) {
  return (
    <>
      <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
        <View style={styles.menuLeft}>
          <View style={styles.menuIconWrap}>
            <Ionicons name={icon as any} size={18} color="#4A6CF7" />
          </View>
          <Text style={styles.menuLabel}>{label}</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#ccc" />
      </TouchableOpacity>
      {showDivider && <View style={styles.divider} />}
    </>
  );
}

export default function SettingScreen() {
  const [isDark, setIsDark] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-400)).current;

  const openDrawer = () => {
    setDrawerOpen(true);
    Animated.timing(slideAnim, { toValue: 0, duration: 280, useNativeDriver: true }).start();
  };

  const closeDrawer = () => {
    Animated.timing(slideAnim, { toValue: -400, duration: 240, useNativeDriver: true }).start(
      () => setDrawerOpen(false)
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={openDrawer}>
            <Ionicons name="menu" size={22} color="#111" />
          </TouchableOpacity>
          <Text style={styles.headerLeftText}>Profil Saya</Text>
        </View>
        <Text style={styles.headerBrand}>SmartNote</Text>
        <TouchableOpacity style={styles.headerAvatarBtn}>
          <Ionicons name="person-circle-outline" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile */}
        <View style={styles.profileSection}>
          <View style={styles.avatarWrap}>
            <Image
              source={require("../assets/images/05afaecbd775d9c9e5d1618f40ac765f2724d77a.jpg")}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editBadge}>
              <Ionicons name="pencil" size={12} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>Alex Rivera</Text>
          <Text style={styles.profileEmail}>alex.rivera@smartnote.ai</Text>
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumBadgeText}>PREMIUM MEMBER</Text>
          </View>
        </View>

        {/* Akun & Preferensi */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>AKUN &amp; PREFERENSI</Text>
          <MenuItem icon="person-outline" label="Edit Profil" onPress={() => router.push("/edit")} />
          <MenuItem icon="shield-checkmark-outline" label="Keamanan" onPress={() => router.push("/keamanan")} />
          <MenuItem icon="notifications-outline" label="Notifikasi" showDivider={false} onPress={() => router.push("/notif")} />
        </View>

        {/* Tema */}
        <View style={styles.card}>
          <View style={styles.themeRow}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIconWrap}>
                <Ionicons name="moon-outline" size={18} color="#4A6CF7" />
              </View>
              <View>
                <Text style={styles.menuLabel}>Tema (Gelap/Terang)</Text>
                <Text style={styles.themeSubText}>
                  {isDark ? "Mode Gelap Aktif" : "Mode Terang Aktif"}
                </Text>
              </View>
            </View>
            <Switch
              value={isDark}
              onValueChange={setIsDark}
              trackColor={{ false: "#e0e0e0", true: "#4A6CF7" }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8} onPress={() => router.replace("/")}>
          <Ionicons name="log-out-outline" size={18} color="#D92D20" />
          <Text style={styles.logoutText}>Keluar</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerBrand}>SmartNote</Text>
          <Text style={styles.footerVersion}>VERSION 2.4.0 (2024)</Text>
        </View>
      </ScrollView>

      {/* Drawer */}
      <Modal visible={drawerOpen} transparent animationType="none" onRequestClose={closeDrawer}>
        <View style={styles.modalOverlay}>
          <Pressable style={styles.backdrop} onPress={closeDrawer} />
          <Animated.View style={[styles.drawerWrapper, { transform: [{ translateX: slideAnim }] }]}>
            <DrawerHam onClose={closeDrawer} />
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f0f2f7" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 6 },
  headerLeftText: { fontSize: 16, fontWeight: "600", color: "#2563eb" },
  headerBrand: { fontSize: 17, fontWeight: "700", color: "#111" },
  headerAvatarBtn: { width: 32, height: 32, alignItems: "center", justifyContent: "center" },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  profileSection: { alignItems: "center", paddingVertical: 24 },
  avatarWrap: { position: "relative", marginBottom: 16 },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  editBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#f0f2f7",
  },
  profileName: { fontSize: 22, fontWeight: "700", color: "#111", marginBottom: 4 },
  profileEmail: { fontSize: 13, color: "#888", marginBottom: 10 },
  premiumBadge: {
    backgroundColor: "#e8eeff",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  premiumBadgeText: { fontSize: 11, fontWeight: "700", color: "#4A6CF7", letterSpacing: 0.8 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#aaa",
    letterSpacing: 1,
    marginTop: 8,
    marginBottom: 4,
    marginLeft: 4,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  menuLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#eef1ff",
    alignItems: "center",
    justifyContent: "center",
  },
  menuLabel: { fontSize: 15, color: "#222", fontWeight: "500" },
  divider: { height: 1, backgroundColor: "#f2f4f8", marginLeft: 48 },
  themeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  themeSubText: { fontSize: 12, color: "#aaa", marginTop: 2 },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FEE4E2",
    borderWidth: 1,
    borderColor: "#FECDCA",
    borderRadius: 14,
    height: 52,
    marginBottom: 28,
  },
  logoutText: { fontSize: 15, fontWeight: "600", color: "#D92D20" },
  footer: { alignItems: "center", gap: 4 },
  footerBrand: { fontSize: 15, fontWeight: "600", color: "#bbb" },
  footerVersion: { fontSize: 11, color: "#ccc", letterSpacing: 0.5 },
  modalOverlay: { flex: 1 },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.35)" },
  drawerWrapper: { width: "75%", position: "absolute", top: 0, bottom: 0, left: 0 },
});