

export const LISTINGS_QUERY_KEYS = {
    signIn: ["signIn"]
}

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/api/v1/auth`

interface TokenData {
  access_token: string
}

interface SignInResponse {
    data: TokenData
}

interface SignInPayload {
    email: string,
    password: string,
}

export const signInAPI = async (payload: SignInPayload): Promise<TokenData> => {
    const url = `${API_URL}/login`
    console.log("signing in:", url)

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: payload.email,
            password: payload.password,
        })
    })

    if (!response.ok) {
        throw new Error(`Failed to sign in: (${response.status})`)
    }

    const json: SignInResponse = await response.json()

    return json.data;
}

export const refreshTokenAPI = async(): Promise<TokenData> => {
    const url = `${API_URL}/refresh`
    console.log("refreshing token:", url)

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    })

    if (!response.ok) {
        throw new Error(`Failed to refresh token: (${response.status})`)
    }

    const json: SignInResponse = await response.json();

    return json.data;
}

export const signOutAPI = async() => {
    const url = `${API_URL}/logout`
    console.log("logging out:", url)

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    })

    if (!response.ok) {
        throw new Error(`Failed to logout: (${response.status})`)
    }
}
