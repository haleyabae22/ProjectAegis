import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type UserProfile = {
  fullName: string;
  citizenship: "Yes" | "No" | "";
  monthlyIncome: string;
  monthlyHousingCost: string;
  monthlyUtilityCost: string;
  dependentCareCost: string;
};

type ProfileContextType = {
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
};

const defaultProfile: UserProfile = {
  fullName: "",
  citizenship: "",
  monthlyIncome: "",
  monthlyHousingCost: "",
  monthlyUtilityCost: "",
  dependentCareCost: ""
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);
const PROFILE_STORAGE_KEY = "PROJECT_AEGIS_PROFILE_V1";

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const hydrateProfile = async () => {
      try {
        const raw = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as Partial<UserProfile>;
          setProfile({
            fullName: parsed.fullName ?? defaultProfile.fullName,
            citizenship: parsed.citizenship ?? defaultProfile.citizenship,
            monthlyIncome: parsed.monthlyIncome ?? defaultProfile.monthlyIncome,
            monthlyHousingCost: parsed.monthlyHousingCost ?? defaultProfile.monthlyHousingCost,
            monthlyUtilityCost: parsed.monthlyUtilityCost ?? defaultProfile.monthlyUtilityCost,
            dependentCareCost: parsed.dependentCareCost ?? defaultProfile.dependentCareCost,
          });
        }
      } finally {
        setIsHydrated(true);
      }
    };

    hydrateProfile();
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    AsyncStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile)).catch(() => {
      // Ignore persistence errors to avoid interrupting profile updates.
    });
  }, [profile, isHydrated]);

  if (!isHydrated) {
    return null;
  }

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
