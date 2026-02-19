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

interface NavCard {
  icon: string;
  iconSet: 'ionicons' | 'material';
  title: string;
  subtitle: string;
  bgColor: string;
  onPress: () => void;
}

function DashboardCard({ card }: { card: NavCard }) {
  const handlePress = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    card.onPress();
  };

  const IconComp = card.iconSet === 'material' ? MaterialCommunityIcons : Ionicons;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: card.bgColor, transform: [{ scale: pressed ? 0.96 : 1 }] },
      ]}
      onPress={handlePress}
    >
      <View style={styles.cardIconBg}>
        <IconComp name={card.icon as any} size={32} color={Colors.textWhite} />
      </View>
      <Text style={styles.cardTitle}>{card.title}</Text>
      <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
    </Pressable>
  );
}

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === 'web' ? 34 : insets.bottom;

  const cards: NavCard[] = [
    {
      icon: 'lungs',
      iconSet: 'material',
      title: 'Egzersizler',
      subtitle: '15 egzersiz mevcut',
      bgColor: Colors.cardTurquoise,
      onPress: () => router.push('/exercises'),
    },
    {
      icon: 'book-outline',
      iconSet: 'ionicons',
      title: 'Blog Yazıları',
      subtitle: 'Sağlık ipuçları',
      bgColor: Colors.cardGreen,
      onPress: () => router.push('/blogs'),
    },
    {
      icon: 'person-outline',
      iconSet: 'ionicons',
      title: 'Profil',
      subtitle: 'İlerleme ve istatistikler',
      bgColor: Colors.cardOrange,
      onPress: () => router.push('/profile'),
    },
    {
      icon: 'headset-outline',
      iconSet: 'ionicons',
      title: 'Destek Talepleri',
      subtitle: 'Yardım alın',
      bgColor: Colors.cardRed,
      onPress: () => router.push('/support'),
    },
  ];

  return (
    <View style={styles.screen}>
      <AppHeader title="Kontrol Merkezi" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPadding + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.greetingSection}>
          <Text style={styles.greetingText}>Merhaba,</Text>
          <Text style={styles.greetingSubtext}>Bugün hangi egzersizi yapmak istersiniz?</Text>
        </View>

        <View style={styles.grid}>
          {cards.map((card, index) => (
            <DashboardCard key={index} card={card} />
          ))}
        </View>

        <View style={styles.tipCard}>
          <View style={styles.tipIconCircle}>
            <Ionicons name="bulb-outline" size={20} color={Colors.cardOrange} />
          </View>
          <View style={styles.tipTextWrap}>
            <Text style={styles.tipTitle}>Günün İpucu</Text>
            <Text style={styles.tipBody}>
              Egzersizlerinizi her gün aynı saatte yapmaya çalışın. Düzenli rutin, ilerlemenizi hızlandırır.
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
  greetingSection: {
    marginBottom: 24,
  },
  greetingText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 26,
    color: Colors.textPrimary,
  },
  greetingSubtext: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 14,
    marginBottom: 24,
  },
  card: {
    width: '47%' as any,
    borderRadius: 18,
    padding: 20,
    minHeight: 160,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  cardIconBg: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  cardTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    color: Colors.textWhite,
    textAlign: 'center',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  tipCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  tipIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  tipTextWrap: {
    flex: 1,
  },
  tipTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  tipBody: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});
