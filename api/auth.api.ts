

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

export const signIn = async (payload: SignInPayload): Promise<TokenData> => {
    const url = `${API_URL}/login`
    console.log("signing in using url: ", url, new Date().toISOString())
    await new Promise(resolve => setTimeout(resolve, 2000))

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

    const json: SignInResponse = await response.json();
    console.log("got token: ", json.data.access_token)

    return json.data;
}

export const refreshToken = async(): Promise<TokenData> => {
    const url = `${API_URL}/refresh`
    console.log("refreshing token using url: ", url, new Date().toISOString())

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
    console.log("refreshed token: ", json.data.access_token)

    return json.data;
}
