"use client"

import PrivateRoute from "@/components/PrivateRoute";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/Auth/AuthProvider"


export default function Home() {
  const {session,logout} = useAuth();
  return (
    <PrivateRoute>
      {session ? (
        <div>
          {session.user.email}
        </div>  
      ): "Not logged in"
      }
      <Button variant="outline" onClick={logout}>Logout</Button>
    </PrivateRoute>
  )
}
