import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { OrderItemDetail } from "@/components/profile/OrderItems";

interface Address {
  id: number;
  country: string;
  province: string;
  city: string;
  postalCode: string;
}


export interface ProfileData {
  id: number;
  email: string;
  firstName: string;
  phone: string;
  country: string;
  addresses: Address[];
  orders: {
    id: number;
    createdAt: string; 
    items: OrderItemDetail[];
  }[];
}

export function useProfileLogic() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user?.id) {
      router.push("/login");
      return;
    }

    fetch(`/api/user/${session.user.id}`)
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json();
          throw new Error(body.message || "Fetch error");
        }
        return res.json();
      })
      .then((data: ProfileData) => setProfile(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [session, status, router]);

  return { profile, loading, error };
}
