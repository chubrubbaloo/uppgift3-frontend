const backendUrl = "http://localhost:8080";

/*const [jwt, setJwt] = useLocalState("", "jwt");*/

export async function fetchData() {
    const response = await fetch(`${backendUrl}/posts/getAll`);
    return await response.json();
}

export async function register(username, password) {
    await fetch(`${backendUrl}/register`,
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
        mode: 'cors',
        headers: {
            'authorization': "bearer " + user.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: title, content: content})
    });

    if (response.status !== 200){
        return {message: await response.text()}
    }
    return await response.json();
}

export async function editPost(user, title, newContent) {
    if (!(user)){
        throw new Error("First login to post!")
    }
    const response = await fetch(`${backendUrl}/posts`, {
        method:"PUT",
        mode: 'cors',
        headers: {
            'authorization': "bearer " + user.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: title, updatedContent: newContent})
    });
    if (response.status !== 200){
        return {message: await response.text()}
    }
    return await response.json();
}

export async function deletePost(user, title) {
    if (!(user)){
        throw new Error("First login to post!")
    }
    const response = await fetch(`${backendUrl}/posts`, {
        method:"DELETE",
        mode: 'cors',
        headers: {
            'authorization': "bearer " + user.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: title})
    });

    return response.status === 200
}

export async function login(username, password) {

    const response = await fetch(`${backendUrl}/login`,
        {
            method: "POST",
            mode: "cors",
            headers: {

                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password})

        })



           if (response.status === 200) {

            return await response.json();
           }
            else
            return {message:"Invalid login attempt, please register!"};


}

