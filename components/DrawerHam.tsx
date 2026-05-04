import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface DrawerProps {
  onClose?: () => void;
}

export default function DrawerHam({ onClose }: DrawerProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/(tabs)") return pathname === "/" || pathname === "/index" || pathname.startsWith("/(tabs)");
    return pathname === path || pathname.startsWith(path + '/');
  };

  const menuItems = [
    { path: "/(tabs)", label: "All Notes", icon: "document-text" },
    { path: "/favorit",  label: "Favorites",  icon: "star-outline"    },
    { path: "/archive",  label: "Archive",    icon: "archive-outline" },
    { path: "/trash",    label: "Trash",      icon: "trash-outline"   },
  ];

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={() => router.replace("/profile")}>
          <Image
            source={require("../assets/images/05afaecbd775d9c9e5d1618f40ac765f2724d77a.jpg")}
            style={styles.avatar}
          />
          <View style={styles.nameRow}>
            <Text style={styles.nameText}>Alex Rivera</Text>
            <Ionicons name="checkmark-circle" size={16} color="#3E82F7" style={styles.verifiedIcon} />
          </View>
          <Text style={styles.emailText}>alex.rivera@smartnote.ai</Text>
        </TouchableOpacity>
        <Text style={styles.premiumText}>PREMIUM MEMBER</Text>
      </View>

      {/* Menu Section */}
      <View style={styles.menuSection}>
        {menuItems.map((item) => {
          const active = isActive(item.path);
          return (
            <TouchableOpacity
              key={item.path}
              style={[styles.menuItem, active && styles.menuItemActive]}
              activeOpacity={0.7}
              onPress={() => router.replace(item.path as any)}
            >
              <Ionicons
                name={item.icon as any}
                size={22}
                color={active ? "#3E82F7" : "#555"}
              />
              <Text style={[styles.menuText, active && styles.menuTextActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}

        <View style={styles.separator} />

        <TouchableOpacity
          style={[styles.menuItem, isActive("/setting") && styles.menuItemActive]}
          activeOpacity={0.7}
          onPress={() => router.replace("/setting")}
        >
          <Ionicons
            name="settings-outline"
            size={22}
            color={isActive("/setting") ? "#3E82F7" : "#555"}
          />
          <Text style={[styles.menuText, isActive("/setting") && styles.menuTextActive]}>
            Settings
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerLogo}>SmartNote</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    width: "100%",
    borderTopRightRadius: 35,
    borderBottomRightRadius: 35,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  profileSection: {
    paddingHorizontal: 25,
    paddingTop: 60,
    paddingBottom: 30,
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 18,
    marginBottom: 15,
    backgroundColor: "#E0E0E0",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
  },
  verifiedIcon: {
    marginLeft: 6,
  },
  emailText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 12,
  },
  premiumText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#3E82F7",
    letterSpacing: 1.2,
  },
  menuSection: {
    paddingHorizontal: 15,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 5,
  },
  menuItemActive: {
    backgroundColor: "#EDF3FF",
  },
  menuText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#555",
    marginLeft: 15,
  },
  menuTextActive: {
    color: "#3E82F7",
  },
  separator: {
    height: 15,
  },
  footer: {
    marginTop: "auto",
    alignItems: "center",
    paddingBottom: 40,
  },
  footerLogo: {
    fontSize: 18,
    fontWeight: "900",
    color: "#3E82F7",
  },
});