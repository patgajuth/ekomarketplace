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
          <span className="heading1 font-bold">Thank you!</span>
          <span className="heading6 font-medium">You have successfully registered</span>
          <span className="textL text-[var(--textColor-tertiary)]">
            Please check your e-mail for further information. Let’s explore our products and enjoy many gifts.
          </span>
          <span className="textL text-[var(--textColor-tertiary)]">
            Having problems? <span className="text-[var(--color-primary)] ml-1">Contact us</span>
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
          <p className="text-2xl font-medium">Create Account</p>
          <hr className="text-[var(--color-border-secondary)] mt-5" />
        </div>

        <form className="flex flex-col gap-y-6" onSubmit={submitHandler}>
          <InputField
            withLabel
            label="Email"
            type="email"
            placeholder="Your Email"
            {...register("email")}
            errorMessage={errors.email?.message}
            destructive={!!errors.email}
            withSupportText
          />

          <InputField
            withLabel
            label="First Name"
            type="text"
            placeholder="Your First Name"
            {...register("firstName")}
            errorMessage={errors.firstName?.message}
            destructive={!!errors.firstName}
            withSupportText
          />

          <InputField
            withLabel
            label="Mobile Number"
            type="text"
            placeholder="Mobile Number"
            {...register("phone")}
            errorMessage={errors.phone?.message}
            destructive={!!errors.phone}
            withSupportText
          />

          <InputField
            withLabel
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
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
            supportText="At least 8 chars, 1 uppercase, 1 lowercase, 1 number"
          />

          <InputField
            withLabel
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
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
            Country or region
            <Dropdown
              placeholder="Country or region"
              options={["Indonesia", "Poland", "USA"]}
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
              By creating an account and checking, you agree to the{' '}
              <span className="text-[var(--color-primary)]">Conditions of Use</span> and{' '}
              <span className="text-[var(--color-primary)]">Privacy Notice.</span>
            </p>
          </div>
          {errors.terms && <p className="text-error text-sm">{errors.terms.message}</p>}

          <Button buttonStyle="fill" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Account"}
          </Button>
        </form>
      </div>
    </div>
  );
}