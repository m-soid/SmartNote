import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  ChevronLeft,
  User,
  KeyRound,
  ShieldCheck,
  Laptop,
  Smartphone,
  Tablet,
  Clock3,
  Lock,
  Mail,
  ChevronRight,
  LogOut,
  CircleCheckBig,
} from 'lucide-react-native';
import { router } from 'expo-router';

const BLUE = '#2563EB';
const BG = '#F2F2F7';
const WHITE = '#FFFFFF';
const TEXT_PRIMARY = '#111827';
const TEXT_SECONDARY = '#6B7280';
const TEXT_BLUE = '#2563EB';
const RED = '#EF4444';
const BORDER = '#E5E7EB';

export default function PusatKeamanan() {
  const [twoFAEnabled, setTwoFAEnabled] = useState(true);

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
          <View style={styles.avatarCircle}>
            <User size={18} color={WHITE} />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Page Title */}
        <View style={styles.pageTitleSection}>
          <Text style={styles.pageTitle}>Pusat{'\n'}Keamanan</Text>
          <Text style={styles.pageSubtitle}>
            Lindungi catatan dan ide kreatif Anda{'\n'}dengan protokol keamanan tingkat{'\n'}lanjut.
          </Text>
        </View>

        {/* Change Password Card */}
        <View style={styles.card}>
          <View style={styles.iconWrapBlue}>
            <KeyRound size={20} color={BLUE} />
          </View>
          <Text style={styles.cardTitle}>Ubah Kata Sandi</Text>
          <Text style={styles.cardDesc}>
            Terakhir diperbarui 3 bulan yang lalu.{'\n'}Gunakan kombinasi simbol dan angka{'\n'}untuk keamanan maksimal.
          </Text>
          <TouchableOpacity style={styles.linkRow}>
            <Text style={styles.linkText}>Perbarui Sekarang</Text>
            <ChevronRight size={16} color={BLUE} />
          </TouchableOpacity>
        </View>

        {/* 2FA Card */}
        <View style={styles.card}>
          <View style={styles.cardRowTop}>
            <View style={styles.iconWrapBlue}>
              <ShieldCheck size={20} color={BLUE} />
            </View>
            <Switch
              value={twoFAEnabled}
              onValueChange={setTwoFAEnabled}
              trackColor={{ false: '#D1D5DB', true: BLUE }}
              thumbColor={WHITE}
            />
          </View>
          <Text style={styles.cardTitle}>Otentikasi Dua Faktor{'\n'}(2FA)</Text>
          <Text style={styles.cardDesc}>
            Tambahkan lapisan keamanan ekstra{'\n'}pada akun Anda dengan kode verifikasi{'\n'}dari perangkat seluler.
          </Text>
          <View style={styles.activeBadge}>
            <CircleCheckBig size={13} color={BLUE} />
            <Text style={styles.activeBadgeText}>AKTIF: GOOGLE AUTHENTICATOR</Text>
          </View>
        </View>

        {/* Connected Devices Card */}
        <View style={styles.card}>
          <View style={styles.deviceCardHeader}>
            <View>
              <Text style={styles.cardTitle}>Perangkat{'\n'}Terhubung</Text>
              <Text style={styles.cardDesc}>
                Kelola perangkat yang{'\n'}memiliki akses ke akun{'\n'}SmartNote Anda.
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.redText}>Keluar{'\n'}dari{'\n'}Semua{'\n'}Sesi</Text>
            </TouchableOpacity>
          </View>

          {/* Device Row 1 */}
          <View style={styles.deviceRow}>
            <View style={styles.deviceIconWrap}>
              <Laptop size={18} color={TEXT_SECONDARY} />
            </View>
            <View style={styles.deviceInfo}>
              <View style={styles.deviceNameRow}>
                <Text style={styles.deviceName}>MacBook Pro 14"</Text>
                <View style={styles.thisSessionBadge}>
                  <Text style={styles.thisSessionText}>SESI INI</Text>
                </View>
              </View>
              <Text style={styles.deviceMeta}>Jakarta, Indonesia • Safari{'\n'}di macOS Sonoma</Text>
            </View>
            <TouchableOpacity>
              <LogOut size={18} color={TEXT_SECONDARY} />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Device Row 2 */}
          <View style={styles.deviceRow}>
            <View style={styles.deviceIconWrap}>
              <Smartphone size={18} color={TEXT_SECONDARY} />
            </View>
            <View style={styles.deviceInfo}>
              <Text style={styles.deviceName}>iPhone 15 Pro</Text>
              <Text style={styles.deviceMeta}>Bandung, Indonesia •{'\n'}SmartNote App v2.4.1</Text>
            </View>
            <TouchableOpacity>
              <LogOut size={18} color={TEXT_SECONDARY} />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Device Row 3 */}
          <View style={styles.deviceRow}>
            <View style={styles.deviceIconWrap}>
              <Tablet size={18} color={TEXT_SECONDARY} />
            </View>
            <View style={styles.deviceInfo}>
              <Text style={styles.deviceName}>iPad Pro 12.9"</Text>
              <Text style={styles.deviceMeta}>Jakarta, Indonesia •{'\n'}SmartNote App v2.4.1</Text>
            </View>
            <TouchableOpacity>
              <LogOut size={18} color={TEXT_SECONDARY} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Activity Log */}
        <View style={styles.cardGray}>
          <View style={styles.iconWrapGray}>
            <Clock3 size={18} color={TEXT_SECONDARY} />
          </View>
          <Text style={styles.cardTitle}>Log Aktivitas</Text>
          <Text style={styles.cardDesc}>Lihat riwayat login dan perubahan keamanan akun Anda.</Text>
          <TouchableOpacity>
            <Text style={styles.smallLinkText}>LIHAT LOG</Text>
          </TouchableOpacity>
        </View>

        {/* Data Encryption */}
        <View style={styles.cardGray}>
          <View style={styles.iconWrapGray}>
            <Lock size={18} color={TEXT_SECONDARY} />
          </View>
          <Text style={styles.cardTitle}>Enkripsi Data</Text>
          <Text style={styles.cardDesc}>Aktifkan enkripsi end-to-end untuk catatan sensitif Anda.</Text>
          <TouchableOpacity>
            <Text style={styles.smallLinkText}>KONFIGURASI</Text>
          </TouchableOpacity>
        </View>

        {/* Login Notification */}
        <View style={styles.cardGray}>
          <View style={styles.iconWrapGray}>
            <Mail size={18} color={TEXT_SECONDARY} />
          </View>
          <Text style={styles.cardTitle}>Notifikasi Login</Text>
          <Text style={styles.cardDesc}>Dapatkan peringatan instan jika ada akses mencurigakan.</Text>
          <TouchableOpacity>
            <Text style={styles.smallLinkText}>ATUR NOTIFIKASI</Text>
          </TouchableOpacity>
        </View>

        {/* Help Section */}
        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>Butuh Bantuan?</Text>
          <Text style={styles.helpSubtitle}>
            Hubungi tim dukungan kami jika Anda menemukan aktivitas yang tidak sah.
          </Text>
          <View style={styles.helpButtons}>
            <TouchableOpacity style={styles.helpBtnOutline}>
              <Text style={styles.helpBtnOutlineText}>Pusat Bantuan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.helpBtnFill}>
              <Text style={styles.helpBtnFillText}>Kontak Support</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
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
    color: TEXT_PRIMARY,
  },
  headerAvatar: {},
  avatarCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
  },
  pageTitleSection: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  pageTitle: {
    fontSize: 38,
    fontWeight: '800',
    color: TEXT_PRIMARY,
    lineHeight: 44,
    marginBottom: 12,
  },
  pageSubtitle: {
    fontSize: 14,
    color: TEXT_SECONDARY,
    lineHeight: 20,
  },
  card: {
    backgroundColor: WHITE,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardGray: {
    backgroundColor: '#EFEFEF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 20,
  },
  cardRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconWrapBlue: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  iconWrapGray: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 13,
    color: TEXT_SECONDARY,
    lineHeight: 19,
    marginBottom: 12,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
    color: TEXT_BLUE,
    fontWeight: '600',
    marginRight: 2,
  },
  smallLinkText: {
    fontSize: 12,
    color: TEXT_BLUE,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F4FF',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    alignSelf: 'stretch',
    gap: 6,
  },
  activeBadgeText: {
    fontSize: 11,
    color: BLUE,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  deviceCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  redText: {
    color: RED,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'right',
    lineHeight: 18,
  },
  deviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 12,
  },
  deviceIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deviceInfo: {
    flex: 1,
  },
  deviceNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  deviceName: {
    fontSize: 14,
    fontWeight: '700',
    color: TEXT_PRIMARY,
  },
  thisSessionBadge: {
    backgroundColor: BLUE,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  thisSessionText: {
    fontSize: 9,
    color: WHITE,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  deviceMeta: {
    fontSize: 12,
    color: TEXT_SECONDARY,
    lineHeight: 16,
  },
  divider: {
    height: 1,
    backgroundColor: BORDER,
  },
  helpSection: {
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  helpTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    marginBottom: 6,
  },
  helpSubtitle: {
    fontSize: 13,
    color: TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  helpButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  helpBtnOutline: {
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    backgroundColor: WHITE,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  helpBtnOutlineText: {
    fontSize: 13,
    fontWeight: '600',
    color: TEXT_PRIMARY,
  },
  helpBtnFill: {
    borderRadius: 22,
    backgroundColor: '#1E3A5F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  helpBtnFillText: {
    fontSize: 13,
    fontWeight: '600',
    color: WHITE,
  },
});