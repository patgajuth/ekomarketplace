"use client"
import Alert from "@/components/ui/Alert/Alert";
import { createContext, useState } from "react";

type AlertState = {
  message: string;
  type: "success" | "warning" | "danger";
} | null;

export const AlertContext = createContext<(alert: AlertState) => void>(() => {});

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alert, setAlert] = useState<AlertState>(null);

  return (
    <AlertContext.Provider value={setAlert}>
      {children}
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
    </AlertContext.Provider>
  );
}

