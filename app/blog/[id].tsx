import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from '@/components/AppHeader';
import Colors from '@/constants/colors';
import { BLOG_POSTS } from '@/data/blogs';

export default function BlogDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === 'web' ? 34 : insets.bottom;

  const post = BLOG_POSTS.find((p) => p.id === id) || BLOG_POSTS[0];
  const paragraphs = post.content.split('\n\n');

  return (
    <View style={styles.screen}>
      <AppHeader title="Makale Detayı" onBack={() => router.back()} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPadding + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.headerBanner, { backgroundColor: post.iconColor + '14' }]}>
          <View style={[styles.bannerIconCircle, { backgroundColor: post.iconColor + '24' }]}>
            <Ionicons name="document-text" size={28} color={post.iconColor} />
          </View>
          <View style={[styles.categoryTag, { backgroundColor: post.iconColor }]}>
            <Text style={styles.categoryTagText}>{post.category}</Text>
          </View>
        </View>

        <View style={styles.articleSection}>
          <Text style={styles.articleTitle}>{post.title}</Text>

          <View style={styles.authorRow}>
            <View style={styles.authorAvatar}>
              <Ionicons name="person" size={16} color={Colors.textWhite} />
            </View>
            <View>
              <Text style={styles.authorName}>{post.author}</Text>
              <View style={styles.authorMeta}>
                <Text style={styles.authorMetaText}>{post.date}</Text>
                <View style={styles.dot} />
                <Text style={styles.authorMetaText}>{post.readTime} okuma</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          {paragraphs.map((paragraph, index) => (
            <Text key={index} style={styles.paragraph}>{paragraph}</Text>
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
  content: {},
  headerBanner: {
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  categoryTag: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 12,
  },
  categoryTagText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: Colors.textWhite,
  },
  articleSection: {
    padding: 20,
  },
  articleTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 22,
    color: Colors.textPrimary,
    lineHeight: 30,
    marginBottom: 18,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 18,
  },
  authorAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.header,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authorName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: Colors.textPrimary,
  },
  authorMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  authorMetaText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: Colors.textSecondary,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginBottom: 20,
  },
  paragraph: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: Colors.textPrimary,
    lineHeight: 24,
    marginBottom: 16,
  },
});
