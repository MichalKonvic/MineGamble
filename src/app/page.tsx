"use client"

import PrivateRoute from "@/components/PrivateRoute";
import ThemeSelect from "@/components/ThemeSelect";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/Auth/AuthProvider"


export default function Home() {
  const {session,logout} = useAuth();
  return (
    <PrivateRoute>
      <ThemeSelect/>
      <Button variant="outline" onClick={logout}>Logout</Button>
    </PrivateRoute>
  )
}
