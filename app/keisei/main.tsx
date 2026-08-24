import { router } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Station = {
  code: string;
  korean: string;
  japanese: string;
};

const stations: Station[] = [
  {
    code: "KS01",
    korean: "게이세이우에노",
    japanese: "京成上野",
  },
  {
    code: "KS02",
    korean: "닛포리",
    japanese: "日暮里",
  },
  {
    code: "KS03",
    korean: "신미카와시마",
    japanese: "新三河島",
  },
  {
    code: "KS04",
    korean: "마치야",
    japanese: "町屋",
  },
  {
    code: "KS05",
    korean: "센주오하시",
    japanese: "千住大橋",
  },
  {
    code: "KS06",
    korean: "게이세이세키야",
    japanese: "京成関屋",
  },
  {
    code: "KS07",
    korean: "호리키리쇼부엔",
    japanese: "堀切菖蒲園",
  },
  {
    code: "KS08",
    korean: "오하나자야",
    japanese: "お花茶屋",
  },
  {
    code: "KS09",
    korean: "아오토",
    japanese: "青砥",
  },
  {
    code: "KS10",
    korean: "게이세이타카사고",
    japanese: "京成高砂",
  },
  {
    code: "KS11",
    korean: "게이세이코이와",
    japanese: "京成小岩",
  },
  {
    code: "KS12",
    korean: "에도가와",
    japanese: "江戸川",
  },
  {
    code: "KS13",
    korean: "고노다이",
    japanese: "国府台",
  },
  {
    code: "KS14",
    korean: "이치카와마마",
    japanese: "市川真間",
  },
  {
    code: "KS15",
    korean: "스가노",
    japanese: "菅野",
  },
  {
    code: "KS16",
    korean: "게이세이야와타",
    japanese: "京成八幡",
  },
  {
    code: "KS17",
    korean: "오니고에",
    japanese: "鬼越",
  },
  {
    code: "KS18",
    korean: "게이세이나카야마",
    japanese: "京成中山",
  },
  {
    code: "KS19",
    korean: "히가시나카야마",
    japanese: "東中山",
  },
  {
    code: "KS20",
    korean: "게이세이니시후나",
    japanese: "京成西船",
  },
  {
    code: "KS21",
    korean: "가이진",
    japanese: "海神",
  },
  {
    code: "KS22",
    korean: "게이세이후나바시",
    japanese: "京成船橋",
  },
  {
    code: "KS23",
    korean: "다이진구시타",
    japanese: "大神宮下",
  },
  {
    code: "KS24",
    korean: "후나바시케이바조",
    japanese: "船橋競馬場",
  },
  {
    code: "KS25",
    korean: "야쓰",
    japanese: "谷津",
  },
  {
    code: "KS26",
    korean: "게이세이쓰다누마",
    japanese: "京成津田沼",
  },
  {
    code: "KS27",
    korean: "게이세이오쿠보",
    japanese: "京成大久保",
  },
  {
    code: "KS28",
    korean: "미모미",
    japanese: "実籾",
  },
  {
    code: "KS29",
    korean: "야치요다이",
    japanese: "八千代台",
  },
  {
    code: "KS30",
    korean: "게이세이오와다",
    japanese: "京成大和田",
  },
  {
    code: "KS31",
    korean: "가쓰타다이",
    japanese: "勝田台",
  },
  {
    code: "KS32",
    korean: "시즈",
    japanese: "志津",
  },
  {
    code: "KS33",
    korean: "유카리가오카",
    japanese: "ユーカリが丘",
  },
  {
    code: "KS34",
    korean: "게이세이우스이",
    japanese: "京成臼井",
  },
  {
    code: "KS35",
    korean: "게이세이사쿠라",
    japanese: "京成佐倉",
  },
  {
    code: "KS36",
    korean: "오사쿠라",
    japanese: "大佐倉",
  },
  {
    code: "KS37",
    korean: "게이세이시스이",
    japanese: "京成酒々井",
  },
  {
    code: "KS38",
    korean: "소고산도",
    japanese: "宗吾参道",
  },
  {
    code: "KS39",
    korean: "고즈노모리",
    japanese: "公津の杜",
  },
  {
    code: "KS40",
    korean: "게이세이나리타",
    japanese: "京成成田",
  },
  {
    code: "KS41",
    korean: "공항 제2빌딩",
    japanese: "空港第2ビル",
  },
  {
    code: "KS42",
    korean: "나리타공항",
    japanese: "成田空港",
  },
];

export default function KeiseiMainScreen() {
  const handleStationPress = (station: Station) => {
    router.push({
      pathname: "/keisei/[stationId]",
      params: {
        stationId: station.code,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* =========================
            뒤로가기
        ========================= */}

        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backArrow}>‹</Text>

          <Text style={styles.backText}>게이세이 전철</Text>
        </TouchableOpacity>

        {/* =========================
            노선 헤더
        ========================= */}

        <View style={styles.lineHeader}>
          <View style={styles.lineBadge}>
            <Text style={styles.lineBadgeText}>KS</Text>
          </View>

          <View style={styles.lineTitleContainer}>
            <Text style={styles.lineTitle}>게이세이 본선</Text>

            <Text style={styles.lineJapanese}>京成本線</Text>
          </View>
        </View>

        {/* =========================
            역 선택
        ========================= */}

        <View style={styles.stationSection}>
          <Text style={styles.sectionTitle}>역을 선택하세요</Text>

          <Text style={styles.stationCount}>{stations.length}개 역</Text>

          <View style={styles.stationList}>
            {stations.map((station, index) => {
              const isFirst = index === 0;
              const isLast = index === stations.length - 1;

              return (
                <TouchableOpacity
                  key={station.code}
                  activeOpacity={0.65}
                  style={styles.stationRow}
                  onPress={() => handleStationPress(station)}
                >
                  {/* =========================
                      노선
                  ========================= */}

                  <View style={styles.railArea}>
                    {!isFirst && <View style={styles.railTop} />}

                    <View style={styles.stationDot} />

                    {!isLast && <View style={styles.railBottom} />}
                  </View>

                  {/* =========================
                      역 정보
                  ========================= */}

                  <View style={styles.stationInfo}>
                    <Text style={styles.stationCode}>{station.code}</Text>

                    <Text style={styles.stationName}>{station.korean}</Text>

                    <Text style={styles.stationJapanese}>
                      {station.japanese}
                    </Text>
                  </View>

                  {/* 화살표 */}

                  <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F6F8",
  },

  scrollView: {
    flex: 1,
  },

  container: {
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 60,
  },

  /*
   * =========================
   * 뒤로가기
   * =========================
   */

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 34,
  },

  backArrow: {
    marginRight: 4,

    fontSize: 30,
    lineHeight: 30,
    fontWeight: "400",

    color: "#171A1F",
  },

  backText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",

    color: "#747D8C",
  },

  /*
   * =========================
   * 노선 헤더
   * =========================
   */

  lineHeader: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 36,
  },

  lineBadge: {
    width: 50,
    height: 50,

    borderWidth: 3,
    borderColor: "#0074BE",
    borderRadius: 14,

    alignItems: "center",
    justifyContent: "center",

    marginRight: 15,
  },

  lineBadgeText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "800",

    color: "#0074BE",
  },

  lineTitleContainer: {
    justifyContent: "center",
  },

  lineTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "800",

    letterSpacing: -0.5,

    color: "#171A1F",
  },

  lineJapanese: {
    marginTop: 2,

    fontSize: 11,
    lineHeight: 15,
    fontWeight: "500",

    color: "#747D8C",
  },

  /*
   * =========================
   * 역 선택
   * =========================
   */

  stationSection: {
    width: "100%",
  },

  sectionTitle: {
    fontSize: 22,
    lineHeight: 29,
    fontWeight: "800",

    letterSpacing: -0.5,

    color: "#171A1F",
  },

  stationCount: {
    marginTop: 5,
    marginBottom: 18,

    fontSize: 12,
    lineHeight: 17,

    color: "#9AA4B3",
  },

  stationList: {
    width: "100%",
  },

  /*
   * =========================
   * 역 행
   * =========================
   */

  stationRow: {
    minHeight: 70,

    flexDirection: "row",
    alignItems: "center",
  },

  /*
   * =========================
   * 노선도
   * =========================
   */

  railArea: {
    width: 32,
    height: 70,

    position: "relative",

    alignItems: "center",
    justifyContent: "center",
  },

  railTop: {
    position: "absolute",

    top: 0,

    width: 3,
    height: 35,

    backgroundColor: "#0074BE",
  },

  railBottom: {
    position: "absolute",

    bottom: 0,

    width: 3,
    height: 35,

    backgroundColor: "#0074BE",
  },

  stationDot: {
    width: 13,
    height: 13,

    borderRadius: 999,

    borderWidth: 3,
    borderColor: "#0074BE",

    backgroundColor: "#F5F6F8",

    zIndex: 2,
  },

  /*
   * =========================
   * 역 텍스트
   * =========================
   */

  stationInfo: {
    flex: 1,

    paddingLeft: 7,

    justifyContent: "center",
  },

  stationCode: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "800",

    color: "#0074BE",
  },

  stationName: {
    marginTop: 1,

    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",

    letterSpacing: -0.3,

    color: "#171A1F",
  },

  stationJapanese: {
    marginTop: 2,

    fontSize: 10,
    lineHeight: 14,

    color: "#747D8C",
  },

  /*
   * =========================
   * 화살표
   * =========================
   */

  chevron: {
    marginLeft: 10,

    fontSize: 28,
    lineHeight: 30,
    fontWeight: "300",

    color: "#A4ADBA",
  },
});
