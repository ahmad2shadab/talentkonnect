"use client"

import { useState } from "react"
import { Logo } from "@/components/logo"
import { CreditBalance } from "@/components/credit-balance"
import { CreditLedger } from "@/components/credit-ledger"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, CreditCard, Settings, LogOut } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  // In a real app, this would come from authentication
  const [userId] = useState("user-123")

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo size="default" />
          <div className="flex items-center space-x-4">
            <span className="font-inter font-semibold text-neutral-dark hidden md:inline-block">Welcome, User</span>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
            {/* Sidebar */}
            <div className="hidden md:block">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <nav className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/dashboard">
                      <CreditCard className="mr-2 h-5 w-5 text-accent-orange" />
                      Credits
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="#">
                      <User className="mr-2 h-5 w-5" />
                      Profile
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="#">
                      <Settings className="mr-2 h-5 w-5" />
                      Settings
                    </Link>
                  </Button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              <Tabs defaultValue="wallet" className="w-full md:hidden">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="wallet">Credits</TabsTrigger>
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="grid gap-6">
                <CreditBalance userId={userId} />
                <CreditLedger userId={userId} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-neutral-dark">© {new Date().getFullYear()} TalentKonnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
