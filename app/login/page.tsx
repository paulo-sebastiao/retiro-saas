"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert("Erro no login: " + error.message)
    } else {
      router.push("/")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Login</h1>

    <input
    className="border border-gray-600 bg-gray-800 text-white p-2 rounded w-64"
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    />

    <input
    className="border border-gray-600 bg-gray-800 text-white p-2 rounded w-64"
    type="password"
    placeholder="Senha"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    />

      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Entrar
      </button>
    </div>
  )
}