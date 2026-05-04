import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// ─── Reusable FormField ───────────────────────────────────────────────────────
interface FormFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  keyboardType?: "default" | "email-address";
  autoCapitalize?: "none" | "words" | "sentences";
  labelColor?: string;
}

function FormField({
  label,
  value,
  onChangeText,
  multiline = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
  labelColor = "#888",
}: FormFieldProps) {
  return (
    <View style={fieldStyles.wrap}>
      <Text style={[fieldStyles.label, { color: labelColor }]}>{label}</Text>
      <TextInput
        style={[fieldStyles.input, multiline && fieldStyles.inputMulti]}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        textAlignVertical={multiline ? "top" : "center"}
      />
    </View>
  );
}

const fieldStyles = StyleSheet.create({
  wrap: { marginBottom: 20 },
  label: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  input: {
    backgroundColor: "#f2f4f8",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#111",
    fontWeight: "500",
  },
  inputMulti: {
    minHeight: 130,
    paddingTop: 14,
  },
});
// ─────────────────────────────────────────────────────────────────────────────

// ─── Reusable MetaCard ────────────────────────────────────────────────────────
interface MetaCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

function MetaCard({ label, value, icon }: MetaCardProps) {
  return (
    <TouchableOpacity style={metaStyles.card} activeOpacity={0.75}>
      <Text style={metaStyles.label}>{label}</Text>
      <View style={metaStyles.row}>
        <Text style={metaStyles.value}>{value}</Text>
        {icon}
      </View>
    </TouchableOpacity>
  );
}

const metaStyles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#f2f4f8",
    borderRadius: 14,
    padding: 14,
    gap: 6,
  },
  label: {
    fontSize: 10,
    fontWeight: "700",
    color: "#aaa",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  value: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
    flex: 1,
  },
});
// ─────────────────────────────────────────────────────────────────────────────

export default function EditProfileScreen() {
  const [name, setName] = useState("Alex Rivers");
  const [email, setEmail] = useState("alex.rivers@atelier.digital");
  const [bio, setBio] = useState(
    "Digital Curator & Minimalist Architect. Crafting experiences that breathe in the Digital Atelier. Notes are the seeds of tomorrow's structures."
  );

  const handleSave = () => {
    // TODO: simpan ke storage / API
    router.back();
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity style={styles.avatarBtn}>
          <Image
            source={require("../assets/images/05afaecbd775d9c9e5d1618f40ac765f2724d77a.jpg")}
            style={styles.headerAvatar}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrap}>
            <Image
              source={require("../assets/images/05afaecbd775d9c9e5d1618f40ac765f2724d77a.jpg")}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.cameraBadge}>
              <Ionicons name="camera" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.memberSince}>MEMBER SINCE 2023</Text>
          <Text style={styles.recommended}>Recommended: 1000 × 1000px</Text>
        </View>

        {/* Form */}
        <FormField
          label="Nama Lengkap"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          labelColor="#2563eb"
        />
        <FormField
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <FormField
          label="Bio"
          value={bio}
          onChangeText={setBio}
          multiline
        />

        {/* Meta Cards */}
        <View style={styles.metaRow}>
          <MetaCard
            label="Location"
            value={"Copenhagen,\nDK"}
            icon={<Ionicons name="globe-outline" size={18} color="#aaa" />}
          />
          <MetaCard
            label="Theme"
            value="Azure Light"
            icon={<Ionicons name="color-palette-outline" size={18} color="#aaa" />}
          />
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.discardBtn}>
          <Text style={styles.discardText}>Discard{"\n"}Changes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
          <Ionicons name="checkmark-circle" size={20} color="#fff" />
          <Text style={styles.saveText}>Save{"\n"}Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#eef1f7",
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
  },
  avatarBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: "hidden",
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },

  // Scroll
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },

  // Avatar section
  avatarSection: {
    alignItems: "center",
    marginBottom: 28,
  },
  avatarWrap: {
    position: "relative",
    marginBottom: 12,
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 28,
  },
  cameraBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#eef1f7",
  },
  memberSince: {
    fontSize: 11,
    fontWeight: "700",
    color: "#888",
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  recommended: {
    fontSize: 12,
    color: "#bbb",
  },

  // Meta cards
  metaRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 4,
  },

  // Bottom bar
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#eef1f7",
    gap: 16,
  },
  discardBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  discardText: {
    fontSize: 14,
    color: "#888",
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 20,
  },
  saveBtn: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#2563eb",
    borderRadius: 20,
    paddingVertical: 16,
    shadowColor: "#2563eb",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  saveText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 20,
  },
});