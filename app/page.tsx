"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function Home() {
  const [retreats, setRetreats] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.push("/login")
        return
      }

      const { data } = await supabase
        .from("retreats")
        .select("*")

      setRetreats(data || [])
      setLoading(false)
    }

    checkUser()
  }, [])

  if (loading) return <div className="p-10 text-white">Carregando...</div>

  return (
    <div className="p-10 text-white">
      <h1 className="text-2xl mb-4">Meus Retiros</h1>

      {retreats.map((retreat) => (
        <div key={retreat.id} className="border p-3 mb-2">
          {retreat.nome}
        </div>
      ))}
    </div>
  )
}