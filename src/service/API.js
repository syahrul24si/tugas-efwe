// import { createClient } from '@supabase/supabase-js'

// const API_URL = "https://vifegisbkjbipuninrcs.supabase.co"
// const API_KEY = "sb_publishable_4J-Mbg0UMP90egjJgAUEfQ_26mcS9q3"

// export const supabase = createClient(API_URL, API_KEY)

// export const API = {
//     async findByUsername(username) {
//         const { data, error } = await supabase
//             .from("users")
//             .select("*")
//             .eq("username", username)
//             .single()
//         return { data, error }
//     },

//     async createUser(userData) {
//         const { data, error } = await supabase
//             .from("users")
//             .insert([userData])
//         return { data, error }
//     },

//     async fetchUsers() {
//     const { data, error } = await supabase
//         .from("users")
//         .select("id, username, password_hash, created_at")
//         .order("created_at", { ascending: false })
//     if (error) throw error
//     return data
//     },

//     async deleteUser(id) {
//         const { error } = await supabase
//             .from("users")
//             .delete()
//             .eq("id", id)
//         if (error) throw error
//     },
// }

import { createClient } from '@supabase/supabase-js'

const API_URL = "https://zqlmjgtymitddybvolhh.supabase.co"
const API_KEY = "sb_publishable_rDL4jEEpTIAMzryPpu34ZA_leKKjNmg"

export const supabase = createClient(API_URL, API_KEY)

export const API = {

    async signInWithRole(email, password) {
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (authError) return { error: authError }

        const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", authData.user.id)
            .single()

        if (profileError) return { error: profileError }

        return {
            user: authData.user,
            profile,
            role: profile.role,
        }
    },

    async signOut() {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
    },

    async getCurrentUserWithRole() {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        if (sessionError || !session) return { user: null, profile: null, role: null }

        const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single()

        if (profileError) return { error: profileError }

        return {
            user: session.user,
            profile,
            role: profile.role,
        }
    },

    async findByEmail(email) {
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("email", email)
            .single()
        return { data, error }
    },

    async getProfileById(userId) {
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .single()
        return { data, error }
    },

    async createProfile(profileData) {
        const payload = {
            role: "member",
            ...profileData,
        }
        const { data, error } = await supabase
            .from("profiles")
            .insert([payload])
        return { data, error }
    },

    async updateProfile(userId, updates) {
        const { data, error } = await supabase
            .from("profiles")
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq("id", userId)
        return { data, error }
    },

    async fetchProfiles() {
        const { data, error } = await supabase
            .from("profiles")
            .select("id, email, full_name, role, tier, points, created_at, updated_at")
            .order("created_at", { ascending: false })
        if (error) throw error
        return data
    },

    async deleteProfile(id) {
        const { error } = await supabase
            .from("profiles")
            .delete()
            .eq("id", id)
        if (error) throw error
    },
}