import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import AppHeader from '@/components/AppHeader';
import Colors from '@/constants/colors';
import { BLOG_POSTS, BlogPost } from '@/data/blogs';

function BlogCard({ item, onPress }: { item: BlogPost; onPress: () => void }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.blogCard,
        { transform: [{ scale: pressed ? 0.98 : 1 }] },
      ]}
      onPress={onPress}
    >
      <View style={[styles.iconCircle, { backgroundColor: item.iconColor + '18' }]}>
        <Ionicons name="document-text" size={22} color={item.iconColor} />
      </View>
      <View style={styles.blogInfo}>
        <Text style={styles.blogTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.blogSummary} numberOfLines={2}>{item.summary}</Text>
        <View style={styles.blogMeta}>
          <View style={[styles.catBadge, { backgroundColor: item.iconColor + '14' }]}>
            <Text style={[styles.catBadgeText, { color: item.iconColor }]}>{item.category}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={12} color={Colors.textSecondary} />
            <Text style={styles.metaText}>{item.readTime}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={12} color={Colors.textSecondary} />
            <Text style={styles.metaText}>{item.date}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default function BlogListScreen() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === 'web' ? 34 : insets.bottom;

  const handlePress = (id: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push({ pathname: '/blog/[id]', params: { id } });
  };

  return (
    <View style={styles.screen}>
      <AppHeader title="Blog Yazıları" onBack={() => router.back()} />

      <View style={styles.headerSection}>
        <Text style={styles.pageTitle}>Sağlık Rehberi</Text>
        <Text style={styles.pageSubtitle}>{BLOG_POSTS.length} makale mevcut</Text>
      </View>

      <FlatList
        data={BLOG_POSTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BlogCard item={item} onPress={() => handlePress(item.id)} />
        )}
        contentContainerStyle={[styles.listContent, { paddingBottom: bottomPadding + 16 }]}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  pageTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 22,
    color: Colors.textPrimary,
  },
  pageSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  listContent: {
    padding: 16,
  },
  blogCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  blogInfo: {
    flex: 1,
  },
  blogTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  blogSummary: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
    marginBottom: 10,
  },
  blogMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  catBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  catBadgeText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    color: Colors.textSecondary,
  },
});
