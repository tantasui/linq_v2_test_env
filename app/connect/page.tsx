"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Wallet } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useWallet } from "@/components/wallet-context"

export default function ConnectWallet() {
  const [bankName, setBankName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [routingNumber, setRoutingNumber] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const router = useRouter()
  const { connectWallet, isConnected } = useWallet()

  useEffect(() => {
    if (isConnected) {
      router.push("/")
    }
  }, [isConnected, router])

  if (isConnected) {
    return null
  }

  const handleConnect = async () => {
    if (!bankName || !accountNumber || !routingNumber) return

    setIsConnecting(true)

    // Simulate connection process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    connectWallet(bankName)

    setIsConnecting(false)
    router.push("/")
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background">
      {/* Header */}
      <div className="px-6 pt-12 pb-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Connect Wallet</h1>
        </div>

        {/* Connect Card */}
        <Card className="p-6 bg-card border-border">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Connect Your Bank</h2>
            <p className="text-sm text-muted-foreground">
              Securely link your bank account to start sending and receiving money
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="bankName" className="text-sm text-foreground">
                Bank Name
              </Label>
              <Input
                id="bankName"
                placeholder="Enter your bank name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="mt-1 bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <Label htmlFor="accountNumber" className="text-sm text-foreground">
                Account Number
              </Label>
              <Input
                id="accountNumber"
                placeholder="Enter account number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="mt-1 bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <Label htmlFor="routingNumber" className="text-sm text-foreground">
                Routing Number
              </Label>
              <Input
                id="routingNumber"
                placeholder="Enter routing number"
                value={routingNumber}
                onChange={(e) => setRoutingNumber(e.target.value)}
                className="mt-1 bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <Button
              onClick={handleConnect}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={!bankName || !accountNumber || !routingNumber || isConnecting}
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </Button>
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              Your banking information is encrypted and secure. We use bank-level security to protect your data.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
