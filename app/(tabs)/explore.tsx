import ArticleCard from "@/components/articlecard";
import DrawerHam from "@/components/DrawerHam";
import QuoteCard from "@/components/quotecard";
import { router } from "expo-router";
import { Menu, Plus, User } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Modal,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ─── Types ────────────────────────────────────────────────────────────────────
interface QuoteItem {
  id: number;
  quote: string;
  author: string;
}
// ─────────────────────────────────────────────────────────────────────────────

async function fetchRandomQuote(): Promise<QuoteItem> {
  const res = await fetch("https://dummyjson.com/quotes/random");
  if (!res.ok) throw new Error("Gagal fetch quote");
  return res.json();
}

async function fetchMultipleQuotes(count: number): Promise<QuoteItem[]> {
  const promises = Array.from({ length: count }, () => fetchRandomQuote());
  return Promise.all(promises);
}

export default function InspirasiHariIniScreen() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current;

  const [featured, setFeatured] = useState<QuoteItem | null>(null);
  const [feedQuotes, setFeedQuotes] = useState<QuoteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // ─── Fetch ──────────────────────────────────────────────────────────────────
  const loadQuotes = async () => {
    try {
      const [feat, ...feed] = await fetchMultipleQuotes(3);
      setFeatured(feat);
      setFeedQuotes(feed);
    } catch (e) {
      console.error("Gagal load quotes:", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadQuotes();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadQuotes();
  };
  // ───────────────────────────────────────────────────────────────────────────

  // ─── Drawer ─────────────────────────────────────────────────────────────────
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
  // ───────────────────────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer}>
          <Menu size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Inspirasi Hari Ini</Text>
        <TouchableOpacity style={styles.avatarBtn}>
          <User size={20} color="#555" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#2563eb"
            />
          }
        >
          {/* Featured Quote */}
          {featured && (
            <View style={styles.featuredCard}>
              <View style={styles.featuredBadgeWrap}>
                <Text style={styles.featuredBadge}>FEATURED QUOTE</Text>
              </View>
              <Text style={styles.featuredQuote}>"{featured.quote}"</Text>
              <Text style={styles.featuredAuthor}>— {featured.author}</Text>
            </View>
          )}

          {/* Feed: Article + Quote selang-seling */}
          <View style={styles.feed}>
            <ArticleCard
              title="Menjaga Fokus di Era Distraksi Digital"
              excerpt="Teknik deep work untuk meningkatkan produktivitas..."
              author="Andi Pratama"
            />

            {feedQuotes[0] && (
              <QuoteCard
                quote={`"${feedQuotes[0].quote}"`}
                author={feedQuotes[0].author}
              />
            )}

            <ArticleCard
              title="Minimalisme: Seni Melepaskan"
              excerpt="Bagaimana ruang yang bersih menciptakan pikiran yang jernih..."
              author="Siska Rahayu"
            />

            {feedQuotes[1] && (
              <QuoteCard
                quote={`"${feedQuotes[1].quote}"`}
                author={feedQuotes[1].author}
              />
            )}
          </View>
        </ScrollView>
      )}

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.85}
        onPress={() => router.push("/writenote")}
      >
        <Plus size={24} color="#fff" />
      </TouchableOpacity>

      {/* Drawer Modal */}
      <Modal
        visible={drawerOpen}
        transparent
        animationType="none"
        onRequestClose={closeDrawer}
      >
        <View style={styles.modalOverlay}>
          <Pressable style={styles.backdrop} onPress={closeDrawer} />
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
  safe: {
    flex: 1,
    backgroundColor: "#eef1f7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
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
  loadingWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  featuredCard: {
    backgroundColor: "#2563eb",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  featuredBadgeWrap: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 14,
  },
  featuredBadge: {
    fontSize: 10,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 1,
  },
  featuredQuote: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    lineHeight: 30,
    marginBottom: 14,
  },
  featuredAuthor: {
    fontSize: 13,
    color: "rgba(255,255,255,0.75)",
  },
  feed: {
    gap: 0,
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
  modalOverlay: {
    flex: 1,
    flexDirection: "row",
  },
  backdrop: {
    flex: 1,
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