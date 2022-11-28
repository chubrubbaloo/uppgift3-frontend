const backendUrl = "http://localhost:8080";

export async function fetchData() {
    const response = await fetch(`${backendUrl}/posts/getAll`);
    return await response.json();
}