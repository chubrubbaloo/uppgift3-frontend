const backendUrl = "http://localhost:8080";

export async function fetchData() {
    const response = await fetch(`${backendUrl}/posts/getAll`);
    return await response.json();
}

export async function register(username, password) {
    const response = await fetch(`${backendUrl}/register`,
        {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password}),
        }
    )
    //return await response.json()
    // Lägg in felhantering: user already exists... ((returnera felmeddelande från server -> front-end-div))
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
