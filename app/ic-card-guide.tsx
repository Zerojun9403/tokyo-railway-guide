import { useAppTheme } from "@/hooks/useAppTheme";
import { useRouter } from "expo-router";
import {
  ChevronLeft,
  CircleAlert,
  CreditCard,
  Info,
  MapPin,
  Smartphone,
  WalletCards,
} from "lucide-react-native";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type IcCard = {
  name: string;
  area: string;
  description: string;
};

const mutualCards: IcCard[] = [
  {
    name: "Kitaca",
    area: "홋카이도",
    description: "JR홋카이도",
  },
  {
    name: "Suica",
    area: "도쿄 · 수도권",
    description: "JR동일본",
  },
  {
    name: "PASMO",
    area: "도쿄 · 수도권",
    description: "사철 · 지하철",
  },
  {
    name: "TOICA",
    area: "도카이",
    description: "JR도카이",
  },
  {
    name: "manaca",
    area: "나고야",
    description: "나고야 지역",
  },
  {
    name: "ICOCA",
    area: "간사이",
    description: "JR서일본",
  },
  {
    name: "PiTaPa",
    area: "간사이",
    description: "간사이 사철",
  },
  {
    name: "SUGOCA",
    area: "규슈",
    description: "JR규슈",
  },
  {
    name: "nimoca",
    area: "규슈",
    description: "서일본철도 등",
  },
  {
    name: "하야카켄",
    area: "후쿠오카",
    description: "후쿠오카시 지하철",
  },
];

const IcCardGuideScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.screen,
        {
          backgroundColor: colors.background,
          paddingTop: insets.top,
        },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          {
            paddingBottom: Math.max(insets.bottom, 12) + 110,
          },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.pressed,
            ]}
          >
            <ChevronLeft
              size={25}
              color={colors.text}
              strokeWidth={1.8}
            />
          </Pressable>

          <Text style={[styles.headerTitle, { color: colors.text }]}>
            IC카드 이용 가이드
          </Text>
        </View>

        {/* Intro */}
        <View style={styles.intro}>
          <View style={styles.introIcon}>
            <CreditCard
              size={22}
              color={colors.text}
              strokeWidth={1.7}
            />
          </View>

          <View style={styles.introContent}>
            <Text style={[styles.introTitle, { color: colors.text }]}>
              일본 교통카드, 어렵지 않아요
            </Text>

            <Text
              style={[
                styles.introDescription,
                { color: colors.textSecondary },
              ]}
            >
              IC카드를 충전해 두면 매번 승차권을 구입하지 않고 개찰구에
              터치하는 것만으로 철도와 버스를 이용할 수 있습니다.
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.sectionDivider,
            { backgroundColor: colors.border },
          ]}
        />

        {/* Tokyo cards */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.textSecondary },
            ]}
          >
            도쿄에서 어떤 카드를 사용하면 될까요?
          </Text>

          <View style={styles.cardRow}>
            <View style={styles.rowIcon}>
              <CreditCard
                size={19}
                color={colors.text}
                strokeWidth={1.7}
              />
            </View>

            <View style={styles.rowContent}>
              <Text style={[styles.rowTitle, { color: colors.text }]}>
                Suica
              </Text>

              <Text
                style={[
                  styles.rowDescription,
                  { color: colors.textSecondary },
                ]}
              >
                JR동일본의 대표적인 교통계 IC카드입니다. 수도권의 JR,
                지하철, 사철, 버스 등에서 폭넓게 사용할 수 있습니다.
              </Text>
            </View>
          </View>

          <View style={styles.cardRow}>
            <View style={styles.rowIcon}>
              <CreditCard
                size={19}
                color={colors.text}
                strokeWidth={1.7}
              />
            </View>

            <View style={styles.rowContent}>
              <Text style={[styles.rowTitle, { color: colors.text }]}>
                PASMO
              </Text>

              <Text
                style={[
                  styles.rowDescription,
                  { color: colors.textSecondary },
                ]}
              >
                도쿄의 지하철과 사철을 중심으로 사용하는 IC카드입니다.
                여행자가 일반적으로 이용하는 대부분의 수도권 교통에서는
                Suica와 거의 동일하게 사용할 수 있습니다.
              </Text>
            </View>
          </View>

          <View style={styles.cardRow}>
            <View style={styles.rowIcon}>
              <WalletCards
                size={19}
                color={colors.text}
                strokeWidth={1.7}
              />
            </View>

            <View style={styles.rowContent}>
              <Text style={[styles.rowTitle, { color: colors.text }]}>
                Welcome Suica
              </Text>

              <Text
                style={[
                  styles.rowDescription,
                  { color: colors.textSecondary },
                ]}
              >
                일본을 방문한 여행객에게 편리한 Suica입니다. 카드 구입일부터
                28일 동안 사용할 수 있으며 구입 시 500엔의 예치금이
                필요하지 않습니다.
              </Text>

              <Text style={styles.highlightText}>
                구입일부터 28일간 사용
              </Text>
            </View>
          </View>

          <View style={styles.cardRow}>
            <View style={styles.rowIcon}>
              <WalletCards
                size={19}
                color={colors.text}
                strokeWidth={1.7}
              />
            </View>

            <View style={styles.rowContent}>
              <Text style={[styles.rowTitle, { color: colors.text }]}>
                TOURIST PASMO
              </Text>

              <Text
                style={[
                  styles.rowDescription,
                  { color: colors.textSecondary },
                ]}
              >
                일본을 방문하는 외국인 여행객을 위한 PASMO입니다. 여행객이
                도쿄와 수도권에서 사용할 수 있도록 마련된 관광객용
                IC카드입니다.
              </Text>
            </View>
          </View>

          <View style={styles.cardRow}>
            <View style={styles.rowIcon}>
              <Smartphone
                size={19}
                color={colors.text}
                strokeWidth={1.7}
              />
            </View>

            <View style={styles.rowContent}>
              <Text style={[styles.rowTitle, { color: colors.text }]}>
                모바일 IC카드
              </Text>

              <Text
                style={[
                  styles.rowDescription,
                  { color: colors.textSecondary },
                ]}
              >
                지원되는 스마트폰에서는 실물 카드 대신 모바일 Suica 등
                모바일 교통카드를 이용할 수도 있습니다.
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.sectionDivider,
            { backgroundColor: colors.border },
          ]}
        />

        {/* Existing card */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.textSecondary },
            ]}
          >
            이미 일본 IC카드를 가지고 있나요?
          </Text>

          <View style={styles.existingIntro}>
            <MapPin
              size={20}
              color={colors.text}
              strokeWidth={1.7}
            />

            <View style={styles.existingContent}>
              <Text style={[styles.existingTitle, { color: colors.text }]}>
                새 Suica를 살 필요가 없을 수도 있어요
              </Text>

              <Text
                style={[
                  styles.existingDescription,
                  { color: colors.textSecondary },
                ]}
              >
                오사카에서 사용하던 ICOCA처럼 전국 상호이용 대상 IC카드를
                가지고 있다면 도쿄의 Suica·PASMO 대응 철도와 버스에서도
                대부분 그대로 사용할 수 있습니다.
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.exampleArea,
              {
                borderTopColor: colors.border,
                borderBottomColor: colors.border,
              },
            ]}
          >
            <View style={styles.exampleRow}>
              <Text style={[styles.exampleName, { color: colors.text }]}>
                ICOCA
              </Text>

              <Text
                style={[
                  styles.exampleDescription,
                  { color: colors.textSecondary },
                ]}
              >
                오사카 · 교토
              </Text>

              <Text style={styles.availableText}>도쿄 사용 가능</Text>
            </View>

            <View style={styles.exampleRow}>
              <Text style={[styles.exampleName, { color: colors.text }]}>
                TOICA
              </Text>

              <Text
                style={[
                  styles.exampleDescription,
                  { color: colors.textSecondary },
                ]}
              >
                나고야 · 도카이
              </Text>

              <Text style={styles.availableText}>도쿄 사용 가능</Text>
            </View>

            <View style={styles.exampleRow}>
              <Text style={[styles.exampleName, { color: colors.text }]}>
                SUGOCA
              </Text>

              <Text
                style={[
                  styles.exampleDescription,
                  { color: colors.textSecondary },
                ]}
              >
                후쿠오카 · 규슈
              </Text>

              <Text style={styles.availableText}>도쿄 사용 가능</Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.sectionDivider,
            { backgroundColor: colors.border },
          ]}
        />

        {/* Mutual cards */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.textSecondary },
            ]}
          >
            전국 상호이용 IC카드
          </Text>

          <Text
            style={[
              styles.sectionDescription,
              { color: colors.textSecondary },
            ]}
          >
            아래 교통계 IC카드는 상호이용에 대응하며, 각 카드의 대응
            지역에서도 폭넓게 사용할 수 있습니다.
          </Text>

          <View style={styles.mutualList}>
            {mutualCards.map((card, index) => (
              <View
                key={card.name}
                style={[
                  styles.mutualRow,
                  index !== mutualCards.length - 1 && {
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: colors.border,
                  },
                ]}
              >
                <View style={styles.mutualNameArea}>
                  <Text
                    style={[
                      styles.mutualName,
                      { color: colors.text },
                    ]}
                  >
                    {card.name}
                  </Text>

                  <Text
                    style={[
                      styles.mutualCompany,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {card.description}
                  </Text>
                </View>

                <Text
                  style={[
                    styles.mutualArea,
                    { color: colors.textSecondary },
                  ]}
                >
                  {card.area}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View
          style={[
            styles.sectionDivider,
            { backgroundColor: colors.border },
          ]}
        />

        {/* Warning */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.textSecondary },
            ]}
          >
            꼭 알아두세요
          </Text>

          <View style={styles.warningRow}>
            <View style={styles.rowIcon}>
              <CircleAlert
                size={19}
                color={colors.text}
                strokeWidth={1.7}
              />
            </View>

            <View style={styles.rowContent}>
              <Text style={[styles.rowTitle, { color: colors.text }]}>
                전국 어디서나 모든 구간을 탈 수 있다는 뜻은 아니에요
              </Text>

              <Text
                style={[
                  styles.rowDescription,
                  { color: colors.textSecondary },
                ]}
              >
                전국 상호이용 카드는 여러 지역에서 사용할 수 있지만 서로 다른
                IC카드 이용 지역을 걸쳐 연속으로 이동할 수 없는 경우가
                있습니다.
              </Text>
            </View>
          </View>

          <View style={styles.warningRow}>
            <View style={styles.rowIcon}>
              <CircleAlert
                size={19}
                color={colors.text}
                strokeWidth={1.7}
              />
            </View>

            <View style={styles.rowContent}>
              <Text style={[styles.rowTitle, { color: colors.text }]}>
                일부 철도는 예외
              </Text>

              <Text
                style={[
                  styles.rowDescription,
                  { color: colors.textSecondary },
                ]}
              >
                일부 철도·버스 사업자는 전국 상호이용 카드를 지원하지 않을 수
                있습니다. 이용 전 해당 사업자의 IC카드 지원 여부를 확인하세요.
              </Text>
            </View>
          </View>

          <View style={styles.warningRow}>
            <View style={styles.rowIcon}>
              <Info
                size={19}
                color={colors.text}
                strokeWidth={1.7}
              />
            </View>

            <View style={styles.rowContent}>
              <Text style={[styles.rowTitle, { color: colors.text }]}>
                PiTaPa 전자머니
              </Text>

              <Text
                style={[
                  styles.rowDescription,
                  { color: colors.textSecondary },
                ]}
              >
                PiTaPa는 철도·버스의 전국 상호이용에는 포함되지만 전자머니의
                전국 상호이용 서비스는 지원하지 않습니다.
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.sectionDivider,
            { backgroundColor: colors.border },
          ]}
        />

        {/* Footer */}
        <View style={styles.footerNotice}>
          <Info
            size={16}
            color={colors.textSecondary}
            strokeWidth={1.7}
          />

          <Text
            style={[
              styles.footerText,
              { color: colors.textSecondary },
            ]}
          >
            IC카드는 교통 이용뿐 아니라 IC카드 결제를 지원하는 편의점,
            자판기, 상점 등에서도 사용할 수 있습니다.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default IcCardGuideScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  container: {
    width: "100%",
    maxWidth: 720,
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },

  backButton: {
    width: 40,
    height: 38,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: -0.3,
  },

  intro: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  introIcon: {
    width: 46,
    paddingTop: 2,
  },

  introContent: {
    flex: 1,
  },

  introTitle: {
    fontSize: 20,
    lineHeight: 27,
    fontWeight: "700",
    letterSpacing: -0.4,
  },

  introDescription: {
    marginTop: 7,
    fontSize: 12.5,
    lineHeight: 19,
  },

  section: {
    width: "100%",
  },

  sectionTitle: {
    marginBottom: 17,
    fontSize: 13,
    fontWeight: "600",
  },

  sectionDescription: {
    marginBottom: 13,
    fontSize: 12,
    lineHeight: 18,
  },

  cardRow: {
    minHeight: 86,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  warningRow: {
    minHeight: 92,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  rowIcon: {
    width: 42,
    paddingTop: 2,
  },

  rowContent: {
    flex: 1,
  },

  rowTitle: {
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: -0.2,
  },

  rowDescription: {
    marginTop: 4,
    fontSize: 12.5,
    lineHeight: 19,
  },

  highlightText: {
    marginTop: 5,
    color: "#A78BFA",
    fontSize: 11.5,
    lineHeight: 17,
    fontWeight: "600",
  },

  sectionDivider: {
    width: "100%",
    height: StyleSheet.hairlineWidth,
    marginVertical: 28,
  },

  existingIntro: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  existingContent: {
    flex: 1,
    marginLeft: 22,
  },

  existingTitle: {
    fontSize: 15,
    fontWeight: "600",
  },

  existingDescription: {
    marginTop: 5,
    fontSize: 12.5,
    lineHeight: 19,
  },

  exampleArea: {
    marginTop: 22,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  exampleRow: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
  },

  exampleName: {
    width: 75,
    fontSize: 14,
    fontWeight: "700",
  },

  exampleDescription: {
    flex: 1,
    fontSize: 11.5,
  },

  availableText: {
    color: "#7FAF9B",
    fontSize: 11.5,
    fontWeight: "600",
  },

  mutualList: {
    width: "100%",
  },

  mutualRow: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
  },

  mutualNameArea: {
    flex: 1,
  },

  mutualName: {
    fontSize: 14,
    fontWeight: "600",
  },

  mutualCompany: {
    marginTop: 3,
    fontSize: 10.5,
  },

  mutualArea: {
    fontSize: 11.5,
  },

  footerNotice: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },

  footerText: {
    flex: 1,
    fontSize: 11.5,
    lineHeight: 18,
  },

  pressed: {
    opacity: 0.55,
  },
});