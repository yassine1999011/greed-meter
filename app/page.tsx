"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, DollarSign, Clock, ShoppingCart, Zap, Share2 } from "lucide-react"

interface CEO {
  id: string
  name: string
  company: string
  photoUrl: string
  annualEarnings: number // in billions
  earningsPerSecond: number
  netWorth: number // in billions
  description: string
}

interface Purchase {
  id: number
  item: string
  price: number
  timestamp: Date
}

const ceoData: CEO[] = [
  {
    id: "elon-musk",
    name: "Elon Musk",
    company: "Tesla / SpaceX / X",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/440px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
    annualEarnings: 23.5,
    earningsPerSecond: 745.37,
    netWorth: 250,
    description: "CEO of Tesla, SpaceX, and owner of X (formerly Twitter)"
  },
  {
    id: "jeff-bezos",
    name: "Jeff Bezos",
    company: "Amazon / Blue Origin",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Jeff_Bezos_at_Amazon_Spheres_Grand_Opening_in_Seattle_-_2018_%2839074799225%29_%28cropped%29.jpg/440px-Jeff_Bezos_at_Amazon_Spheres_Grand_Opening_in_Seattle_-_2018_%2839074799225%29_%28cropped%29.jpg",
    annualEarnings: 8.5,
    earningsPerSecond: 269.55,
    netWorth: 200,
    description: "Founder of Amazon and Blue Origin"
  },
  {
    id: "mark-zuckerberg",
    name: "Mark Zuckerberg",
    company: "Meta",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/440px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg",
    annualEarnings: 24.4,
    earningsPerSecond: 773.91,
    netWorth: 180,
    description: "CEO and co-founder of Meta (Facebook)"
  },
  {
    id: "tim-cook",
    name: "Tim Cook",
    company: "Apple",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tim_Cook_%282017%2C_cropped%29.jpg/440px-Tim_Cook_%282017%2C_cropped%29.jpg",
    annualEarnings: 0.099,
    earningsPerSecond: 3.14,
    netWorth: 1.9,
    description: "CEO of Apple Inc."
  },
  {
    id: "sundar-pichai",
    name: "Sundar Pichai",
    company: "Google / Alphabet",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Sundar_pichai.png/440px-Sundar_pichai.png",
    annualEarnings: 0.226,
    earningsPerSecond: 7.17,
    netWorth: 1.5,
    description: "CEO of Google and Alphabet Inc."
  }
]

const purchaseItems = [
  { item: "Cup of Coffee", price: 5 },
  { item: "Movie Ticket", price: 15 },
  { item: "New Shoes", price: 120 },
  { item: "iPhone 16 Pro", price: 1199 },
  { item: "MacBook Pro", price: 2499 },
  { item: "Designer Watch", price: 5000 },
  { item: "Used Car", price: 15000 },
  { item: "Luxury Vacation", price: 25000 },
  { item: "Tesla Model 3", price: 42990 },
  { item: "Home Down Payment", price: 100000 },
  { item: "Yacht", price: 500000 },
  { item: "Private Jet Hour", price: 10000 },
]

export default function CEOComparisonPage() {
  const [selectedCEO, setSelectedCEO] = useState<CEO>(ceoData[0])
  const [yourEarnings, setYourEarnings] = useState(0)
  const [ceoEarnings, setCeoEarnings] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isRunning, setIsRunning] = useState(true)
  const [yourHourlyWage, setYourHourlyWage] = useState(25)
  const [livePurchases, setLivePurchases] = useState<Purchase[]>([])
  const [purchaseId, setPurchaseId] = useState(0)

  const yourEarningsPerSecond = yourHourlyWage / 3600

  // Real-time earnings timer
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 0.1)
      setYourEarnings((prev) => prev + yourEarningsPerSecond * 0.1)
      setCeoEarnings((prev) => prev + selectedCEO.earningsPerSecond * 0.1)
    }, 100)

    return () => clearInterval(interval)
  }, [isRunning, yourEarningsPerSecond, selectedCEO.earningsPerSecond])

  // Live purchases simulation
  const addRandomPurchase = useCallback(() => {
    const randomItem = purchaseItems[Math.floor(Math.random() * purchaseItems.length)]
    const newPurchase: Purchase = {
      id: purchaseId,
      item: randomItem.item,
      price: randomItem.price,
      timestamp: new Date()
    }
    setPurchaseId((prev) => prev + 1)
    setLivePurchases((prev) => [newPurchase, ...prev.slice(0, 4)])
  }, [purchaseId])

  useEffect(() => {
    const interval = setInterval(() => {
      addRandomPurchase()
    }, 3000 + Math.random() * 2000)

    return () => clearInterval(interval)
  }, [addRandomPurchase])

  // Reset when CEO changes
  useEffect(() => {
    setElapsedTime(0)
    setYourEarnings(0)
    setCeoEarnings(0)
  }, [selectedCEO])

  const formatNumber = (num: number, maxFractionDigits = 0) => {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: maxFractionDigits }).format(num)
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(2)}M`
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(2)}K`
    }
    return `$${amount.toFixed(2)}`
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const earningsRatio = selectedCEO.earningsPerSecond / yourEarningsPerSecond
  const timeToMatchYou = ceoEarnings > 0 ? (yourEarnings / selectedCEO.earningsPerSecond) : 0

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            CEO Earnings Comparison
          </h1>
          <p className="text-slate-400">See how your earnings stack up against the world&apos;s top CEOs in real-time</p>
          
          {/* Social Share Buttons */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <span className="text-sm text-slate-500 flex items-center gap-1">
              <Share2 className="w-4 h-4" />
              Share:
            </span>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`I just compared my earnings to ${selectedCEO.name} - they earn ${Math.round(selectedCEO.earningsPerSecond / yourEarningsPerSecond)}x faster than me! Check it out`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-slate-700/50 hover:bg-[#1DA1F2]/20 hover:text-[#1DA1F2] transition-colors"
              aria-label="Share on Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/sharer/sharer.php"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-slate-700/50 hover:bg-[#1877F2]/20 hover:text-[#1877F2] transition-colors"
              aria-label="Share on Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href={`https://www.instagram.com/`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-slate-700/50 hover:bg-gradient-to-br hover:from-[#833AB4]/20 hover:via-[#FD1D1D]/20 hover:to-[#F77737]/20 hover:text-[#E1306C] transition-colors"
              aria-label="Share on Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a
              href={`https://www.snapchat.com/`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-slate-700/50 hover:bg-[#FFFC00]/20 hover:text-[#FFFC00] transition-colors"
              aria-label="Share on Snapchat"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-.809-.329-1.224-.72-1.227-1.153-.015-.36.284-.69.733-.848.165-.06.374-.09.555-.09.146 0 .3.029.435.09.375.18.72.27 1.02.27.181 0 .331-.045.406-.075-.007-.18-.022-.359-.032-.54l-.003-.061c-.104-1.627-.229-3.653.299-4.847 1.579-3.544 4.934-3.821 5.926-3.821h.367z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* CEO Selector */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg text-slate-200">Select a CEO to Compare</CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={selectedCEO.id}
              onValueChange={(value) => {
                const ceo = ceoData.find((c) => c.id === value)
                if (ceo) setSelectedCEO(ceo)
              }}
            >
              <SelectTrigger className="w-full md:w-80 bg-slate-700 border-slate-600 text-slate-100">
                <SelectValue placeholder="Select a CEO" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {ceoData.map((ceo) => (
                  <SelectItem
                    key={ceo.id}
                    value={ceo.id}
                    className="text-slate-100 focus:bg-slate-700 focus:text-slate-100"
                  >
                    <span className="flex items-center gap-2">
                      {ceo.name} - {ceo.company}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* CEO Profile Card */}
        <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-emerald-500/50 shadow-lg shadow-emerald-500/20">
                <Image
                  src={selectedCEO.photoUrl}
                  alt={selectedCEO.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="text-center md:text-left space-y-2">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-100">{selectedCEO.name}</h2>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">CEO</Badge>
                </div>
                <p className="text-lg text-cyan-400 font-medium">{selectedCEO.company}</p>
                <p className="text-slate-400 max-w-md">{selectedCEO.description}</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
                  <div className="text-center">
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Net Worth</p>
                    <p className="text-lg font-bold text-emerald-400">${selectedCEO.netWorth}B</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Earnings/Year</p>
                    <p className="text-lg font-bold text-cyan-400">${selectedCEO.annualEarnings}B</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Earnings/Second</p>
                    <p className="text-lg font-bold text-yellow-400">${selectedCEO.earningsPerSecond.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Wage Input */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <label className="text-slate-300 font-medium whitespace-nowrap">Your Hourly Wage:</label>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">$</span>
                <input
                  type="number"
                  value={yourHourlyWage}
                  onChange={(e) => setYourHourlyWage(Math.max(1, Number(e.target.value)))}
                  className="w-24 px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-slate-400">/hour</span>
              </div>
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  isRunning
                    ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                    : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                }`}
              >
                {isRunning ? "Pause" : "Resume"}
              </button>
              <button
                onClick={() => {
                  setElapsedTime(0)
                  setYourEarnings(0)
                  setCeoEarnings(0)
                }}
                className="px-4 py-2 rounded-md font-medium bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
              >
                Reset
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Real-time Comparison */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Your Earnings */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-slate-200">
                <DollarSign className="w-5 h-5 text-slate-400" />
                Your Earnings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-4xl md:text-5xl font-bold text-slate-100 font-mono">
                {formatCurrency(yourEarnings)}
              </div>
              <div className="text-sm text-slate-400">
                ${yourEarningsPerSecond.toFixed(4)}/second
              </div>
              <Progress value={Math.min((yourEarnings / ceoEarnings) * 100, 100)} className="h-2 bg-slate-700" />
            </CardContent>
          </Card>

          {/* CEO Earnings */}
          <Card className="bg-gradient-to-br from-emerald-900/30 to-cyan-900/30 border-emerald-700/50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-emerald-300">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                {selectedCEO.name}&apos;s Earnings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-4xl md:text-5xl font-bold text-emerald-400 font-mono">
                {formatCurrency(ceoEarnings)}
              </div>
              <div className="text-sm text-emerald-400/70">
                ${selectedCEO.earningsPerSecond.toFixed(2)}/second
              </div>
              <Progress value={100} className="h-2 bg-emerald-900/50" />
            </CardContent>
          </Card>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
              <p className="text-2xl font-bold text-slate-100">{formatTime(elapsedTime)}</p>
              <p className="text-xs text-slate-400">Time Elapsed</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <Zap className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
              <p className="text-2xl font-bold text-slate-100">{formatNumber(earningsRatio)}x</p>
              <p className="text-xs text-slate-400">Faster Than You</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <DollarSign className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
              <p className="text-2xl font-bold text-slate-100">{formatCurrency(ceoEarnings - yourEarnings)}</p>
              <p className="text-xs text-slate-400">Gap</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 mx-auto mb-2 text-purple-400" />
              <p className="text-2xl font-bold text-slate-100">{timeToMatchYou.toFixed(2)}s</p>
              <p className="text-xs text-slate-400">{selectedCEO.name.split(" ")[0]} Matches You</p>
            </CardContent>
          </Card>
        </div>

        {/* Live Purchases */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-200">
              <ShoppingCart className="w-5 h-5 text-pink-400" />
              Live Purchases
              <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/30 animate-pulse">LIVE</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-400 mb-4">
              See what {selectedCEO.name} could buy with their earnings in real-time
            </p>
            <div className="space-y-3">
              {livePurchases.length === 0 ? (
                <p className="text-slate-500 text-center py-4">Waiting for purchases...</p>
              ) : (
                livePurchases.map((purchase) => {
                  const timeToEarn = purchase.price / selectedCEO.earningsPerSecond
                  return (
                    <div
                      key={purchase.id}
                      className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg border border-slate-600/50 animate-in slide-in-from-top-2 duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                          <ShoppingCart className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-100">{purchase.item}</p>
                          <p className="text-sm text-slate-400">{formatCurrency(purchase.price)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-emerald-400">
                          {timeToEarn < 1 ? `${(timeToEarn * 1000).toFixed(0)}ms` : `${timeToEarn.toFixed(1)}s`}
                        </p>
                        <p className="text-xs text-slate-500">to earn</p>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>

        {/* Fun Facts */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-200">Mind-Blowing Comparisons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-700/30 rounded-lg">
                <p className="text-slate-300">
                  While you earn <span className="text-cyan-400 font-bold">${yourHourlyWage}/hour</span>,{" "}
                  {selectedCEO.name} earns{" "}
                  <span className="text-emerald-400 font-bold">
                    ${formatNumber(selectedCEO.earningsPerSecond * 3600)}
                  </span>
                </p>
              </div>
              <div className="p-4 bg-slate-700/30 rounded-lg">
                <p className="text-slate-300">
                  In the time it takes you to earn <span className="text-cyan-400 font-bold">$1</span>,{" "}
                  {selectedCEO.name} earns{" "}
                  <span className="text-emerald-400 font-bold">${formatNumber(earningsRatio)}</span>
                </p>
              </div>
              <div className="p-4 bg-slate-700/30 rounded-lg">
                <p className="text-slate-300">
                  To match {selectedCEO.name}&apos;s yearly earnings, you would need to work for{" "}
                  <span className="text-yellow-400 font-bold">
                    {formatNumber(Math.round((selectedCEO.annualEarnings * 1000000000) / (yourHourlyWage * 2080)))} years
                  </span>
                </p>
              </div>
              <div className="p-4 bg-slate-700/30 rounded-lg">
                <p className="text-slate-300">
                  {selectedCEO.name} makes your daily wage (${(yourHourlyWage * 8).toFixed(0)}) in just{" "}
                  <span className="text-pink-400 font-bold">
                    {((yourHourlyWage * 8) / selectedCEO.earningsPerSecond).toFixed(1)} seconds
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 pt-4">
          Note: CEO earnings are estimates based on publicly available compensation data and stock value changes.
          Actual earnings may vary significantly.
        </p>
      </div>
    </main>
  )
}
