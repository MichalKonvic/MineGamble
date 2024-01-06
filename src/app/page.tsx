"use client"

import Dashboard from "@/components/Dashboard/Dashboard";
import Navigation from "@/components/Navigation/Navigation";
import PrivateRoute from "@/components/PrivateRoute";
import ProfileMenu from "@/components/ProfileMenu/ProfileMenu";
import ThemeSelect from "@/components/ThemeSelect";
import { useAuth } from "@/providers/Auth/AuthProvider"


export default function Home() {
  return (
    <PrivateRoute>
      <Dashboard/>
    </PrivateRoute>
  )
}
