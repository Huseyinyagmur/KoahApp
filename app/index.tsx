import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import AppHeader from '@/components/AppHeader';
import Colors from '@/constants/colors';

interface StatCard {
  count: number;
  label: string;
  actionLabel: string;
  bgColor: string;
  darkColor: string;
  icon: string;
  iconSet: 'ionicons' | 'material';
  onPress?: () => void;
}

function DashboardCard({ card }: { card: StatCard }) {
  const handlePress = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    card.onPress?.();
  };

  const IconComponent = card.iconSet === 'material' ? MaterialCommunityIcons : Ionicons;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: card.bgColor, opacity: pressed ? 0.92 : 1 },
      ]}
      onPress={handlePress}
    >
      <View style={styles.cardIconRow}>
        <IconComponent name={card.icon as any} size={28} color="rgba(255,255,255,0.5)" />
      </View>
      <Text style={styles.cardCount}>{card.count}</Text>
      <Text style={styles.cardLabel}>{card.label}</Text>
      <View style={[styles.cardAction, { backgroundColor: card.darkColor }]}>
        <Text style={styles.cardActionText}>{card.actionLabel}</Text>
        <Ionicons name="arrow-forward" size={14} color={Colors.textWhite} />
      </View>
    </Pressable>
  );
}

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === 'web' ? 34 : insets.bottom;

  const cards: StatCard[] = [
    {
      count: 14,
      label: 'Toplam Eğitim Videosu',
      actionLabel: 'Yeni Video Ekle',
      bgColor: Colors.cardBlue,
      darkColor: Colors.cardBlueDark,
      icon: 'videocam',
      iconSet: 'ionicons',
      onPress: () => router.push('/exercises'),
    },
    {
      count: 1,
      label: 'Blog Yazısı',
      actionLabel: 'Yeni Blog Yazısı Ekle',
      bgColor: Colors.cardGreen,
      darkColor: Colors.cardGreenDark,
      icon: 'document-text',
      iconSet: 'ionicons',
    },
    {
      count: 0,
      label: 'Kullanıcılar',
      actionLabel: 'Yeni Kullanıcı Ekle',
      bgColor: Colors.cardOrange,
      darkColor: Colors.cardOrangeDark,
      icon: 'people',
      iconSet: 'ionicons',
    },
    {
      count: 0,
      label: 'Destek Talepleri',
      actionLabel: 'Talepleri Listele',
      bgColor: Colors.cardRed,
      darkColor: Colors.cardRedDark,
      icon: 'headset',
      iconSet: 'material',
    },
  ];

  return (
    <View style={styles.screen}>
      <AppHeader />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPadding + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Kontrol Paneli</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.grid}>
          {cards.map((card, index) => (
            <DashboardCard key={index} card={card} />
          ))}
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
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 22,
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  divider: {
    height: 2,
    backgroundColor: Colors.divider,
    borderRadius: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 14,
  },
  card: {
    width: '47%' as any,
    borderRadius: 14,
    overflow: 'hidden',
    paddingTop: 16,
    paddingHorizontal: 14,
    minHeight: 170,
    justifyContent: 'space-between',
  },
  cardIconRow: {
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  cardCount: {
    fontFamily: 'Inter_700Bold',
    fontSize: 40,
    color: Colors.textWhite,
    textAlign: 'center',
  },
  cardLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    color: Colors.textWhite,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 18,
  },
  cardAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginHorizontal: -14,
    marginBottom: 0,
    gap: 6,
  },
  cardActionText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: Colors.textWhite,
  },
});
