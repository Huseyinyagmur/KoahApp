import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Modal,
  Alert,
  Platform,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import AppHeader from '@/components/AppHeader';
import Colors from '@/constants/colors';
import { EXERCISES, CATEGORY_COLORS } from '@/data/exercises';

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === 'web' ? 34 : insets.bottom;
  const [modalVisible, setModalVisible] = useState(false);

  const exercise = EXERCISES.find((e) => e.id === id) || EXERCISES[0];
  const catColor = CATEGORY_COLORS[exercise.category] || Colors.header;

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalVisible(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleOk = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setModalVisible(false);
  };

  const handleComplete = () => {
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    Alert.alert(
      'Tebrikler!',
      'Egzersizi başarıyla tamamladınız.',
      [{ text: 'Tamam', onPress: () => router.back() }]
    );
  };

  return (
    <View style={styles.screen}>
      <AppHeader title="Egzersiz Detayı" onBack={() => router.back()} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPadding + 90 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleSection}>
          <Text style={styles.exerciseTitle}>{exercise.title}</Text>
          <View style={styles.badgeRow}>
            <View style={[styles.categoryBadge, { backgroundColor: catColor + '18' }]}>
              <Text style={[styles.categoryText, { color: catColor }]}>{exercise.category}</Text>
            </View>
            <View style={styles.durationBadge}>
              <Ionicons name="time-outline" size={14} color={Colors.textSecondary} />
              <Text style={styles.durationText}>{exercise.duration}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.mainImageArea, { backgroundColor: exercise.imagePlaceholderColor }]}>
          <View style={styles.imageIconCircle}>
            <MaterialCommunityIcons name="lungs" size={48} color={catColor} />
          </View>
          <Text style={styles.imageLabel}>{exercise.category} Egzersizi</Text>
        </View>

        <View style={styles.stepsSection}>
          <View style={styles.stepsTitleRow}>
            <View style={styles.stepsTitleIconCircle}>
              <Ionicons name="list-outline" size={18} color={Colors.header} />
            </View>
            <Text style={styles.stepsTitle}>Nasıl Yapılır?</Text>
          </View>

          {exercise.steps.map((step, index) => (
            <View key={index} style={styles.stepItem}>
              <View style={[styles.stepNumber, { backgroundColor: catColor + '18' }]}>
                <Text style={[styles.stepNumberText, { color: catColor }]}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step.replace(/^\d+\.\s*/, '')}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: bottomPadding + 12 }]}>
        <Pressable
          style={({ pressed }) => [
            styles.completeBtn,
            { opacity: pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] },
          ]}
          onPress={handleComplete}
        >
          <Ionicons name="checkmark-circle" size={22} color={Colors.white} />
          <Text style={styles.completeBtnText}>Egzersizi Tamamla</Text>
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
              <Ionicons name="hand-right-outline" size={36} color={Colors.header} />
            </View>
            <Text style={styles.modalTitle}>Merhaba</Text>
            <Text style={styles.modalSubtitle}>Hazır mıyız ?</Text>
            <Text style={styles.modalDesc}>
              Egzersizi rahat bir ortamda, kendinizi zorlamadan yapın.
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.modalOkBtn,
                { opacity: pressed ? 0.85 : 1, transform: [{ scale: pressed ? 0.97 : 1 }] },
              ]}
              onPress={handleOk}
            >
              <Text style={styles.modalOkText}>Başlayalım</Text>
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
  titleSection: {
    padding: 20,
    paddingBottom: 12,
  },
  exerciseTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 22,
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  categoryBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
  },
  categoryText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  durationText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    color: Colors.textSecondary,
  },
  mainImageArea: {
    marginHorizontal: 20,
    height: 200,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  imageIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  imageLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: 'rgba(0,0,0,0.4)',
  },
  stepsSection: {
    padding: 20,
    paddingTop: 24,
  },
  stepsTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 18,
  },
  stepsTitleIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E0F2F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepsTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: Colors.textPrimary,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
    gap: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  stepNumberText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 13,
  },
  stepText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: Colors.textPrimary,
    lineHeight: 22,
    flex: 1,
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
  completeBtn: {
    backgroundColor: Colors.completeButton,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  completeBtnText: {
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
    borderRadius: 24,
    paddingVertical: 36,
    paddingHorizontal: 32,
    alignItems: 'center',
    width: '82%',
    maxWidth: 340,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
  },
  modalIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#E0F2F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  modalTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 26,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  modalSubtitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  modalDesc: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  modalOkBtn: {
    backgroundColor: Colors.modalBlue,
    paddingHorizontal: 48,
    paddingVertical: 14,
    borderRadius: 28,
  },
  modalOkText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    color: Colors.white,
  },
});
