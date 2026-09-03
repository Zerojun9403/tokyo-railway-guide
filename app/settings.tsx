import { router } from "expo-router";
import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  Database,
  Globe2,
  Info,
  Star,
} from "lucide-react-native";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAppTheme } from "../hooks/useAppTheme";

export default function SettingsScreen() {
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();

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
            <ChevronLeft size={25} color={colors.text} strokeWidth={1.8} />
          </Pressable>

          <Text
            style={[
              styles.pageTitle,
              {
                color: colors.text,
              },
            ]}
          >
            설정
          </Text>
        </View>

        {/* 일반 */}

        <SectionTitle title="일반" color={colors.textSecondary} />

        <SettingRow
          icon={<Globe2 size={20} color={colors.text} strokeWidth={1.7} />}
          title="언어"
          description="앱에서 사용하는 언어"
          value="한국어"
          showDivider
        />

        <SettingRow
          icon={<Star size={20} color={colors.text} strokeWidth={1.7} />}
          title="즐겨찾기 관리"
          description="저장한 역을 확인하고 관리합니다"
          onPress={() => router.push("/favorite-stations")}
          showChevron
          showDivider
        />

        <SettingRow
          icon={<Clock3 size={20} color={colors.text} strokeWidth={1.7} />}
          title="최근 역 관리"
          description="최근 확인한 역을 확인합니다"
          onPress={() => router.push("/recent-stations")}
          showChevron
        />

        {/* 데이터 */}

        <View style={styles.sectionGap} />

        <SectionTitle title="데이터" color={colors.textSecondary} />

        <View style={styles.dataHeader}>
          <Database size={20} color={colors.text} strokeWidth={1.7} />

          <View style={styles.dataHeaderText}>
            <Text
              style={[
                styles.rowTitle,
                {
                  color: colors.text,
                },
              ]}
            >
              데이터 출처
            </Text>

            <Text
              style={[
                styles.rowDescription,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              철도 운행 및 시간표 데이터
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.sourceList,
            {
              borderTopColor: colors.border,
            },
          ]}
        >
          <SourceRow name="JR동일본" source="ODPT" />

          <SourceRow name="도쿄메트로" source="ODPT" />

          <SourceRow name="도에이 지하철" source="ODPT" />

          <SourceRow name="게이세이 전철" source="공식 데이터" />

          <SourceRow name="게이큐 전철" source="ODPT" />

          <SourceRow name="세이부 철도" source="ODPT" />

          <SourceRow name="도큐 전철" source="ODPT" last />
        </View>

        {/* 앱 정보 */}

        <View style={styles.sectionGap} />

        <SectionTitle title="앱 정보" color={colors.textSecondary} />

        <SettingRow
          icon={<Info size={20} color={colors.text} strokeWidth={1.7} />}
          title="Tokyo Railway Guide"
          description="도쿄 철도를 더 쉽고 직관적으로 이용하기 위한 여행자용 철도 가이드"
          value="Version 1.0.0"
        />

        {/* 이용 안내 */}

        <View style={styles.noticeArea}>
          <Text
            style={[
              styles.noticeTitle,
              {
                color: colors.text,
              },
            ]}
          >
            이용 안내
          </Text>

          <Text
            style={[
              styles.noticeText,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            열차 시간표 및 운행 정보는 실제 운행 상황에 따라 달라질 수 있습니다.
            열차 이용 전 철도회사의 공식 안내도 함께 확인해 주세요.
          </Text>
        </View>

        {/* SDG 11 */}

        <View style={styles.sdgArea}>
          <Image
            source={require("../assets/images/sgs11.png")}
            style={styles.sdgLogo}
            resizeMode="contain"
          />

          <View style={styles.sdgTextArea}>
            <Text
              style={[
                styles.sdgTitle,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              지속가능한 도시와 공동체
            </Text>

            <Text
              style={[
                styles.sdgDescription,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              Sustainable Cities and Communities
            </Text>
          </View>
        </View>

        {/* Footer */}

        <View style={styles.footer}>
          <Text
            style={[
              styles.footerTitle,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            TOKYO RAILWAY GUIDE
          </Text>

          <Text
            style={[
              styles.footerDescription,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            Made for travelers in Tokyo
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

/* =========================================================
 * Section Title
 * ======================================================= */

type SectionTitleProps = {
  title: string;
  color: string;
};

const SectionTitle = ({ title, color }: SectionTitleProps) => {
  return (
    <Text
      style={[
        styles.sectionTitle,
        {
          color,
        },
      ]}
    >
      {title}
    </Text>
  );
};

/* =========================================================
 * Setting Row
 * ======================================================= */

type SettingRowProps = {
  icon: React.ReactNode;
  title: string;
  description?: string;
  value?: string;
  showChevron?: boolean;
  showDivider?: boolean;
  onPress?: () => void;
};

const SettingRow = ({
  icon,
  title,
  description,
  value,
  showChevron = false,
  showDivider = false,
  onPress,
}: SettingRowProps) => {
  const { colors } = useAppTheme();

  const content = (
    <View style={styles.row}>
      <View style={styles.iconArea}>{icon}</View>

      <View
        style={[
          styles.rowContent,
          showDivider && {
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <View style={styles.rowTextArea}>
          <Text
            style={[
              styles.rowTitle,
              {
                color: colors.text,
              },
            ]}
          >
            {title}
          </Text>

          {description && (
            <Text
              style={[
                styles.rowDescription,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              {description}
            </Text>
          )}
        </View>

        {value && (
          <Text
            style={[
              styles.rowValue,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            {value}
          </Text>
        )}

        {showChevron && (
          <ChevronRight
            size={17}
            color={colors.textSecondary}
            strokeWidth={1.8}
          />
        )}
      </View>
    </View>
  );

  if (!onPress) {
    return content;
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.pressed]}
    >
      {content}
    </Pressable>
  );
};

/* =========================================================
 * Source Row
 * ======================================================= */

type SourceRowProps = {
  name: string;
  source: string;
  last?: boolean;
};

const SourceRow = ({ name, source, last = false }: SourceRowProps) => {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.sourceRow,
        !last && {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <Text
        style={[
          styles.sourceName,
          {
            color: colors.text,
          },
        ]}
      >
        {name}
      </Text>

      <Text
        style={[
          styles.sourceValue,
          {
            color: colors.textSecondary,
          },
        ]}
      >
        {source}
      </Text>
    </View>
  );
};

/* =========================================================
 * Styles
 * ======================================================= */

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

  /* Header */

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 34,
  },

  backButton: {
    width: 38,
    height: 38,
    alignItems: "flex-start",
    justifyContent: "center",
    marginRight: 6,
  },

  pageTitle: {
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: -0.5,
  },

  /* Sections */

  sectionTitle: {
    marginBottom: 8,
    fontSize: 13,
    fontWeight: "600",
  },

  sectionGap: {
    height: 38,
  },

  /* Setting Row */

  row: {
    minHeight: 66,
    flexDirection: "row",
    alignItems: "stretch",
  },

  iconArea: {
    width: 46,
    paddingTop: 20,
    alignItems: "flex-start",
  },

  rowContent: {
    flex: 1,
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
  },

  rowTextArea: {
    flex: 1,
    paddingVertical: 14,
    paddingRight: 12,
  },

  rowTitle: {
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: -0.2,
  },

  rowDescription: {
    marginTop: 3,
    fontSize: 12.5,
    lineHeight: 18,
  },

  rowValue: {
    marginLeft: 10,
    fontSize: 12,
  },

  /* Data */

  dataHeader: {
    minHeight: 66,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  dataHeaderText: {
    flex: 1,
    paddingTop: 17,
    paddingBottom: 14,
    marginLeft: 26,
  },

  sourceList: {
    marginLeft: 46,
    borderTopWidth: StyleSheet.hairlineWidth,
  },

  sourceRow: {
    minHeight: 47,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sourceName: {
    fontSize: 13,
    fontWeight: "500",
  },

  sourceValue: {
    marginLeft: 16,
    fontSize: 11.5,
  },

  /* Notice */

  noticeArea: {
    marginTop: 32,
  },

  noticeTitle: {
    fontSize: 13,
    fontWeight: "600",
  },

  noticeText: {
    marginTop: 8,
    fontSize: 11.5,
    lineHeight: 18,
  },

  /* SDG */

  sdgArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 52,
  },

  sdgLogo: {
    width: 42,
    height: 42,
    marginRight: 10,
  },

  sdgTextArea: {
    justifyContent: "center",
  },

  sdgTitle: {
    fontSize: 10,
    fontWeight: "600",
  },

  sdgDescription: {
    marginTop: 2,
    fontSize: 8.5,
  },

  /* Footer */

  footer: {
    alignItems: "center",
    marginTop: 24,
  },

  footerTitle: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.2,
  },

  footerDescription: {
    marginTop: 4,
    fontSize: 8.5,
  },

  pressed: {
    opacity: 0.5,
  },
});
