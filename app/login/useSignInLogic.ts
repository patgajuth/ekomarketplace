import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useAlert } from "@/hooks/useAlert";

type UseSignInLogicReturn = {
  step: "identifier" | "password";
  identifier: string;
  password: string;
  error: string | null;
  showPassword: boolean;
  canSubmitPassword: boolean;
  handleIdentifierContinue: () => void;
  handleBackToIdentifier: () => void;
  handlePasswordChange: (val: string) => void;
  handleIdentifierChange: (val: string) => void;
  toggleShowPassword: () => void;
  handleSubmit: (event: React.FormEvent) => Promise<void>;
};

export function useSignInLogic(): UseSignInLogicReturn {
  const [step, setStep] = useState<"identifier" | "password">("identifier");
  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();
  const alert = useAlert();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{9,15}$/;
  const isValidIdentifier =
    emailRegex.test(identifier) || phoneRegex.test(identifier);
  const canSubmitPassword = password.length > 0;

  const handleIdentifierContinue = useCallback(() => {
    if (!isValidIdentifier) {
      setError(
        "Enter a valid email (e.g. example@gmail.com) or phone number (9-15 digits)"
      );
      return;
    }
    setError(null);
    setStep("password");
  }, [identifier, isValidIdentifier]);

  const handleBackToIdentifier = useCallback(() => {
    setStep("identifier");
    setPassword("");
    setError(null);
  }, []);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleIdentifierChange = useCallback(
    (val: string) => {
      setIdentifier(val);
      if (error) setError(null);
    },
    [error]
  );

  const handlePasswordChange = useCallback(
    (val: string) => {
      setPassword(val);
      if (error) setError(null);
    },
    [error]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      const res = await signIn("credentials", {
        redirect: false,
        identifier,
        password,
      });
      if (res?.error) {
        setError("Incorrect e-mail/phone or password");
      } else {
        alert({ type: "success", message: "Logged in successfully" });
        router.push("/");
      }
    },
    [identifier, password, router, alert]
  );

  return {
    step,
    identifier,
    password,
    error,
    showPassword,
    canSubmitPassword,
    handleIdentifierContinue,
    handleBackToIdentifier,
    handleIdentifierChange,
    handlePasswordChange,
    toggleShowPassword,
    handleSubmit,
  };
}
