"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit'
import { networkConfig } from '@/lib/sui-config'
import { ReactNode } from 'react'

const queryClient = new QueryClient()

export function MyStenProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
        <WalletProvider>
          {children}
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  )
}