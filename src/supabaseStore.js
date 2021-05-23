import { writable } from "svelte/store";
import { createClient } from '@supabase/supabase-js'

export const sveltesupa = (() => {
  const { subscribe, set } = writable(false)

  return {
    subscribe,
    init: ({ url, key }) => set(createClient(url, key)),
    reset: () => set(false)
  }
})()