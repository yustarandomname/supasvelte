import { writable } from "svelte/store";
import { createClient } from '@supabase/supabase-js'

export const sveltesupa = (() => {
  const { subscribe, set, get } = writable(false)

  return {
    subscribe,
    init: ({ url, key }) => {
      const supabase = createClient(url, key)
      return set(supabase)
    },
    auth: () => { return supabase.auth },
    signUp: async (email, password) => get(supabase => supabase.auth.signUp({ email, password })),
    reset: () => set(false)
  }
})()