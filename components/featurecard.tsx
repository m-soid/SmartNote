import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>{icon}</View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f0f4ff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  iconWrap: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: "#666",
    lineHeight: 20,
  },
});