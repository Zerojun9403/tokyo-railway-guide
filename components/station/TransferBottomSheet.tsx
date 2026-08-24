import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type TransferLine = {
  id: string;
  code: string;
  nameKo: string;
  nameJa?: string;
  color: string;
};

type TransferBottomSheetProps = {
  visible: boolean;
  transfers: TransferLine[];
  onClose: () => void;
  onPressTransfer?: (transfer: TransferLine) => void;
};

export const TransferBottomSheet = ({
  visible,
  transfers,
  onClose,
  onPressTransfer,
}: TransferBottomSheetProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.root}>
        {/* 어두운 배경 */}
        <Pressable style={styles.overlay} onPress={onClose} />

        {/* Bottom Sheet */}
        <View style={styles.sheet}>
          {/* 드래그 핸들 */}
          <View style={styles.handle} />

          <Text style={styles.title}>환승노선</Text>

          <View style={styles.list}>
            {transfers.map((transfer) => (
              <Pressable
                key={transfer.id}
                style={({ pressed }) => [
                  styles.item,
                  pressed && styles.itemPressed,
                ]}
                onPress={() => onPressTransfer?.(transfer)}
              >
                {/* 노선 아이콘 */}
                <View
                  style={[
                    styles.lineBadge,
                    {
                      backgroundColor: transfer.color,
                    },
                  ]}
                >
                  <Text style={styles.lineBadgeText}>{transfer.code}</Text>
                </View>

                {/* 노선 이름 */}
                <View style={styles.lineInfo}>
                  <Text style={styles.lineNameKo}>{transfer.nameKo}</Text>

                  {transfer.nameJa ? (
                    <Text style={styles.lineNameJa}>{transfer.nameJa}</Text>
                  ) : null}
                </View>

                {/* 화살표 */}
                <Text style={styles.chevron}>›</Text>
              </Pressable>
            ))}
          </View>

          {transfers.length === 0 ? (
            <View style={styles.emptyArea}>
              <Text style={styles.emptyText}>환승 가능한 노선이 없습니다.</Text>
            </View>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "flex-end",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },

  sheet: {
    width: "100%",

    backgroundColor: "#FFFFFF",

    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,

    paddingTop: 10,
    paddingHorizontal: 24,
    paddingBottom: 34,
  },

  handle: {
    width: 42,
    height: 5,

    borderRadius: 999,

    backgroundColor: "#D5D9E0",

    alignSelf: "center",

    marginBottom: 22,
  },

  title: {
    fontSize: 22,
    lineHeight: 28,

    fontWeight: "800",

    color: "#17191D",

    marginBottom: 18,
  },

  list: {
    width: "100%",
  },

  item: {
    minHeight: 68,

    flexDirection: "row",
    alignItems: "center",

    paddingVertical: 10,
  },

  itemPressed: {
    opacity: 0.55,
  },

  lineBadge: {
    width: 46,
    height: 46,

    borderRadius: 14,

    alignItems: "center",
    justifyContent: "center",

    marginRight: 14,
  },

  lineBadgeText: {
    color: "#FFFFFF",

    fontSize: 14,
    lineHeight: 18,

    fontWeight: "800",
  },

  lineInfo: {
    flex: 1,
  },

  lineNameKo: {
    fontSize: 16,
    lineHeight: 21,

    fontWeight: "700",

    color: "#17191D",
  },

  lineNameJa: {
    marginTop: 2,

    fontSize: 12,
    lineHeight: 16,

    color: "#8C96A5",
  },

  chevron: {
    marginLeft: 12,

    fontSize: 30,
    lineHeight: 32,

    color: "#A6AFBC",
  },

  emptyArea: {
    paddingVertical: 24,
  },

  emptyText: {
    fontSize: 14,

    color: "#8C96A5",
  },
});
