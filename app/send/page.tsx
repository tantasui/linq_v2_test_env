"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Send, Hash, Building2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useWallet } from "@/components/wallet-context"

export default function SendMoney() {
  const [accountNumber, setAccountNumber] = useState("")
  const [bankName, setBankName] = useState("")
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")
  const [isSending, setIsSending] = useState(false)
  const router = useRouter()
  const { addTransaction } = useWallet()

  const handleSendMoney = async () => {
    if (!accountNumber || !bankName || !amount) return

    setIsSending(true)

    // Simulate sending process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    addTransaction({
      type: "sent",
      amount: Number.parseFloat(amount),
      recipient: accountNumber,
      bankName,
      note: note || undefined,
    })

    setIsSending(false)
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
          <h1 className="text-2xl font-bold text-foreground">Send Money</h1>
        </div>

        {/* Send Money Card */}
        <Card className="p-6 bg-card border-border">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Send Money</h2>
            <p className="text-sm text-muted-foreground">Transfer money securely to anyone</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="accountNumber" className="text-sm text-foreground flex items-center gap-2">
                <Hash className="h-4 w-4" />
                Account Number
              </Label>
              <Input
                id="accountNumber"
                placeholder="Enter recipient's account number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="mt-1 bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <Label htmlFor="bankName" className="text-sm text-foreground flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Bank Name
              </Label>
              <Input
                id="bankName"
                placeholder="Enter recipient's bank name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="mt-1 bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <Label htmlFor="amount" className="text-sm text-foreground">
                Amount ($)
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 bg-input border-border text-foreground placeholder:text-muted-foreground text-2xl font-semibold py-3"
              />
            </div>

            <div>
              <Label htmlFor="note" className="text-sm text-foreground">
                Note (Optional)
              </Label>
              <Input
                id="note"
                placeholder="What's this for?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="mt-1 bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="pt-4">
              <Button
                onClick={handleSendMoney}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 text-lg font-semibold"
                disabled={!accountNumber || !bankName || !amount || isSending}
              >
                {isSending ? "Sending..." : `Send $${amount || "0.00"}`}
              </Button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              Transfers are secure and typically arrive within 1-3 business days
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
