import React from 'react';
import { View, Text, StyleSheet, Platform, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/colors';

interface AppHeaderProps {
  title?: string;
  onBack?: () => void;
}

export default function AppHeader({ title = 'KOAH KONTROL MERKEZİ', onBack }: AppHeaderProps) {
  const insets = useSafeAreaInsets();
  const topPadding = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <View style={[styles.container, { paddingTop: topPadding }]}>
      <View style={styles.inner}>
        {onBack ? (
          <Pressable onPress={onBack} style={styles.backBtn} hitSlop={10}>
            <Ionicons name="chevron-back" size={24} color={Colors.textWhite} />
          </Pressable>
        ) : (
          <View style={styles.backBtn} />
        )}

        <Text style={styles.title} numberOfLines={1}>{title}</Text>

        <View style={styles.rightIcons}>
          <Pressable style={styles.iconBtn} hitSlop={8}>
            <Ionicons name="notifications-outline" size={22} color={Colors.textWhite} />
          </Pressable>
          <Pressable style={styles.iconBtn} hitSlop={8}>
            <Ionicons name="person-circle-outline" size={24} color={Colors.textWhite} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.header,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  inner: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 17,
    color: Colors.textWhite,
    letterSpacing: 0.5,
    flex: 1,
    textAlign: 'center',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
