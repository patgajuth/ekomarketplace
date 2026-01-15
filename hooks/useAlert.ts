import { AlertContext } from "@/context/AlertContext";
import { useContext } from "react";

export const useAlert = () => useContext(AlertContext);
