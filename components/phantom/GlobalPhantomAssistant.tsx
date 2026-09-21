import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";

import { usePhantom } from "../../contexts/PhantomContext";
import { resolvePhantomStation } from "../../lib/phantom/stationResolver";
import PhantomAssistant from "./PhantomAssistant";

const PHANTOM_API_URL =
  "https://tokyo-railway-api.vercel.app/api/phantom";

type PhantomRouteIntent = {
  intent: "route" | "last-train";
  departureStation: string;
  arrivalStation: string;
};

type PhantomApiResponse = {
  ok: boolean;
  mode?: string;
  text?: string;
  intent?: PhantomRouteIntent;
  error?: string;
};

const GlobalPhantomAssistant = () => {
  const {
    journey,
    pendingRouteRequest,
    setPendingRouteRequest,
  } = usePhantom();

  const [phantomText, setPhantomText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const consumedPendingRouteMessageRef = useRef<string | null>(null);

  useEffect(() => {
    if (!journey) {
      return;
    }

    const pendingMessage = pendingRouteRequest?.message?.trim();

    if (!pendingRouteRequest || !pendingMessage) {
      return;
    }

    if (
      consumedPendingRouteMessageRef.current === pendingMessage
    ) {
      return;
    }

    const departureMatches =
      pendingRouteRequest.departure.nameKo ===
      journey.departureStation;

    const arrivalMatches =
      pendingRouteRequest.arrival.nameKo ===
      journey.arrivalStation;

    if (!departureMatches || !arrivalMatches) {
      return;
    }

    let cancelled = false;

    const requestJourneyAnswer = async () => {
      setIsLoading(true);

      try {
        console.log(
          "[PHANTOM] requesting final journey answer:",
          {
            message: pendingMessage,
            journey,
          },
        );

        const response = await fetch(PHANTOM_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: pendingMessage,
            journey,
          }),
        });

        const data =
          (await response.json()) as PhantomApiResponse;

        if (cancelled) {
          return;
        }

        if (!response.ok || !data.ok) {
          console.error(
            "[PHANTOM] journey API error:",
            data.error,
          );

          setPhantomText(
            "PHANTOM이 경로 설명을 만들지 못했어요. 잠시 후 다시 시도해 주세요.",
          );

          return;
        }

        if (!data.text) {
          setPhantomText(
            "PHANTOM의 경로 설명을 확인할 수 없어요.",
          );

          return;
        }

        consumedPendingRouteMessageRef.current =
          pendingMessage;

        console.log(
          "[PHANTOM] final journey answer:",
          data.text,
        );

        setPhantomText(data.text);

        setPendingRouteRequest(null);
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error(
          "[PHANTOM] journey request failed:",
          error,
        );

        setPhantomText(
          "PHANTOM 서버에 연결하지 못했어요.",
        );
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void requestJourneyAnswer();

    return () => {
      cancelled = true;
    };
  }, [
    journey,
    pendingRouteRequest,
    setPendingRouteRequest,
  ]);

  const handleSendMessage = async (
    message: string,
  ): Promise<boolean> => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading) {
      return false;
    }

    setIsLoading(true);

    try {
      const response = await fetch(PHANTOM_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          journey
            ? {
                message: trimmedMessage,
                journey,
              }
            : {
                message: trimmedMessage,
              },
        ),
      });

      const data =
        (await response.json()) as PhantomApiResponse;

      if (!response.ok || !data.ok) {
        console.error(
          "[PHANTOM] API error:",
          data.error,
        );

        setPhantomText(
          "PHANTOM이 지금 요청을 처리하지 못했어요. 잠시 후 다시 시도해 주세요.",
        );

        return false;
      }

      if (
        (data.mode === "route-intent" &&
          data.intent?.intent === "route") ||
        (data.mode === "last-train-intent" &&
          data.intent?.intent === "last-train")
      ) {
        console.log(
          "[PHANTOM] route intent:",
          data.intent,
        );

        const departureMatch =
          resolvePhantomStation(
            data.intent.departureStation,
          );

        const arrivalMatch =
          resolvePhantomStation(
            data.intent.arrivalStation,
          );

        console.log(
          "[PHANTOM] departure station:",
          departureMatch,
        );

        console.log(
          "[PHANTOM] arrival station:",
          arrivalMatch,
        );

        if (!departureMatch) {
          setPhantomText(
            `${data.intent.departureStation}역을 Tokyo Railway Guide의 역 데이터에서 찾지 못했어요.`,
          );

          return false;
        }

        if (!arrivalMatch) {
          setPhantomText(
            `${data.intent.arrivalStation}역을 Tokyo Railway Guide의 역 데이터에서 찾지 못했어요.`,
          );

          return false;
        }

        const departureTime =
          new Date().toISOString();

        consumedPendingRouteMessageRef.current = null;

        setPendingRouteRequest({
          departure:
            departureMatch.representativeStation,
          arrival:
            arrivalMatch.representativeStation,
          departureTime,
          message: trimmedMessage,
        });

        setPhantomText(
          `${departureMatch.nameKo} → ${arrivalMatch.nameKo} 경로를 CULLINAN이 확인하고 있어요.`,
        );

        router.push({
          pathname: "/route-result" as any,
          params: {
            departureNameKo:
              departureMatch.nameKo,
            departureNameJa:
              departureMatch.nameJa ?? "",
            arrivalNameKo:
              arrivalMatch.nameKo,
            arrivalNameJa:
              arrivalMatch.nameJa ?? "",
            departureTime,
            departureTimeMode: "now",
            journeyMode:
              data.intent.intent === "last-train"
                ? "last-train"
                : "normal",
          },
        });

        return true;
      }

      if (data.text) {
        setPhantomText(data.text);
        return true;
      }

      setPhantomText(
        "PHANTOM의 응답을 확인할 수 없어요.",
      );

      return false;
    } catch (error) {
      console.error(
        "[PHANTOM] request failed:",
        error,
      );

      setPhantomText(
        "PHANTOM 서버에 연결하지 못했어요.",
      );

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const defaultText = journey
    ? `${journey.departureStation} → ${journey.arrivalStation} 경로를 확인하고 있어요. 궁금한 점을 물어보세요.`
    : "어디로 가고 싶은지 PHANTOM에게 물어보세요.";

  return (
    <PhantomAssistant
      text={phantomText ?? defaultText}
      isLoading={isLoading}
      onSendMessage={handleSendMessage}
    />
  );
};

export default GlobalPhantomAssistant;