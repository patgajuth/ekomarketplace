"use client";

import React from "react";
import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown/Dropdown";
import { ConfirmIcon, HiddenIcon, VisibleIcon } from "@/components/icons";
import InputField from "@/components/ui/InputField";
import Logo from "@/components/ui/Logo";
import Checkbox from "@/components/ui/Checkbox";
import { useCreateAccountLogic } from "./useCreateAccountLogic";

export default function CreateAccount() {
  const {
    success,
    showPassword,
    toggleShowPassword,
    showConfirmPassword,
    toggleShowConfirmPassword,
    register,
    submitHandler,
    errors,
    isSubmitting,
    watch,
    handleCountryChange,
    handleTermsChange,
  } = useCreateAccountLogic();

  if (success) {
    return (
      <div className="flex flex-col gap-y-10 my-20 items-center">
        <ConfirmIcon className="display1 text-success-500" />
      <div className="flex flex-col gap-y-4 items-center text-center">
          <span className="heading1 font-bold">Dziękujemy!</span>
          <span className="heading6 font-medium">Rejestracja zakończona pomyślnie</span>
          <span className="textL text-[var(--textColor-tertiary)]">
            Sprawdź e-mail, aby poznać szczegóły. Odkrywaj nasze produkty i korzystaj z promocji.
          </span>
          <span className="textL text-[var(--textColor-tertiary)]">
            Masz problem? <span className="text-[var(--color-primary)] ml-1">Skontaktuj się z nami</span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-8 items-center my-20 max-w-md w-full">
      <Logo size="secondary" />
      <div className="flex flex-col gap-y-8 p-6 border border-[var(--color-border-secondary)] rounded-md bg-[var(--color-tile)] w-full">
        <div>
          <p className="text-2xl font-medium">Utwórz konto</p>
          <hr className="text-[var(--color-border-secondary)] mt-5" />
        </div>

        <form className="flex flex-col gap-y-6" onSubmit={submitHandler}>
          <InputField
            withLabel
            label="E-mail"
            type="email"
            placeholder="Twój e-mail"
            {...register("email")}
            errorMessage={errors.email?.message}
            destructive={!!errors.email}
            withSupportText
          />

          <InputField
            withLabel
            label="Imię"
            type="text"
            placeholder="Twoje imię"
            {...register("firstName")}
            errorMessage={errors.firstName?.message}
            destructive={!!errors.firstName}
            withSupportText
          />

          <InputField
            withLabel
            label="Numer telefonu"
            type="text"
            placeholder="Numer telefonu"
            {...register("phone")}
            errorMessage={errors.phone?.message}
            destructive={!!errors.phone}
            withSupportText
          />

          <InputField
            withLabel
            label="Hasło"
            type={showPassword ? "text" : "password"}
            placeholder="Hasło"
            withRightIcon
            rightIcon={
              <button className="cursor-pointer" type="button" onClick={toggleShowPassword}>
                {showPassword ? <VisibleIcon className="text-2xl" /> : <HiddenIcon className="text-2xl" />}
              </button>
            }
            {...register("password")}
            errorMessage={errors.password?.message}
            destructive={!!errors.password}
            withSupportText
            supportText="Min. 8 znaków, 1 wielka litera, 1 mała litera, 1 cyfra"
          />

          <InputField
            withLabel
            label="Potwierdź hasło"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Potwierdź hasło"
            withRightIcon
            rightIcon={
              <button className="cursor-pointer" type="button" onClick={toggleShowConfirmPassword}>
                {showConfirmPassword ? <VisibleIcon className="text-2xl" /> : <HiddenIcon className="text-2xl" />}
              </button>
            }
            {...register("confirmPassword")}
            errorMessage={errors.confirmPassword?.message}
            destructive={!!errors.confirmPassword}
            withSupportText
          />

          <div className="flex flex-col gap-y-4 textL font-medium">
            Kraj lub region
            <Dropdown
              placeholder="Kraj lub region"
              options={["Polska", "USA", "Niemcy"]}
              className="w-full"
              onChange={handleCountryChange}
            />
            {errors.country && <p className="text-error text-sm">{errors.country.message}</p>}
          </div>

          <div className="flex gap-x-4 items-start">
            <Checkbox
              checked={!!watch("terms")}
              onChange={(e) => handleTermsChange(e.target.checked)}
            />
            <p className="text-sm">
              Tworząc konto i zaznaczając, akceptujesz{' '}
              <span className="text-[var(--color-primary)]">Warunki korzystania</span> oraz{' '}
              <span className="text-[var(--color-primary)]">Politykę prywatności.</span>
            </p>
          </div>
          {errors.terms && <p className="text-error text-sm">{errors.terms.message}</p>}

          <Button buttonStyle="fill" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Tworzenie..." : "Utwórz konto"}
          </Button>
        </form>
      </div>
    </div>
  );
}
