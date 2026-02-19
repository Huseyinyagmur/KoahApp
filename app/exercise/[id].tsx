import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Modal,
  Platform,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import AppHeader from '@/components/AppHeader';
import Colors from '@/constants/colors';

interface ExerciseDetail {
  id: string;
  title: string;
  category: string;
  duration: string;
  bannerText: string;
  description: string;
}

const EXERCISE_DETAILS: Record<string, ExerciseDetail> = {
  '1': {
    id: '1',
    title: 'Nefes egzersizi I ( Oturarak )',
    category: 'Nefes',
    duration: '5 dk',
    bannerText: 'NEFES EGZERSİZİ - 1 - SABAH',
    description:
      'Bu egzersizi bir sandalyede oturarak yapabilirsiniz. Egzersizi 5 dakika süresince yapmanız tavsiye edilmektedir fakat başınız dönerse sonlandırınız.',
  },
  '2': {
    id: '2',
    title: 'Nefes egzersizi II ( Ayakta Olan )',
    category: 'Nefes',
    duration: '5 dk',
    bannerText: 'NEFES EGZERSİZİ - 2 - AKŞAM',
    description:
      'Bu egzersizi bir sandalyede oturarak yada ayakta yapabilirsiniz. Egzersizi 5 dakika süresince yapmanız tavsiye edilmektedir fakat başınız dönerse sonlandırınız.',
  },
  '3': {
    id: '3',
    title: 'Isınma Hareketleri I',
    category: 'Isınma',
    duration: '10 dk',
    bannerText: 'ISINMA HAREKETLERİ - 1 - SABAH',
    description:
      'Bu egzersizi ayakta yapmanız gerekmektedir. Hareketleri yavaşça ve kontrollü bir şekilde gerçekleştirin. 10 dakika süresince tekrarlayınız.',
  },
  '4': {
    id: '4',
    title: 'Isınma Hareketleri II',
    category: 'Isınma',
    duration: '8 dk',
    bannerText: 'ISINMA HAREKETLERİ - 2 - ÖĞLE',
    description:
      'Bu egzersiz serisini oturarak veya ayakta yapabilirsiniz. 8 dakika süresince yapmanız tavsiye edilmektedir.',
  },
  '5': {
    id: '5',
    title: 'Nefes egzersizi III ( Yatarak )',
    category: 'Nefes',
    duration: '7 dk',
    bannerText: 'NEFES EGZERSİZİ - 3 - GECE',
    description:
      'Bu egzersizi yatarak yapmanız gerekmektedir. Derin ve kontrollü nefes alıp verin. 7 dakika süresince yapmanız tavsiye edilmektedir.',
  },
};

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === 'web' ? 34 : insets.bottom;
  const [modalVisible, setModalVisible] = useState(false);

  const exercise = EXERCISE_DETAILS[id || '2'] || EXERCISE_DETAILS['2'];

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleOk = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.screen}>
      <AppHeader onBack={() => router.back()} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPadding + 80 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.banner}>
          <Text style={styles.bannerText}>{exercise.bannerText}</Text>
        </View>

        <View style={styles.videoPlaceholder}>
          <View style={styles.playCircle}>
            <Ionicons name="play" size={36} color={Colors.white} />
          </View>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.exerciseTitle}>{exercise.title}</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={16} color={Colors.header} />
              <Text style={styles.metaText}>{exercise.duration}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="fitness-outline" size={16} color={Colors.header} />
              <Text style={styles.metaText}>{exercise.category}</Text>
            </View>
          </View>

          <Text style={styles.description}>{exercise.description}</Text>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: bottomPadding + 12 }]}>
        <Pressable
          style={({ pressed }) => [
            styles.lastExerciseBtn,
            { opacity: pressed ? 0.88 : 1 },
          ]}
          onPress={() => {
            if (Platform.OS !== 'web') {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            }
          }}
        >
          <Ionicons name="checkmark-circle-outline" size={22} color={Colors.white} />
          <Text style={styles.lastExerciseBtnText}>Son Egzersiz</Text>
        </Pressable>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalIconCircle}>
              <Ionicons name="hand-right-outline" size={32} color={Colors.header} />
            </View>
            <Text style={styles.modalTitle}>Merhaba</Text>
            <Text style={styles.modalSubtitle}>Hazır mıyız ?</Text>
            <Pressable
              style={({ pressed }) => [
                styles.modalOkBtn,
                { opacity: pressed ? 0.85 : 1 },
              ]}
              onPress={handleOk}
            >
              <Text style={styles.modalOkText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    paddingBottom: 100,
  },
  banner: {
    backgroundColor: Colors.bannerGreen,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  bannerText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 15,
    color: Colors.textWhite,
    letterSpacing: 1,
  },
  videoPlaceholder: {
    height: 220,
    backgroundColor: '#263238',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  detailSection: {
    padding: 24,
  },
  exerciseTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: Colors.header,
  },
  description: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  lastExerciseBtn: {
    backgroundColor: Colors.coralButton,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  lastExerciseBtnText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 17,
    color: Colors.white,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.modalOverlay,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBox: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingVertical: 36,
    paddingHorizontal: 40,
    alignItems: 'center',
    width: '80%',
    maxWidth: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
  },
  modalIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E0F2F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  modalSubtitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 17,
    color: Colors.textSecondary,
    marginBottom: 28,
  },
  modalOkBtn: {
    backgroundColor: Colors.modalBlue,
    paddingHorizontal: 48,
    paddingVertical: 12,
    borderRadius: 24,
  },
  modalOkText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    color: Colors.white,
  },
});
