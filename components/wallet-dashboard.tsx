"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft, Plus, Send, Eye, EyeOff, Wallet } from "lucide-react"
import Link from "next/link"
import { useWallet } from "./wallet-context"

export function WalletDashboard() {
  const [showBalance, setShowBalance] = useState(true)
  const { balance, transactions, isConnected, connectedBank } = useWallet()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours} hours ago`
    if (diffInHours < 48) return "1 day ago"
    return `${Math.floor(diffInHours / 24)} days ago`
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background">
      {/* Header */}
      <div className="px-6 pt-12 pb-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-foreground">Wallet</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowBalance(!showBalance)}
            className="text-muted-foreground hover:text-foreground"
          >
            {showBalance ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
          </Button>
        </div>

        {!isConnected ? (
          <Card className="p-6 bg-card border-border mb-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-lg font-semibold text-foreground mb-2">Connect Your Wallet</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Connect your bank account to start sending and receiving money
              </p>
              <Link href="/connect">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Connect Wallet</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <>
            {/* Balance Card */}
            <Card className="p-6 bg-card border-border">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Total Balance</p>
                <h2 className="text-4xl font-bold text-foreground mb-2">
                  {showBalance ? `$${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}` : "••••••"}
                </h2>
                <p className="text-xs text-muted-foreground mb-6">{connectedBank}</p>

                <div className="flex gap-3">
                  <Link href="/send" className="flex-1">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </Link>
                  <Button variant="outline" className="flex-1 border-border bg-transparent">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Money
                  </Button>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>

      {isConnected && transactions.length > 0 && (
        <div className="px-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>

          <div className="space-y-3">
            {transactions.slice(0, 5).map((transaction) => (
              <Card key={transaction.id} className="p-4 bg-card border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        transaction.type === "sent"
                          ? "bg-muted text-muted-foreground"
                          : "bg-accent text-accent-foreground"
                      }`}
                    >
                      {transaction.type === "sent" ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownLeft className="h-4 w-4" />
                      )}
                    </div>

                    <div>
                      <p className="font-medium text-foreground">
                        {transaction.type === "sent" ? `To ${transaction.recipient}` : `From ${transaction.sender}`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.bankName && `${transaction.bankName} • `}
                        {formatDate(transaction.date)}
                      </p>
                      {transaction.note && <p className="text-xs text-muted-foreground italic">{transaction.note}</p>}
                    </div>
                  </div>

                  <p className={`font-semibold ${transaction.type === "sent" ? "text-foreground" : "text-foreground"}`}>
                    {transaction.type === "sent" ? "-" : "+"}${transaction.amount.toFixed(2)}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {isConnected && transactions.length === 0 && (
        <div className="px-6">
          <Card className="p-8 bg-card border-border">
            <div className="text-center">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowUpRight className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No transactions yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Start by sending money to someone or adding funds to your wallet
              </p>
              <Link href="/send">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Send Money</Button>
              </Link>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
