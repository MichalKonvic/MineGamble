"use client"

import Navigation from "@/components/Navigation";
import PrivateRoute from "@/components/PrivateRoute";
import ProfileMenu from "@/components/ProfileMenu/ProfileMenu";
import ThemeSelect from "@/components/ThemeSelect";
import { useAuth } from "@/providers/Auth/AuthProvider"


export default function Home() {
  const {session,logout} = useAuth();
  return (
    <PrivateRoute>
    </PrivateRoute>
  )
}
