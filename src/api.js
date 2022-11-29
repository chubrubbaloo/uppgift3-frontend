
const apiUrl = "http://localhost:8080"


export async function login(username, password) {
    
    
    const response = await fetch(`${apiUrl}/login`,
        {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password})
           
        }
        
    )
   
    return await response.json();
}