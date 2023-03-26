import useAuth from "./useAuth"
import { axiosPrivateInstance } from "../axios"
import useAxiosPrivate from "./useAxiosPrivate"

export default function useLogout() {
    const { setUser, setAccessToken, setCSRFToken } = useAuth()
    const axiosPrivateInstance = useAxiosPrivate()

    const logout = async () => {
        try {
            const response = await axiosPrivateInstance.post("logout/")

            setAccessToken(null)
            setCSRFToken(null)
            setUser({})

        } catch (error) {
            console.log(error)
        }
    }

    return logout
}