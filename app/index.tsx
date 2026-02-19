import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Colors from '@/constants/colors';

export default function WelcomeInfoScreen() {
  const insets = useSafeAreaInsets();
  const topPadding = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPadding = Platform.OS === 'web' ? 34 : insets.bottom;

  const handleContinue = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    router.replace('/dashboard');
  };

  return (
    <LinearGradient
      colors={['#00897B', '#00695C', '#004D40']}
      style={styles.gradient}
    >
      <View style={[styles.container, { paddingTop: topPadding + 40, paddingBottom: bottomPadding + 20 }]}>
        <View style={styles.topSection}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="lungs" size={48} color={Colors.header} />
          </View>

          <Text style={styles.welcomeTitle}>Hoş Geldiniz</Text>
          <Text style={styles.appName}>KOAH EGZERSİZ</Text>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Ionicons name="heart" size={16} color="rgba(255,255,255,0.5)" />
            <View style={styles.dividerLine} />
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoText}>
            Daha rahat nefes almak ve yaşam kalitenizi artırmak için özel olarak hazırlanan egzersiz programınıza hoş geldiniz.
          </Text>
          <Text style={styles.infoText}>
            Bu uygulama, KOAH hastalarına yönelik nefes egzersizleri, güçlendirme hareketleri, esneme ve rahatlama teknikleri sunar.
          </Text>
          <Text style={styles.infoTextHighlight}>
            Düzenli egzersiz, nefes kalitenizi iyileştirir ve günlük aktivitelerinizi kolaylaştırır.
          </Text>
        </View>

        <View style={styles.featureRow}>
          <FeatureItem icon="fitness-outline" label="Egzersizler" />
          <FeatureItem icon="pulse-outline" label="Nefes" />
          <FeatureItem icon="leaf-outline" label="Rahatlama" />
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.continueBtn,
            { opacity: pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] },
          ]}
          onPress={handleContinue}
        >
          <Text style={styles.continueBtnText}>Kontrol Merkezine Git</Text>
          <Ionicons name="arrow-forward" size={20} color={Colors.textWhite} />
        </Pressable>
      </View>
    </LinearGradient>
  );
}

function FeatureItem({ icon, label }: { icon: string; label: string }) {
  return (
    <View style={styles.featureItem}>
      <View style={styles.featureIconCircle}>
        <Ionicons name={icon as any} size={22} color={Colors.textWhite} />
      </View>
      <Text style={styles.featureLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: 'space-between',
  },
  topSection: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.textWhite,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  welcomeTitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  appName: {
    fontFamily: 'Inter_700Bold',
    fontSize: 32,
    color: Colors.textWhite,
    letterSpacing: 1,
    marginBottom: 16,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dividerLine: {
    width: 40,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  infoSection: {
    gap: 14,
  },
  infoText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 24,
    textAlign: 'center',
  },
  infoTextHighlight: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    color: Colors.textWhite,
    lineHeight: 24,
    textAlign: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
  },
  featureItem: {
    alignItems: 'center',
    gap: 8,
  },
  featureIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  continueBtn: {
    backgroundColor: Colors.welcomeAccent,
    paddingVertical: 18,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  continueBtnText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 17,
    color: Colors.textWhite,
  },
});
