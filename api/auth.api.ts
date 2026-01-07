

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

export interface SignInPayload {
    email: string,
    password: string,
}

export const signInAPI = async (payload: SignInPayload): Promise<TokenData> => {
    const url = `${API_URL}/login`
    console.log("signing in:", url)

    if (!payload.email || !payload.password) {
        throw new Error("Please provide email and password")
    }

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
    await new Promise(res => setTimeout(res, 3000))

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
    console.log("UPDATED CODE ALER")

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

export interface SignUpPayload {
    email: string,
    username: string,
    firstname: string,
    lastname: string,
    password: string,
    passwordVerify: string,
}

export const signUpAPI = async(payload: SignUpPayload) => {
    const url = `${API_URL}/register`
    console.log("singing up:", url)

    if (!payload.email || !payload.password || !payload.username) {
        throw new Error("Please fill all fields")
    }

    if (payload.password != payload.passwordVerify) {
        throw new Error("Passwords don't match")
    }

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            name: payload.firstname,
            lastname: payload.lastname,
            username: payload.username
        })
    })

    if (!response.ok) {
        throw new Error(`Failed to sign up: (${response.status})`)
    }
}
