import React, { createContext, useContext, useState, ReactNode } from "react";

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

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

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
