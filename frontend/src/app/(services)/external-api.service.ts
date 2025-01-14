const apiUrl = process.env.API_URL;

export async function getExternalApiWithAuth(path: string, accessToken: string) {
    return await fetch(`${apiUrl}/${path}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    });
}

export async function postExternalApiWithAuth(path: string, accessToken: string, body: any) {
    return await fetch(`${apiUrl}/${path}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    });
}