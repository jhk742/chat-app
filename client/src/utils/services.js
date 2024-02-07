export const baseUrl = "http://localhost:5000/api"

export const postRequest = async (url, body) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body
    })

    const data = await res.json()

    if (!res.ok) {
        let message = data?.message ? data.message : data
        return {error: true, message}
    }

    return data
}

export const getRequest = async (url) => {
    const res = await fetch(url)

    const data = await res.json()

    if (!res.ok) {
        let message = data?.message ? data.message : "An error occurred while trying to retrieve the chat log"
        return {error: true, message}
    }

    return data
}