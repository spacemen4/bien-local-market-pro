import { createClient } from '@supabase/supabase-js'

// Configuration Supabase
const supabaseUrl = 'https://osqpvyrctlhagtzkbspv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zcXB2eXJjdGxoYWd0emtic3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwMjg1NjYsImV4cCI6MjA2NjYwNDU2Nn0.4APWILaWXOtXCwdFYTk4MDithvZhp55ZJB6PnVn8D1w'

// Créer le client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types utiles pour TypeScript (à adapter selon votre schéma de base de données)
export type Database = {
  public: {
    Tables: {
      // Ajoutez vos tables ici
      // Exemple :
      // users: {
      //   Row: {
      //     id: string
      //     email: string
      //     created_at: string
      //   }
      //   Insert: {
      //     id?: string
      //     email: string
      //     created_at?: string
      //   }
      //   Update: {
      //     id?: string
      //     email?: string
      //     created_at?: string
      //   }
      // }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Client typé (optionnel, pour une meilleure expérience TypeScript)
export const supabaseTyped = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Fonctions utilitaires communes
export const auth = supabase.auth

// Fonction pour vérifier si l'utilisateur est connecté
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Fonction pour se connecter
export const signIn = async (email: string, password: string) => {
  console.log("Attempting to sign in with:", email);
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) {
    console.error("Sign-in error:", error);
  }
  console.log("Sign-in data:", data);
  return { data, error }
}

// Fonction pour s'inscrire
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

// Fonction pour se déconnecter
export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export default supabase
