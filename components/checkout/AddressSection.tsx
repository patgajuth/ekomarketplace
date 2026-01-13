"use client";

import React, { useState, useEffect } from "react";
import Checkbox from "@/components/ui/Checkbox";
import Badge from "../ui/Badge";
import AddressPart from "./AddressPart";
import AddressButton from "./AddressButton";
import Dropdown from "../ui/Dropdown/Dropdown";

type AddressSectionProps = {
  onAddressChange: (address: string) => void;
  onMakeMainChange: (makeMain: boolean) => void;
};

export default function AddressSection({ onAddressChange, onMakeMainChange }: AddressSectionProps) {
  const [existingAddress, setExistingAddress] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [makeMain, setMakeMain] = useState(false);

  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [dataAddress, setDataAddress] = useState<{
    country: string;
    province: string;
    city: string;
    postalCode: string;
  }>({ country: "", province: "", city: "", postalCode: "" });
  useEffect(() => {
    fetch(`${process.env.NEXTAUTH_URL || ''}/api/user/address`)
      .then((res) => res.json())
      .then(({ address }) => {
        if (address) {
          setDataAddress(address);
          const addrStr = [address.country, address.province, address.city, address.postalCode]
            .filter(Boolean)
            .join(", ");
          setExistingAddress(addrStr);
          onAddressChange(addrStr);
        } else {
          setIsNew(true);
        }
      })
      .catch(() => {
        setIsNew(true);
      });
  }, [onAddressChange]);

  useEffect(() => {
    if (!isNew) return;
    const parts = [country, province, city, postalCode].filter(Boolean);
    const full = parts.join(", ");
    onAddressChange(full);
  }, [country, province, city, postalCode, isNew, onAddressChange]);

  useEffect(() => {
    onMakeMainChange(makeMain);
  }, [makeMain, onMakeMainChange]);

  return (
    <div className="flex flex-col w-full gap-y-6">
      <div className="flex w-full">
        {!!existingAddress && (
          <AddressButton isActive={!isNew} label="Istniejący adres" onClick={() => setIsNew(false)} />
        )}
        <AddressButton isActive={isNew} label="Nowy adres" onClick={() => setIsNew(true)} />
      </div>

      <div className="flex flex-col w-full gap-y-4">
        {!isNew && existingAddress && (
          <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-3">
              <div className="flex items-center gap-x-4 textM font-medium">
                Adres <Badge text="Główny adres" />
              </div>
              <p className="textL mb-2">{existingAddress}</p>
            </div>
            <div className="flex justify-between">
              <AddressPart label="Kraj" text={dataAddress.country} />
              <AddressPart label="Województwo" text={dataAddress.province} />
              <AddressPart label="Miasto" text={dataAddress.city} />
              <AddressPart label="Kod pocztowy" text={dataAddress.postalCode} />
            </div>
          </div>
        )}

        {(isNew || existingAddress === null) && (
          <div className="flex flex-col gap-y-8">
            <div className="grid grid-cols-2 gap-y-8 gap-x-10">
              <Dropdown
                placeholder="Kraj"
                className="w-full"
                options={["Polska", "USA", "Niemcy"]}
                onChange={setCountry}
              />
              <Dropdown
                placeholder="Województwo"
                className="w-full"
                options={["Mazowieckie", "Małopolskie", "Dolnośląskie"]}
                onChange={setProvince}
              />
              <Dropdown
                placeholder="Miasto"
                className="w-full"
                options={["Warszawa", "Kraków", "Wrocław"]}
                onChange={setCity}
              />
              <Dropdown
                placeholder="Kod pocztowy"
                className="w-full"
                options={["00-001", "30-001", "50-001"]}
                onChange={setPostalCode}
              />
            </div>
            <input
              type="text"
              readOnly
              value={[country, province, city, postalCode].filter(Boolean).join(", ")}
              placeholder="Pełny adres"
              className="px-3.5 py-2.5 w-full bg-[var(--color-tile)] border border-[var(--color-border-secondary)] rounded-md mb-2"
            />
            <Checkbox
              text="Ustaw jako główny adres"
              checked={makeMain}
              onChange={() => setMakeMain((prev) => !prev)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
