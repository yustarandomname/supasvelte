import { writable } from "svelte/store";
import { createClient } from '@supabase/supabase-js'

export const sveltesupa = (() => {
  const { subscribe, set } = writable(false)

  return {
    subscribe,
    init: ({ url, key }) => {
      const supabase = createClient(url, key)
      return set(supabase)
    },
    auth: () => { return supabase.auth },
    reset: () => set(false)
  }
})()