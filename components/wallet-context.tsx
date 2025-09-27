"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Transaction {
  id: string
  type: "sent" | "received"
  amount: number
  recipient?: string
  sender?: string
  bankName?: string
  note?: string
  date: string
}

interface WalletContextType {
  balance: number
  transactions: Transaction[]
  isConnected: boolean
  connectedBank: string
  addTransaction: (transaction: Omit<Transaction, "id" | "date">) => void
  connectWallet: (bankName: string) => void
  updateBalance: (amount: number) => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState(4018.64)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [connectedBank, setConnectedBank] = useState("")

  // Load data from localStorage on mount
  useEffect(() => {
    const connected = localStorage.getItem("walletConnected") === "true"
    const bank = localStorage.getItem("connectedBank") || ""
    const storedTransactions = JSON.parse(localStorage.getItem("transactions") || "[]")
    const storedBalance = Number.parseFloat(localStorage.getItem("walletBalance") || "4018.64")

    setIsConnected(connected)
    setConnectedBank(bank)
    setTransactions(storedTransactions)
    setBalance(storedBalance)
  }, [])

  const addTransaction = (transactionData: Omit<Transaction, "id" | "date">) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    }

    const updatedTransactions = [newTransaction, ...transactions]
    setTransactions(updatedTransactions)
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions))

    // Update balance for sent transactions
    if (transactionData.type === "sent") {
      const newBalance = balance - transactionData.amount
      setBalance(newBalance)
      localStorage.setItem("walletBalance", newBalance.toString())
    } else if (transactionData.type === "received") {
      const newBalance = balance + transactionData.amount
      setBalance(newBalance)
      localStorage.setItem("walletBalance", newBalance.toString())
    }
  }

  const connectWallet = (bankName: string) => {
    setIsConnected(true)
    setConnectedBank(bankName)
    localStorage.setItem("walletConnected", "true")
    localStorage.setItem("connectedBank", bankName)
  }

  const updateBalance = (amount: number) => {
    setBalance(amount)
    localStorage.setItem("walletBalance", amount.toString())
  }

  return (
    <WalletContext.Provider
      value={{
        balance,
        transactions,
        isConnected,
        connectedBank,
        addTransaction,
        connectWallet,
        updateBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
