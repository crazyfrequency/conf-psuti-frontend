'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Profile from "./profile"

export default function page() {
  return (
    <Card className="mt-2">
      <CardHeader>
        <CardTitle>тест</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <Profile />
      </CardContent>
    </Card>
  )
}
