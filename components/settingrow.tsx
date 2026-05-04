import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SettingRowProps {
  icon: string;
  label: string;
  onPress?: () => void;
  showDivider?: boolean;
}

export default function SettingRow({
  icon,
  label,
  onPress,
  showDivider = true,
}: SettingRowProps) {
  return (
    <>
      <TouchableOpacity
        style={styles.row}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.left}>
          <Ionicons name={icon as any} size={18} color="#555" />
          <Text style={styles.label}>{label}</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#bbb" />
      </TouchableOpacity>
      {showDivider && <View style={styles.divider} />}
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f2f4f8",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 8,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#222",
  },
  divider: {
    height: 0,
  },
});