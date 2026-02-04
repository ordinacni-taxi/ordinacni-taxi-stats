'use client'

import { useEffect, useState } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface DataType {
  metadata: {
    source: string
    generated: string
    description: string
  }
  demographics: {
    age_groups: Record<string, Record<string, number>>
    seniors_65_plus: Record<string, number>
    very_old_85_plus: Record<string, number>
  }
  health_conditions: {
    polymorbidity: Record<string, Record<string, number>>
    chronic_diseases: Record<string, any>
    geriatric_patients: Record<string, Record<string, number>>
  }
  disability: {
    total_2024: number
    description: string
  }
  key_statistics: Record<string, number>
}

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

export default function Home() {
  const [data, setData] = useState<DataType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(jsonData => {
        setData(jsonData)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading data:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-sora">Načítám data...</div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-sora text-red-600">Chyba při načítání dat</div>
      </div>
    )
  }

  // Připrava dat pro grafy
  const seniorsTrendData = Object.entries(data.demographics.seniors_65_plus).map(([year, value]) => ({
    rok: year,
    'Senioři 65+': Math.round(value),
    '85+ let': Math.round(data.demographics.very_old_85_plus[year]),
  }))

  const diseaseData = Object.entries(data.health_conditions.chronic_diseases).map(([key, value]) => ({
    name: value.name,
    '2025': Math.round(value['2024']),
    '2050': Math.round(value['2050']),
  }))

  const geriatricRiskData = Object.entries(data.health_conditions.geriatric_patients).map(([risk, values]) => ({
    name: risk.charAt(0).toUpperCase() + risk.slice(1),
    '2025': Math.round(values['2024']),
    '2050': Math.round(values['2050']),
  }))

  const targetGroupData = [
    { name: 'Mobilitně omezení (15%)', value: data.key_statistics.estimated_mobility_limited_conservative },
    { name: 'Vysoko-rizikoví geriatričtí', value: data.key_statistics.high_risk_geriatric_2024 },
    { name: 'Demence', value: data.key_statistics.dementia_2024 },
    { name: 'ZTP/ZTP-P průkazy', value: data.key_statistics.disability_certificates_2024 },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero sekce */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold font-sora mb-6">
            Stárnutí populace ČR
          </h1>
          <p className="text-2xl md:text-3xl mb-4 font-light">
            Rostoucí potřeba dopravy k zdravotní péči
          </p>
          <p className="text-lg opacity-90 max-w-3xl">
            Data z ÚZIS ČR ukazují dramatický nárůst počtu seniorů a osob se zdravotními komplikacemi, 
            kteří potřebují spolehlivou dopravu k lékařům.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Klíčové metriky */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-600">
            <div className="text-gray-600 text-sm font-semibold mb-2">SENIOŘI 65+</div>
            <div className="text-4xl font-bold font-sora text-blue-600 mb-2">
              {(data.key_statistics.seniors_65_plus_2025 / 1000000).toFixed(2)}M
            </div>
            <div className="text-green-600 font-semibold">
              +{data.key_statistics.seniors_growth_pct}% do roku 2050
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-orange-500">
            <div className="text-gray-600 text-sm font-semibold mb-2">VELMI STAŘÍ 85+</div>
            <div className="text-4xl font-bold font-sora text-orange-500 mb-2">
              {(data.key_statistics.very_old_85_plus_2025 / 1000).toFixed(0)}K
            </div>
            <div className="text-green-600 font-semibold">
              +{data.key_statistics.very_old_growth_pct}% do roku 2050
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-red-500">
            <div className="text-gray-600 text-sm font-semibold mb-2">DEMENCE</div>
            <div className="text-4xl font-bold font-sora text-red-500 mb-2">
              {(data.key_statistics.dementia_2024 / 1000).toFixed(0)}K
            </div>
            <div className="text-gray-600 text-sm">
              → {(data.key_statistics.dementia_2050 / 1000).toFixed(0)}K v roce 2050
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-600">
            <div className="text-gray-600 text-sm font-semibold mb-2">MOBILITNĚ OMEZENÍ</div>
            <div className="text-4xl font-bold font-sora text-purple-600 mb-2">
              {(data.key_statistics.estimated_mobility_limited_conservative / 1000).toFixed(0)}K
            </div>
            <div className="text-gray-600 text-sm">
              ~15% seniorů 65+
            </div>
          </div>
        </div>

        {/* Vývoj počtu seniorů */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold font-sora mb-2">📈 Dramatický nárůst počtu seniorů</h2>
          <p className="text-gray-600 mb-6">
            Populace 65+ roste o {data.key_statistics.seniors_growth_pct}%, přičemž skupina 85+ roste o {data.key_statistics.very_old_growth_pct}%
          </p>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={seniorsTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rok" />
              <YAxis />
              <Tooltip formatter={(value: number) => value.toLocaleString('cs-CZ')} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="Senioři 65+" 
                stroke="#2563eb" 
                strokeWidth={3}
                dot={{ r: 5 }}
              />
              <Line 
                type="monotone" 
                dataKey="85+ let" 
                stroke="#f59e0b" 
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Chronická onemocnění */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold font-sora mb-2">💊 Chronická onemocnění</h2>
          <p className="text-gray-600 mb-6">
            Počet osob s chronickými chorobami vyžadujícími pravidelné lékařské návštěvy
          </p>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={diseaseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value: number) => value.toLocaleString('cs-CZ')} />
              <Legend />
              <Bar dataKey="2025" fill="#2563eb" />
              <Bar dataKey="2050" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Geriatričtí pacienti */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold font-sora mb-2">🏥 Geriatričtí pacienti dle rizika</h2>
          <p className="text-gray-600 mb-6">
            Vysoko-rizikoví pacienti často potřebují doprovod a asistenční služby
          </p>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={geriatricRiskData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value: number) => value.toLocaleString('cs-CZ')} />
              <Legend />
              <Bar dataKey="2025" fill="#8b5cf6" />
              <Bar dataKey="2050" fill="#ec4899" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cílová skupina */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold font-sora mb-2">🎯 Cílová skupina pro Ordinační TAXI</h2>
          <p className="text-gray-600 mb-6">
            Lidé, kteří nejvíce potřebují spolehlivou dopravu k lékařům (rok 2024)
          </p>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={targetGroupData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {targetGroupData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => value.toLocaleString('cs-CZ')} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Call to action */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold font-sora mb-4">
            Rostoucí potřeba je jasná
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            S nárůstem seniorské populace o {data.key_statistics.seniors_growth_pct}% a dramatickým růstem 
            chronických onemocnění je spolehlivá doprava k lékařům klíčovou potřebou.
          </p>
          <a 
            href="https://ordinacnitaxi.cz" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-700 font-bold px-8 py-4 rounded-lg text-lg hover:bg-blue-50 transition-colors"
          >
            Zjistěte více o Ordinační TAXI →
          </a>
        </div>

        {/* Zdroj dat */}
        <div className="mt-12 text-center text-gray-600 text-sm">
          <p className="mb-2">
            <strong>Zdroj dat:</strong> {data.metadata.source}
          </p>
          <p>
            Data aktualizována: {data.metadata.generated}
          </p>
        </div>
      </div>
    </main>
  )
}
