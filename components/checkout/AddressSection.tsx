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
          <AddressButton isActive={!isNew} label="Existing Address" onClick={() => setIsNew(false)} />
        )}
        <AddressButton isActive={isNew} label="New Address" onClick={() => setIsNew(true)} />
      </div>

      <div className="flex flex-col w-full gap-y-4">
        {!isNew && existingAddress && (
          <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-3">
              <div className="flex items-center gap-x-4 textM font-medium">
                Address <Badge text="Main Address" />
              </div>
              <p className="textL mb-2">{existingAddress}</p>
            </div>
            <div className="flex justify-between">
              <AddressPart label="Country" text={dataAddress.country} />
              <AddressPart label="Province" text={dataAddress.province} />
              <AddressPart label="City" text={dataAddress.city} />
              <AddressPart label="Postal Code" text={dataAddress.postalCode} />
            </div>
          </div>
        )}

        {(isNew || existingAddress === null) && (
          <div className="flex flex-col gap-y-8">
            <div className="grid grid-cols-2 gap-y-8 gap-x-10">
              <Dropdown
                placeholder="Country"
                className="w-full"
                options={["Poland", "USA", "Germany"]}
                onChange={setCountry}
              />
              <Dropdown
                placeholder="Province"
                className="w-full"
                options={["Mazowieckie", "Małopolskie", "Dolnośląskie"]}
                onChange={setProvince}
              />
              <Dropdown
                placeholder="City"
                className="w-full"
                options={["Warszawa", "Kraków", "Wrocław"]}
                onChange={setCity}
              />
              <Dropdown
                placeholder="Postal Code"
                className="w-full"
                options={["00-001", "30-001", "50-001"]}
                onChange={setPostalCode}
              />
            </div>
            <input
              type="text"
              readOnly
              value={[country, province, city, postalCode].filter(Boolean).join(", ")}
              placeholder="Complete Address"
              className="px-3.5 py-2.5 w-full bg-[var(--color-tile)] border border-[var(--color-border-secondary)] rounded-md mb-2"
            />
            <Checkbox
              text="Make it the main address"
              checked={makeMain}
              onChange={() => setMakeMain((prev) => !prev)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
