import { useState } from "react";
import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Send, X } from "lucide-react-native";

import { useAppTheme } from "../../hooks/useAppTheme";

type PhantomAssistantProps = {
  text?: string | null;
  isLoading?: boolean;
  onSendMessage?: (message: string) => boolean | Promise<boolean>;
};

const PhantomAssistant = ({
  text,
  isLoading = false,
  onSendMessage,
}: PhantomAssistantProps) => {
  const { colors } = useAppTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading || !onSendMessage) {
      return;
    }

    const success = await onSendMessage(trimmedMessage);

    if (success) {
      setMessage("");
    }
  };

  return (
    <>
      <TouchableOpacity
        style={[
          styles.floatingButton,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
        activeOpacity={0.8}
        onPress={() => setIsOpen(true)}
      >
        <Text style={styles.floatingGhost}>👻</Text>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <SafeAreaView style={styles.modalRoot}>
          <Pressable
            style={styles.backdrop}
            onPress={() => setIsOpen(false)}
          />

          <View
            style={[
              styles.panel,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.handle} />

            <View style={styles.header}>
              <View style={styles.titleArea}>
                <Text
                  style={[
                    styles.eyebrow,
                    {
                      color: colors.textSecondary,
                    },
                  ]}
                >
                  PHANTOM AI 👻
                </Text>

                <Text
                  style={[
                    styles.title,
                    {
                      color: colors.text,
                    },
                  ]}
                >
                  안녕하세요, PHANTOM AI입니다.
                </Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.closeButton,
                  {
                    backgroundColor: colors.surfaceSecondary,
                  },
                ]}
                activeOpacity={0.7}
                onPress={() => setIsOpen(false)}
              >
                <X
                  size={19}
                  color={colors.text}
                  strokeWidth={2}
                />
              </TouchableOpacity>
            </View>

            <Text
              style={[
                styles.description,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              {isLoading
                ? "현재 경로와 실제 열차 정보를 확인하고 있어요."
                : text ??
                  "현재 보고 있는 경로를 바탕으로 여행을 도와드릴게요."}
            </Text>

            <View
              style={[
                styles.inputContainer,
                {
                  backgroundColor: colors.surfaceSecondary,
                  borderColor: colors.border,
                },
              ]}
            >
              <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder="PHANTOM에게 질문하기..."
                placeholderTextColor={colors.textSecondary}
                style={[
                  styles.input,
                  {
                    color: colors.text,
                  },
                ]}
                returnKeyType="send"
                editable={!isLoading}
                onSubmitEditing={() => void handleSend()}
              />

              <TouchableOpacity
                style={[
                  styles.sendButton,
                  {
                    backgroundColor: colors.text,
                    opacity:
                      !message.trim() || isLoading ? 0.45 : 1,
                  },
                ]}
                activeOpacity={0.75}
                disabled={!message.trim() || isLoading}
                onPress={() => void handleSend()}
              >
                <Send
                  size={18}
                  color={colors.surface}
                  strokeWidth={2.2}
                />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default PhantomAssistant;

const styles = StyleSheet.create({
  floatingButton: {
    zIndex: 9999,
    position: "absolute",
    right: 20,
    bottom: 100,
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
  },

  floatingGhost: {
    fontSize: 27,
    lineHeight: 32,
  },

  modalRoot: {
    flex: 1,
    justifyContent: "flex-end",
  },

  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0, 0, 0, 0.42)",
  },

  panel: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 28,
    minHeight: 260,
  },

  handle: {
    width: 42,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#9CA3AF",
    alignSelf: "center",
    marginBottom: 20,
    opacity: 0.55,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  titleArea: {
    flex: 1,
    paddingRight: 16,
  },

  eyebrow: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "800",
    letterSpacing: 0.8,
  },

  title: {
    marginTop: 5,
    fontSize: 20,
    lineHeight: 27,
    fontWeight: "900",
  },

  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },

  description: {
    marginTop: 20,
    fontSize: 13,
    lineHeight: 21,
    fontWeight: "600",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    minHeight: 52,
    borderWidth: 1,
    borderRadius: 18,
    paddingLeft: 16,
    paddingRight: 6,
    paddingVertical: 6,
  },

  input: {
    flex: 1,
    minHeight: 40,
    paddingVertical: 8,
    paddingRight: 10,
    fontSize: 14,
    fontWeight: "600",
  },

  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});