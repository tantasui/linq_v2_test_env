import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { WalletProvider } from "@/components/wallet-context"
import { MyStenProviders } from "@/components/mysten-providers"
import { Suspense } from "react"
import { Analytics } from "@vercel/analytics/react"
import '@mysten/dapp-kit/dist/index.css'

export const metadata: Metadata = {
  title: "Digital Wallet",
  description: "A modern digital wallet application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          <MyStenProviders>
            <WalletProvider>{children}</WalletProvider>
          </MyStenProviders>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
