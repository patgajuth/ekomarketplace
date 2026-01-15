import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAlert } from "@/hooks/useAlert";
import { useFetchWithRetry } from "@/hooks/useFetchWithRetry";

const schema = z
  .object({
    email: z.string().email({ message: "Nieprawidłowy adres e-mail" }),
    phone: z.string().min(9, { message: "Numer telefonu jest za krótki" }),
    password: z
      .string()
      .min(8, "Minimum 8 znaków")
      .regex(/[A-Z]/, "Co najmniej jedna wielka litera")
      .regex(/[a-z]/, "Co najmniej jedna mała litera")
      .regex(/[0-9]/, "Co najmniej jedna cyfra"),
    confirmPassword: z.string(),
    country: z.string().nonempty("Wybierz kraj"),
    firstName: z.string().min(1, "Imię jest wymagane"),
    terms: z.boolean().refine((val) => val === true, { message: "Musisz zaakceptować regulamin" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Hasła nie są takie same",
    path: ["confirmPassword"],
  });

export type FormData = z.infer<typeof schema>;

export function useCreateAccountLogic() {
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const alert = useAlert();
  const fetchWithRetry = useFetchWithRetry();

  const form = useForm<FormData>({ resolver: zodResolver(schema) });
  const {
    register,
    handleSubmit,
    setError,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = handleSubmit(async (data) => {
    const baseUrl = process.env.NEXTAUTH_URL ?? "";
    const res = await fetchWithRetry(`${baseUrl}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json();
      if (body.errors) {
        Object.entries(body.errors as Record<string, { _errors: string[] }>).forEach(
          ([field, info]) => {
            setError(field as keyof FormData, {
              type: "server",
              message: info._errors[0],
            });
          }
        );
      } else {
        alert({ type: "danger", message: "Rejestracja nie powiodła się" });
      }
      return;
    }

    setSuccess(true);
    reset();
    alert({ type: "success", message: "Konto utworzone pomyślnie!" });
  });

  const handleCountryChange = (val: string) => {
    form.setValue("country", val);
    form.trigger("country");
  };
  const handleTermsChange = (checked: boolean) => {
    form.setValue("terms", checked);
    form.trigger("terms");
  };

  return {
    success,
    showPassword,
    toggleShowPassword: () => setShowPassword((v) => !v),
    showConfirmPassword,
    toggleShowConfirmPassword: () => setShowConfirmPassword((v) => !v),
    register,
    submitHandler: onSubmit,
    errors,
    isSubmitting,
    watch,
    handleCountryChange,
    handleTermsChange,
  } as const;
}
