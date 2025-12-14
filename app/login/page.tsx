"use client";

import React from "react";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import Checkbox from "@/components/ui/Checkbox";
import Logo from "@/components/ui/Logo";
import Link from "next/link";
import { HiddenIcon, LeftArrowIcon, VisibleIcon } from "@/components/icons";
import { useSignInLogic } from "./useSignInLogic";

export default function SignInForm() {
  const {
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
  } = useSignInLogic();

  return (
    <div className="flex flex-col items-center gap-8">
      <Logo size="secondary" />
      <div className="w-[448px] p-6 bg-[var(--color-tile)] border border-[var(--color-border-secondary)] rounded-md">
        <div className="flex justify-between items-center">
          <h2 className="heading6">Sign in</h2>
          {step === "password" && (
            <Button
              withLeftIcon
              onClick={handleBackToIdentifier}
              leftIcon={<LeftArrowIcon className="text-xs" />}
            >
              Back to Email/phone number
            </Button>
          )}
        </div>

        <hr className="text-[var(--color-border-secondary)] my-5" />
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {step === "identifier" ? (
            <>
              <InputField
                withLabel
                label="Email or phone number"
                type="text"
                placeholder="Enter email or phone number"
                value={identifier}
                onChange={(e) => handleIdentifierChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleIdentifierContinue();
                  }
                }}
              />
              {error && step === "identifier" && (
                <p className="text-danger-500 text-sm">{error}</p>
              )}
              <Button
                buttonStyle="fill"
                type="button"
                onClick={handleIdentifierContinue}
              >
                Continue
              </Button>
            </>
          ) : (
            <>
              <InputField
                withLabel
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                withRightIcon
                rightIcon={
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="cursor-pointer"
                  >
                    {showPassword ? (
                      <VisibleIcon className="text-2xl" />
                    ) : (
                      <HiddenIcon className="text-2xl" />
                    )}
                  </button>
                }
              />
              <div className="flex justify-between items-center">
                <Checkbox sizeCheckbox="l" text="Save password" />
                <Link href="#" className="textM font-medium">
                  Forgot your password?
                </Link>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <Button
                buttonStyle="fill"
                type="submit"
                disabled={!canSubmitPassword}
              >
                Sign in
              </Button>
            </>
          )}
          <p className="text-center textM">
            Don’t have an account?{" "}
            <Link href="/register" className="font-semibold">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
