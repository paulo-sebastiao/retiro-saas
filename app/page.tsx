"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

export default function Home() {
  const [retreats, setRetreats] = useState<any[]>([])

  useEffect(() => {
    async function fetchRetreats() {
      const { data, error } = await supabase
        .from("retreats")
        .select("*")

      if (error) {
        console.error(error)
      } else {
        setRetreats(data || [])
      }
    }

    fetchRetreats()
  }, [])

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Meus Retiros</h1>

      {retreats.map((retreat) => (
        <div key={retreat.id} className="border p-4 mb-2 rounded">
          <Link href={`/retreats/${retreat.id}`}>
            {retreat.nome}
          </Link>
        </div>
      ))}
    </div>
  )
}