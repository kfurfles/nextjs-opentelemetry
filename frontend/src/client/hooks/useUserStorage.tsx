"use client"
import { STORAGE_KEYS } from "@/constants/localstorage.constants"
import { UserCredential } from "firebase/auth"

export const useUserFirebase = () => {
    if (typeof window !== "undefined") {
        const data = window?.localStorage.getItem(STORAGE_KEYS.FIREBASE)
        return !!data ? JSON.parse(data) as UserCredential : null
    }
    return null
}