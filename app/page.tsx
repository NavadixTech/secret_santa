"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Gift, Snowflake, ArrowRight } from "lucide-react"
import { SnowfallEffect } from "@/components/snowfall-effect"

const participants = [
  "Genevrier Nathan",
  "Hmicha Mohamed",
  "Perrot Enzo",
  "Million Maxime",
  "Larguier Axelle",
  "Pandreau Jules",
  "Scotti Ethan",
  "Heitekava Atama",
  "Poupeau Anne",
  "Stana André",
  "Leuliette Loic",
  "Villard-Lalleman Mathias",
  "Météyé Maxime",
  "Toussain Mathis",
  "Dalesme-Petitlalot Mathéo",
  "Glouschkoff Baptiste",
  "Pigeon Kilian",
  "Da Silva Valentin",
  "Marchant Tristant",
  "Bonamy Joran",
  "Taupin Sacha",
  "Lefin Mathéo",
  "Descours Samuel",
  "Niang N'baye",
]

// Créer la chaîne circulaire
const secretSantaChain = participants.map((giver, index) => ({
  giver,
  receiver: participants[(index + 1) % participants.length],
}))

export default function SecretSantaPage() {
  const [searchName, setSearchName] = useState("")
  const [selectedPerson, setSelectedPerson] = useState<{ giver: string; receiver: string } | null>(null)

  const handleSearch = () => {
    const match = secretSantaChain.find((pair) => pair.giver.toLowerCase().includes(searchName.toLowerCase()))
    setSelectedPerson(match || null)
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <SnowfallEffect />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center space-y-6 mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <Gift className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-balance bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary">
            Secret Santa
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">Epitech — 19 Décembre 2024</p>
          <div className="flex items-center justify-center gap-4 text-sm md:text-base text-muted-foreground">
            <div className="flex items-center gap-2">
              <Snowflake className="h-4 w-4 text-secondary" />
              <span>Budget: 5€ max</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Gift className="h-4 w-4 text-primary" />
              <span>{participants.length} participants</span>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <Card className="max-w-2xl mx-auto mb-12 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Découvre ton destinataire</CardTitle>
            <CardDescription>Entre ton nom pour savoir à qui tu dois offrir un cadeau</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Ton nom et prénom (=forms)..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="text-lg"
              />
              <Button onClick={handleSearch} size="lg" className="gap-2">
                Révéler
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {selectedPerson && (
              <div className="p-6 bg-accent rounded-lg space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <p className="text-sm text-muted-foreground">Tu offres un cadeau à :</p>
                <p className="text-3xl font-bold text-primary">{selectedPerson.receiver}</p>
                <p className="text-sm text-muted-foreground">N'oublie pas : maximum 5€ ! 🎁</p>
              </div>
            )}

            {searchName && !selectedPerson && (
              <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
                Aucun participant trouvé avec ce nom. Vérifie l'orthographe !
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Secret Santa Epitech 2025 • Joyeuses fêtes ! 🎄</p>
        </div>
      </footer>
    </div>
  )
}
