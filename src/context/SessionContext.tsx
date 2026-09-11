import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type {
  Customer,
  Frame,
  MeasurementField,
  MeasurementSession,
  LensType,
  ThicknessInput,
  ThicknessResult,
  TintSelection,
} from "../types";

function emptyThicknessInput(): ThicknessInput {
  return {
    sphere: "-2.00",
    cylinder: "-0.50",
    axis: "90",
    frameWidth: "",
    frameHeight: "",
    dbl: "",
    index: "1.60",
  };
}

function newSession(): MeasurementSession {
  return {
    id: `MF-2026-${Math.floor(10000 + Math.random() * 89999)}`,
    customer: null,
    frame: null,
    measurements: [],
    lens: null,
    coatings: [],
    thicknessInput: emptyThicknessInput(),
    thicknessResult: null,
    tint: null,
    status: "draft",
    createdAt: new Date().toISOString(),
  };
}

interface SessionContextValue {
  session: MeasurementSession | null;
  startSession: () => void;
  setCustomer: (customer: Customer) => void;
  setFrame: (frame: Frame) => void;
  setMeasurements: (measurements: MeasurementField[]) => void;
  updateMeasurement: (key: string, value: string) => void;
  setLens: (lens: LensType) => void;
  toggleCoating: (coating: string) => void;
  setThicknessInput: (input: ThicknessInput) => void;
  setThicknessResult: (result: ThicknessResult) => void;
  setTint: (tint: TintSelection) => void;
  completeSession: () => void;
  clearSession: () => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<MeasurementSession | null>(null);

  const value = useMemo<SessionContextValue>(
    () => ({
      session,
      startSession: () => setSession(newSession()),
      setCustomer: (customer) =>
        setSession((prev) => (prev ? { ...prev, customer } : { ...newSession(), customer })),
      setFrame: (frame) =>
        setSession((prev) => {
          const base = prev ?? newSession();
          return {
            ...base,
            frame,
            thicknessInput: {
              ...base.thicknessInput,
              frameWidth: String(frame.a),
              frameHeight: String(frame.b),
              dbl: String(frame.dbl),
            },
          };
        }),
      setMeasurements: (measurements) =>
        setSession((prev) => (prev ? { ...prev, measurements } : prev)),
      updateMeasurement: (key, val) =>
        setSession((prev) =>
          prev
            ? {
                ...prev,
                measurements: prev.measurements.map((m) =>
                  m.key === key ? { ...m, value: val, status: "ok" } : m
                ),
              }
            : prev
        ),
      setLens: (lens) => setSession((prev) => (prev ? { ...prev, lens } : prev)),
      toggleCoating: (coating) =>
        setSession((prev) =>
          prev
            ? {
                ...prev,
                coatings: prev.coatings.includes(coating)
                  ? prev.coatings.filter((c) => c !== coating)
                  : [...prev.coatings, coating],
              }
            : prev
        ),
      setThicknessInput: (thicknessInput) =>
        setSession((prev) => (prev ? { ...prev, thicknessInput } : prev)),
      setThicknessResult: (thicknessResult) =>
        setSession((prev) => (prev ? { ...prev, thicknessResult } : prev)),
      setTint: (tint) => setSession((prev) => (prev ? { ...prev, tint } : prev)),
      completeSession: () =>
        setSession((prev) => (prev ? { ...prev, status: "completed" } : prev)),
      clearSession: () => setSession(null),
    }),
    [session]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}
