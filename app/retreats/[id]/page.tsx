"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useParams } from "next/navigation"

export default function RetreatDetails() {
  const { id } = useParams()
  const [retreat, setRetreat] = useState<any>(null)
  const [participants, setParticipants] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      // Buscar retiro
      const { data: retreatData } = await supabase
        .from("retreats")
        .select("*")
        .eq("id", id)
        .single()

      // Buscar participantes
      const { data: participantsData } = await supabase
        .from("participants")
        .select("*")
        .eq("retreat_id", id)

      setRetreat(retreatData)
      setParticipants(participantsData || [])
    }

    if (id) fetchData()
  }, [id])

  if (!retreat) return <div className="p-10 text-white">Carregando...</div>

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-4">{retreat.nome}</h1>

      <h2 className="text-xl mb-2">Participantes</h2>

      {participants.map((p) => (
        <div key={p.id} className="border border-gray-700 p-3 mb-2 rounded">
          <p>{p.nome}</p>
          <p>
            Pagamento:{" "}
            {p.pagamento_confirmado ? "Confirmado" : "Pendente"}
          </p>
        </div>
      ))}
    </div>
  )
}