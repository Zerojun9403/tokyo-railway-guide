import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "../../hooks/useAppTheme";

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
  const { colors, isDark } = useAppTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.root}>
        {/* 어두운 배경 */}
        <Pressable
          style={[
            styles.overlay,
            {
              backgroundColor: isDark
                ? "rgba(0, 0, 0, 0.58)"
                : "rgba(0, 0, 0, 0.35)",
            },
          ]}
          onPress={onClose}
        />

        {/* Bottom Sheet */}
        <View
          style={[
            styles.sheet,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          {/* 드래그 핸들 */}
          <View
            style={[
              styles.handle,
              {
                backgroundColor: colors.textMuted,
              },
            ]}
          />

          <Text
            style={[
              styles.title,
              {
                color: colors.text,
              },
            ]}
          >
            환승노선
          </Text>

          <View style={styles.list}>
            {transfers.map((transfer) => (
              <Pressable
                key={transfer.id}
                style={({ pressed }) => [
                  styles.item,
                  {
                    borderBottomColor: colors.border,
                  },
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
                  <Text
                    style={[
                      styles.lineNameKo,
                      {
                        color: colors.text,
                      },
                    ]}
                  >
                    {transfer.nameKo}
                  </Text>

                  {transfer.nameJa ? (
                    <Text
                      style={[
                        styles.lineNameJa,
                        {
                          color: colors.textSecondary,
                        },
                      ]}
                    >
                      {transfer.nameJa}
                    </Text>
                  ) : null}
                </View>

                {/* 화살표 */}
                <Text
                  style={[
                    styles.chevron,
                    {
                      color: colors.textMuted,
                    },
                  ]}
                >
                  ›
                </Text>
              </Pressable>
            ))}
          </View>

          {transfers.length === 0 ? (
            <View style={styles.emptyArea}>
              <Text
                style={[
                  styles.emptyText,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                환승 가능한 노선이 없습니다.
              </Text>
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
  },

  sheet: {
    width: "100%",

    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,

    borderWidth: 1,
    borderBottomWidth: 0,

    paddingTop: 10,
    paddingHorizontal: 24,
    paddingBottom: 34,
  },

  handle: {
    width: 42,
    height: 5,

    borderRadius: 999,

    alignSelf: "center",

    marginBottom: 22,

    opacity: 0.55,
  },

  title: {
    fontSize: 22,
    lineHeight: 28,

    fontWeight: "800",

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

    borderBottomWidth: StyleSheet.hairlineWidth,
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
  },

  lineNameJa: {
    marginTop: 2,

    fontSize: 12,
    lineHeight: 16,
  },

  chevron: {
    marginLeft: 12,

    fontSize: 30,
    lineHeight: 32,
  },

  emptyArea: {
    paddingVertical: 24,
  },

  emptyText: {
    fontSize: 14,
  },
});
