import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

import type { Station } from "../types/station";

export type PhantomJourneySegment = {
  fromStation: string;
  toStation: string;

  lineName?: string | null;
  trainNumber?: string | null;
  trainType?: string | null;

  departureTime?: string | null;
  arrivalTime?: string | null;
};

export type PhantomJourneyContext = {
  departureStation: string;
  arrivalStation: string;

  departureTime?: string | null;
  arrivalTime?: string | null;

  transferCount?: number | null;

  segments: PhantomJourneySegment[];
};

export type PhantomRouteRequest = {
  departure: Station;
  arrival: Station;

  departureTime?: string;

  message: string;
};

type PhantomContextValue = {
  journey: PhantomJourneyContext | null;

  setJourney: (journey: PhantomJourneyContext | null) => void;
  clearJourney: () => void;

  pendingRouteRequest: PhantomRouteRequest | null;

  setPendingRouteRequest: (
    request: PhantomRouteRequest | null,
  ) => void;
};

const PhantomContext = createContext<PhantomContextValue | null>(null);

type PhantomProviderProps = {
  children: ReactNode;
};

export const PhantomProvider = ({
  children,
}: PhantomProviderProps) => {
  const [journey, setJourney] =
    useState<PhantomJourneyContext | null>(null);

  const [pendingRouteRequest, setPendingRouteRequest] =
    useState<PhantomRouteRequest | null>(null);

  const clearJourney = () => {
    setJourney(null);
  };

  const value = useMemo<PhantomContextValue>(
    () => ({
      journey,
      setJourney,
      clearJourney,

      pendingRouteRequest,
      setPendingRouteRequest,
    }),
    [journey, pendingRouteRequest],
  );

  return (
    <PhantomContext.Provider value={value}>
      {children}
    </PhantomContext.Provider>
  );
};

export const usePhantom = (): PhantomContextValue => {
  const context = useContext(PhantomContext);

  if (!context) {
    throw new Error(
      "usePhantom must be used inside PhantomProvider.",
    );
  }

  return context;
};