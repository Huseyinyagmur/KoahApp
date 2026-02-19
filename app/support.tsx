import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import AppHeader from '@/components/AppHeader';
import Colors from '@/constants/colors';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    question: 'Egzersizleri ne sıklıkla yapmalıyım?',
    answer: 'Haftada en az 5 gün, günde 15-20 dakika egzersiz yapmanız önerilir. Ancak başlangıçta daha kısa sürelerle başlayıp yavaşça artırabilirsiniz.',
  },
  {
    question: 'Egzersiz sırasında nefes darlığı yaşarsam ne yapmalıyım?',
    answer: 'Hemen egzersizi durdurun, oturun ve büzük dudak nefes tekniğini uygulayın. Belirtiler geçmezse doktorunuza başvurun.',
  },
  {
    question: 'Hangi egzersizle başlamalıyım?',
    answer: 'Nefes egzersizleri ile başlamanız önerilir. Özellikle Büzük Dudak Nefesi en temel ve güvenli başlangıç egzersizidir.',
  },
  {
    question: 'İlaçlarımı kullanırken egzersiz yapabilir miyim?',
    answer: 'Evet, ilaçlarınızı düzenli kullanmaya devam edin. Bronkodilatör ilaçlarınızı egzersizden 15-20 dakika önce kullanmanız önerilir.',
  },
];

function FaqCard({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <Pressable style={styles.faqCard} onPress={onToggle}>
      <View style={styles.faqHeader}>
        <View style={styles.faqIconCircle}>
          <Ionicons name="help" size={16} color={Colors.header} />
        </View>
        <Text style={styles.faqQuestion}>{item.question}</Text>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={Colors.textSecondary}
        />
      </View>
      {isOpen && (
        <Text style={styles.faqAnswer}>{item.answer}</Text>
      )}
    </Pressable>
  );
}

export default function SupportScreen() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === 'web' ? 34 : insets.bottom;
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) {
      Alert.alert('Uyarı', 'Lütfen mesajınızı yazın.');
      return;
    }
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    Alert.alert('Gönderildi', 'Destek talebiniz alındı. En kısa sürede dönüş yapılacaktır.');
    setMessage('');
  };

  return (
    <View style={styles.screen}>
      <AppHeader title="Destek" onBack={() => router.back()} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPadding + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <View style={styles.supportIconCircle}>
            <Ionicons name="headset-outline" size={32} color={Colors.cardRed} />
          </View>
          <Text style={styles.pageTitle}>Yardıma mı ihtiyacınız var?</Text>
          <Text style={styles.pageSubtitle}>Sıkça sorulan sorulara göz atın veya bize mesaj gönderin.</Text>
        </View>

        <View style={styles.sectionTitleRow}>
          <Ionicons name="chatbubbles-outline" size={18} color={Colors.header} />
          <Text style={styles.sectionTitle}>Sık Sorulan Sorular</Text>
        </View>

        {FAQ_DATA.map((item, index) => (
          <FaqCard
            key={index}
            item={item}
            isOpen={openFaq === index}
            onToggle={() => setOpenFaq(openFaq === index ? null : index)}
          />
        ))}

        <View style={styles.sectionTitleRow}>
          <Ionicons name="mail-outline" size={18} color={Colors.header} />
          <Text style={styles.sectionTitle}>Mesaj Gönderin</Text>
        </View>

        <View style={styles.messageCard}>
          <TextInput
            style={styles.messageInput}
            placeholder="Sorununuzu veya önerinizi yazın..."
            placeholderTextColor={Colors.textSecondary}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={message}
            onChangeText={setMessage}
          />
          <Pressable
            style={({ pressed }) => [
              styles.sendBtn,
              { opacity: pressed ? 0.85 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] },
            ]}
            onPress={handleSend}
          >
            <Ionicons name="send" size={18} color={Colors.textWhite} />
            <Text style={styles.sendBtnText}>Gönder</Text>
          </Pressable>
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
  headerSection: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 8,
  },
  supportIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFEBEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  pageTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  pageSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
    marginTop: 8,
  },
  sectionTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 17,
    color: Colors.textPrimary,
  },
  faqCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  faqIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E0F2F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  faqQuestion: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: Colors.textPrimary,
    flex: 1,
  },
  faqAnswer: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginTop: 12,
    paddingLeft: 38,
  },
  messageCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  messageInput: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.divider,
    borderRadius: 12,
    padding: 14,
    minHeight: 100,
    marginBottom: 14,
  },
  sendBtn: {
    backgroundColor: Colors.header,
    paddingVertical: 14,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  sendBtnText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    color: Colors.textWhite,
  },
});
