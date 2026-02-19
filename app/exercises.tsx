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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import AppHeader from '@/components/AppHeader';
import Colors from '@/constants/colors';
import { EXERCISES, CATEGORIES, CATEGORY_COLORS, Exercise } from '@/data/exercises';

const CATEGORY_ICONS: Record<string, { name: string; set: 'ion' | 'mat' }> = {
  'Tümü': { name: 'grid-outline', set: 'ion' },
  'Nefes': { name: 'lungs', set: 'mat' },
  'Güçlendirme': { name: 'barbell-outline', set: 'ion' },
  'Esneme': { name: 'body-outline', set: 'ion' },
  'Rahatlama': { name: 'leaf-outline', set: 'ion' },
};

function ExerciseCard({ item, onPress }: { item: Exercise; onPress: () => void }) {
  const catColor = CATEGORY_COLORS[item.category] || Colors.header;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.exerciseCard,
        { transform: [{ scale: pressed ? 0.98 : 1 }] },
      ]}
      onPress={onPress}
    >
      <View style={[styles.exerciseColorStrip, { backgroundColor: catColor }]} />
      <View style={[styles.exerciseImageBox, { backgroundColor: item.imagePlaceholderColor }]}>
        <MaterialCommunityIcons name="lungs" size={24} color={catColor} />
      </View>
      <View style={styles.exerciseInfo}>
        <Text style={styles.exerciseTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.exerciseMeta}>
          <View style={[styles.categoryBadge, { backgroundColor: catColor + '18' }]}>
            <Text style={[styles.categoryText, { color: catColor }]}>{item.category}</Text>
          </View>
          <View style={styles.durationRow}>
            <Ionicons name="time-outline" size={13} color={Colors.textSecondary} />
            <Text style={styles.durationText}>{item.duration}</Text>
          </View>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
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
      if (Math.random() < 0.1) {
        setError(true);
        setLoading(false);
        return;
      }
      setExercises(EXERCISES);
      setLoading(false);
    }, 2000);
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
          <View style={styles.errorIconCircle}>
            <Ionicons name="cloud-offline-outline" size={40} color={Colors.cardRed} />
          </View>
          <Text style={styles.errorTitle}>Bağlantı hatası oluştu</Text>
          <Text style={styles.stateText}>Veriler yüklenirken bir sorun oluştu</Text>
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
          <View style={styles.emptyIconCircle}>
            <Ionicons name="fitness-outline" size={40} color={Colors.textSecondary} />
          </View>
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
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <AppHeader title="Egzersiz Kütüphanesi" onBack={() => router.back()} />

      <View style={styles.filterScroll}>
        <FlatList
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.filterRow}
          renderItem={({ item: filter }) => {
            const isActive = activeFilter === filter;
            const iconInfo = CATEGORY_ICONS[filter] || { name: 'ellipse', set: 'ion' };
            const IconComp = iconInfo.set === 'mat' ? MaterialCommunityIcons : Ionicons;
            return (
              <Pressable
                style={[styles.filterBtn, isActive && styles.filterBtnActive]}
                onPress={() => handleFilterPress(filter)}
              >
                <IconComp
                  name={iconInfo.name as any}
                  size={16}
                  color={isActive ? Colors.textWhite : Colors.textSecondary}
                />
                <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                  {filter}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>

      {!loading && !error && (
        <View style={styles.countRow}>
          <Text style={styles.countText}>{filteredExercises.length} egzersiz bulundu</Text>
        </View>
      )}

      <View style={styles.listWrapper}>{renderContent()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  filterScroll: {
    paddingTop: 12,
  },
  filterRow: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: Colors.white,
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  filterBtnActive: {
    backgroundColor: Colors.filterActive,
    borderColor: Colors.filterActive,
  },
  filterText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: Colors.textSecondary,
  },
  filterTextActive: {
    color: Colors.textWhite,
  },
  countRow: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 4,
  },
  countText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    color: Colors.textSecondary,
  },
  listWrapper: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  exerciseCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingLeft: 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  exerciseColorStrip: {
    width: 4,
    height: '80%' as any,
    borderRadius: 2,
    marginRight: 12,
    marginLeft: 4,
  },
  exerciseImageBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseInfo: {
    flex: 1,
    marginLeft: 12,
  },
  exerciseTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  exerciseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  categoryText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
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
    gap: 10,
  },
  stateText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  errorIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FFEBEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  errorTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  emptyIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
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
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 28,
    gap: 8,
    marginTop: 8,
  },
  retryText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    color: Colors.textWhite,
  },
});
