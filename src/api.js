const backendUrl = "http://localhost:8080";

export async function fetchData() {
    const response = await fetch(`${backendUrl}/posts/getAll`);
    return await response.json();
}

export async function createPost(user, title, content) {
    if (!(user)){
        throw new Error("First login to post!")
    }
    const response = await fetch(`${backendUrl}/posts`, {
        method:"POST",
        headers: {
            'authorization': "bearer: " + user.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: title, content: content})

    });
    return await response.json();
}
