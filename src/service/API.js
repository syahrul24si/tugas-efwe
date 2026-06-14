import { createClient } from '@supabase/supabase-js'

const API_URL = "https://vifegisbkjbipuninrcs.supabase.co"
const API_KEY = "sb_publishable_4J-Mbg0UMP90egjJgAUEfQ_26mcS9q3"

export const supabase = createClient(API_URL, API_KEY)

export const API = {
    async findByUsername(username) {
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("username", username)
            .single()
        return { data, error }
    },

    async createUser(userData) {
        const { data, error } = await supabase
            .from("users")
            .insert([userData])
        return { data, error }
    },

    async fetchUsers() {
    const { data, error } = await supabase
        .from("users")
        .select("id, username, password_hash, created_at")
        .order("created_at", { ascending: false })
    if (error) throw error
    return data
    },

    async deleteUser(id) {
        const { error } = await supabase
            .from("users")
            .delete()
            .eq("id", id)
        if (error) throw error
    },
}