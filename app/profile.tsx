import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AppHeader from '@/components/AppHeader';
import Colors from '@/constants/colors';

interface StatItem {
  icon: string;
  iconSet: 'ionicons' | 'material';
  label: string;
  value: string;
  color: string;
}

function ProgressBar({ progress, color }: { progress: number; color: string }) {
  return (
    <View style={styles.progressBarBg}>
      <View style={[styles.progressBarFill, { width: `${progress}%` as any, backgroundColor: color }]} />
    </View>
  );
}

function StatCard({ item }: { item: StatItem }) {
  const IconComp = item.iconSet === 'material' ? MaterialCommunityIcons : Ionicons;
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIconCircle, { backgroundColor: item.color + '18' }]}>
        <IconComp name={item.icon as any} size={22} color={item.color} />
      </View>
      <Text style={styles.statValue}>{item.value}</Text>
      <Text style={styles.statLabel}>{item.label}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === 'web' ? 34 : insets.bottom;

  const completionPercent = 40;

  const stats: StatItem[] = [
    {
      icon: 'checkmark-done',
      iconSet: 'ionicons',
      label: 'Tamamlanan Egzersiz',
      value: '6',
      color: Colors.cardGreen,
    },
    {
      icon: 'flame',
      iconSet: 'ionicons',
      label: 'Seri Günü',
      value: '3',
      color: Colors.cardOrange,
    },
    {
      icon: 'time-outline',
      iconSet: 'ionicons',
      label: 'Toplam Süre',
      value: '45 dk',
      color: Colors.cardTurquoise,
    },
    {
      icon: 'star',
      iconSet: 'ionicons',
      label: 'En İyi Seri',
      value: '7 gün',
      color: '#AB47BC',
    },
  ];

  return (
    <View style={styles.screen}>
      <AppHeader title="Profil" onBack={() => router.back()} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPadding + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={40} color={Colors.textWhite} />
          </View>
          <Text style={styles.userName}>Kullanıcı</Text>
          <Text style={styles.userSubtext}>KOAH Egzersiz Programı</Text>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressTitleRow}>
            <Text style={styles.progressTitle}>Egzersiz İlerlemeniz</Text>
            <Text style={[styles.progressPercent, { color: Colors.header }]}>{completionPercent}%</Text>
          </View>
          <ProgressBar progress={completionPercent} color={Colors.header} />
          <Text style={styles.progressSubtext}>15 egzersizden 6 tanesini tamamladınız</Text>
        </View>

        <View style={styles.sectionTitleRow}>
          <View style={styles.sectionIconCircle}>
            <Ionicons name="stats-chart" size={16} color={Colors.header} />
          </View>
          <Text style={styles.sectionTitle}>İstatistikler</Text>
        </View>

        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <StatCard key={index} item={stat} />
          ))}
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoIconCircle}>
            <Ionicons name="information-circle-outline" size={20} color={Colors.cardTurquoise} />
          </View>
          <View style={styles.infoTextWrap}>
            <Text style={styles.infoTitle}>Hedefiniz</Text>
            <Text style={styles.infoBody}>
              Haftada en az 5 gün egzersiz yaparak akciğer kapasitenizi artırın. Düzenli egzersiz, KOAH semptomlarını hafifletir.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.header,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  userName: {
    fontFamily: 'Inter_700Bold',
    fontSize: 22,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  userSubtext: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  progressSection: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  progressTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: Colors.textPrimary,
  },
  progressPercent: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
  },
  progressBarBg: {
    height: 10,
    backgroundColor: '#E8ECEF',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBarFill: {
    height: '100%' as any,
    borderRadius: 5,
  },
  progressSubtext: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.textSecondary,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  sectionIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E0F2F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 17,
    color: Colors.textPrimary,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    width: '47%' as any,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  statLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0F7FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  infoTextWrap: {
    flex: 1,
  },
  infoTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  infoBody: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});
