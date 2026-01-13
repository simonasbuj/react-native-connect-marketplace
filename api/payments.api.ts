
const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/api/v1/payments`


interface Seller {
    seller_id: string
    url: string
    provider: string
}
interface LinkSellerResponse {
    data: Seller
}

export const linkSellerAPI = async(accessToken: string): Promise<Seller> => {
    const url = `${API_URL}/link-seller`
    console.log("refreshing token:", url)

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            refresh_url: `${process.env.EXPO_PUBLIC_API_URL}/frontend/link-seller.html?linkRefresh=true`,
            return_url: `${process.env.EXPO_PUBLIC_API_URL}/frontend/link-seller.html?linkReturn=true`,
        })
    })

    if (!response.ok) {
        throw new Error(`Failed to create link-seller session: (${response.status})`)
    }

    const json: LinkSellerResponse = await response.json()

    return json.data
}

interface CheckoutSession {
    url: string
}

interface CheckoutSessionResponse {
    data: {
        url: string
    }
}

export const createCheckoutSessionAPI = async(accessToken: string, itemId: string): Promise<CheckoutSession> => {
    const url = `${API_URL}/${itemId}`
    console.log("creating checkout session:", url)

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            success_url: `${process.env.EXPO_PUBLIC_API_URL}/frontend/payment.html?success=true&itemId=${itemId}`,
            cancel_url: `${process.env.EXPO_PUBLIC_API_URL}/frontend/payment.html?cancel=true&itemId=${itemId}`,
        })
    })

    if (!response.ok) {
        throw new Error(`Failed to create checkout session: (${response.status})`)
    }

    const json: CheckoutSessionResponse = await response.json()

    return json.data
}
