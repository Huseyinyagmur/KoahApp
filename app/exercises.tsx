import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import AppHeader from '@/components/AppHeader';
import Colors from '@/constants/colors';

interface Exercise {
  id: string;
  title: string;
  category: string;
  duration: string;
  imageUri: string;
}

const MOCK_DATA: Exercise[] = [
  {
    id: '1',
    title: 'Nefes Egzersizi I (Oturarak)',
    category: 'Nefes',
    duration: '5 dk',
    imageUri: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
  },
  {
    id: '2',
    title: 'Nefes Egzersizi II (Ayakta)',
    category: 'Nefes',
    duration: '5 dk',
    imageUri: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
  },
  {
    id: '3',
    title: 'Isınma Hareketleri I',
    category: 'Isınma',
    duration: '10 dk',
    imageUri: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400',
  },
  {
    id: '4',
    title: 'Isınma Hareketleri II',
    category: 'Isınma',
    duration: '8 dk',
    imageUri: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400',
  },
  {
    id: '5',
    title: 'Nefes Egzersizi III (Yatarak)',
    category: 'Nefes',
    duration: '7 dk',
    imageUri: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
  },
];

const FILTERS = ['Tümü', 'Nefes', 'Isınma'];

function ExerciseCard({ item, onPress }: { item: Exercise; onPress: () => void }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.exerciseCard, { opacity: pressed ? 0.9 : 1 }]}
      onPress={onPress}
    >
      <View style={styles.exerciseImagePlaceholder}>
        <Ionicons name="play-circle" size={36} color={Colors.header} />
      </View>
      <View style={styles.exerciseInfo}>
        <Text style={styles.exerciseTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.exerciseMeta}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <View style={styles.durationRow}>
            <Ionicons name="time-outline" size={14} color={Colors.textSecondary} />
            <Text style={styles.durationText}>{item.duration}</Text>
          </View>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
    </Pressable>
  );
}

export default function ExerciseListScreen() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === 'web' ? 34 : insets.bottom;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Tümü');
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const loadData = useCallback(() => {
    setLoading(true);
    setError(false);
    setTimeout(() => {
      const shouldError = Math.random() < 0.2;
      if (shouldError) {
        setError(true);
        setLoading(false);
        return;
      }
      setExercises(MOCK_DATA);
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredExercises =
    activeFilter === 'Tümü'
      ? exercises
      : exercises.filter((e) => e.category === activeFilter);

  const handleCardPress = (id: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push({ pathname: '/exercise/[id]', params: { id } });
  };

  const handleFilterPress = (filter: string) => {
    if (Platform.OS !== 'web') {
      Haptics.selectionAsync();
    }
    setActiveFilter(filter);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.centerState}>
          <ActivityIndicator size="large" color={Colors.header} />
          <Text style={styles.stateText}>Egzersizler yükleniyor...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerState}>
          <Ionicons name="cloud-offline-outline" size={56} color={Colors.cardRed} />
          <Text style={styles.errorTitle}>Bağlantı hatası oluştu</Text>
          <Text style={styles.stateText}>Lütfen tekrar deneyin</Text>
          <Pressable
            style={({ pressed }) => [styles.retryBtn, { opacity: pressed ? 0.85 : 1 }]}
            onPress={loadData}
          >
            <Ionicons name="refresh" size={18} color={Colors.textWhite} />
            <Text style={styles.retryText}>Tekrar Dene</Text>
          </Pressable>
        </View>
      );
    }

    if (filteredExercises.length === 0) {
      return (
        <View style={styles.centerState}>
          <Ionicons name="fitness-outline" size={56} color={Colors.textSecondary} />
          <Text style={styles.emptyTitle}>Bu kategoride henüz egzersiz bulunmuyor.</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={filteredExercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExerciseCard item={item} onPress={() => handleCardPress(item.id)} />
        )}
        contentContainerStyle={[styles.listContent, { paddingBottom: bottomPadding + 16 }]}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <AppHeader onBack={() => router.back()} />

      <View style={styles.filterRow}>
        {FILTERS.map((filter) => (
          <Pressable
            key={filter}
            style={[
              styles.filterBtn,
              activeFilter === filter && styles.filterBtnActive,
            ]}
            onPress={() => handleFilterPress(filter)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter && styles.filterTextActive,
              ]}
            >
              {filter}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.listWrapper}>{renderContent()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    gap: 10,
  },
  filterBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: Colors.filterInactive,
  },
  filterBtnActive: {
    backgroundColor: Colors.filterActive,
  },
  filterText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  filterTextActive: {
    color: Colors.textWhite,
  },
  listWrapper: {
    flex: 1,
  },
  listContent: {
    padding: 20,
  },
  separator: {
    height: 12,
  },
  exerciseCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  exerciseImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#E0F2F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseInfo: {
    flex: 1,
    marginLeft: 14,
  },
  exerciseTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  exerciseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  categoryBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  categoryText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    color: Colors.cardGreen,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  durationText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: Colors.textSecondary,
  },
  centerState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: 12,
  },
  stateText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  errorTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 17,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  emptyTitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  retryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.header,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
    marginTop: 8,
  },
  retryText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: Colors.textWhite,
  },
});
