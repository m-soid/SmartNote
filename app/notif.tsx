import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import {
  ChevronLeft,
  FileText,
  CalendarDays,
  Smartphone,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react-native';
import { router } from 'expo-router';

const BLUE = '#2563EB';
const BG = '#F2F2F7';
const WHITE = '#FFFFFF';
const TEXT_PRIMARY = '#111827';
const TEXT_SECONDARY = '#6B7280';

export default function NotifikasiPreference() {
  const [notifCatatan, setNotifCatatan] = useState(true);
  const [pengingat, setPengingat] = useState(false);
  const [pembaruan, setPembaruan] = useState(true);

  const notifications = [
    {
      key: 'catatan',
      icon: <FileText size={20} color={BLUE} />,
      title: 'Notifikasi\nCatatan',
      desc: 'Dapatkan pembaruan\nsaat catatan dibagikan\natau diedit oleh\nkolaborator Anda.',
      value: notifCatatan,
      toggle: () => setNotifCatatan(v => !v),
    },
    {
      key: 'pengingat',
      icon: <CalendarDays size={20} color={BLUE} />,
      title: 'Pengingat\nHarian',
      desc: 'Rangkuman pagi untuk\nmembantu Anda fokus\npada prioritas hari ini.',
      value: pengingat,
      toggle: () => setPengingat(v => !v),
    },
    {
      key: 'pembaruan',
      icon: <Smartphone size={20} color={BLUE} />,
      title: 'Pembaruan\nAplikasi',
      desc: 'Jadilah yang pertama\nmengetahui fitur baru\ndan peningkatan\nperforma.',
      value: pembaruan,
      toggle: () => setPembaruan(v => !v),
    },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBack} onPress={() => router.back()}>
          <ChevronLeft size={22} color={BLUE} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>The Digital Atelier</Text>
        <TouchableOpacity style={styles.headerAvatar}>
          <View style={styles.avatarCircle} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero Title */}
        <View style={styles.heroSection}>
          <Text style={styles.preLabel}>PREFERENCE CENTER</Text>
          <Text style={styles.heroTitle}>
            Stay aligned{'\n'}with your{'\n'}
            <Text style={styles.heroTitleBlue}>creative{'\n'}flow.</Text>
          </Text>
          <Text style={styles.heroDesc}>
            Configure how SmartNote communicates with you. We believe in quiet productivity, so we've curated these controls to be as non-intrusive as possible.
          </Text>
        </View>

        {/* Notification Cards */}
        <View style={styles.notifCard}>
          {notifications.map((item, idx) => (
            <View key={item.key}>
              <View style={styles.notifRow}>
                <View style={styles.notifIconWrap}>
                  {item.icon}
                </View>
                <View style={styles.notifTextWrap}>
                  <Text style={styles.notifTitle}>{item.title}</Text>
                  <Text style={styles.notifDesc}>{item.desc}</Text>
                </View>
                <TouchableOpacity
                  onPress={item.toggle}
                  style={[styles.checkCircle, item.value && styles.checkCircleActive]}
                  activeOpacity={0.7}
                >
                  {item.value && (
                    <View style={styles.checkMark}>
                      {/* Checkmark drawn manually */}
                      <Text style={styles.checkMarkText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              {idx < notifications.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        {/* Sync note + Save Button */}
        <View style={styles.saveSection}>
          <View style={styles.syncRow}>
            <ShieldCheck size={13} color={TEXT_SECONDARY} />
            <Text style={styles.syncText}>All settings are synced across your devices instantly.</Text>
          </View>
          <TouchableOpacity style={styles.saveBtn} activeOpacity={0.85}>
            <Text style={styles.saveBtnText}>Save Changes</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerInner}>
            {/* Lamp illustration placeholder */}
            <View style={styles.lampArea}>
              <View style={styles.lampBase} />
              <View style={styles.lampNeck} />
              <View style={styles.lampHead} />
            </View>
            <Text style={styles.bannerText}>Focus is a choice.</Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab}>
        <MessageCircle size={22} color={WHITE} fill={WHITE} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: BG,
  },
  headerBack: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  headerAvatar: {},
  avatarCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#C4A882',
  },
  scroll: {
    flex: 1,
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
  },
  preLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: BLUE,
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 38,
    fontWeight: '900',
    color: '#0F172A',
    lineHeight: 44,
    marginBottom: 16,
  },
  heroTitleBlue: {
    color: BLUE,
    fontSize: 38,
    fontWeight: '900',
    lineHeight: 44,
  },
  heroDesc: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 21,
  },
  notifCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginHorizontal: 16,
    marginBottom: 20,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  notifRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 18,
    gap: 14,
  },
  notifIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifTextWrap: {
    flex: 1,
  },
  notifTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 20,
    marginBottom: 4,
  },
  notifDesc: {
    fontSize: 12.5,
    color: '#6B7280',
    lineHeight: 18,
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircleActive: {
    backgroundColor: BLUE,
    borderColor: BLUE,
  },
  checkMark: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMarkText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 18,
  },
  saveSection: {
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 20,
    gap: 14,
  },
  syncRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  syncText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  saveBtn: {
    backgroundColor: BLUE,
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 60,
    alignSelf: 'center',
    shadowColor: BLUE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  banner: {
    marginHorizontal: 16,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
    height: 140,
  },
  bannerInner: {
    flex: 1,
    position: 'relative',
    justifyContent: 'flex-end',
    padding: 20,
  },
  lampArea: {
    position: 'absolute',
    left: 30,
    top: 10,
    alignItems: 'center',
  },
  lampHead: {
    width: 40,
    height: 22,
    borderRadius: 4,
    backgroundColor: '#B0B0B0',
    transform: [{ rotate: '-20deg' }],
  },
  lampNeck: {
    width: 4,
    height: 36,
    backgroundColor: '#A0A0A0',
    transform: [{ rotate: '10deg' }],
  },
  lampBase: {
    width: 30,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#A0A0A0',
  },
  bannerText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  fab: {
    position: 'absolute',
    bottom: 28,
    right: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: BLUE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
});