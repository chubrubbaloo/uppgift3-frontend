import {UserContext} from "../../App";
import React, {useContext, useRef, useState} from "react";
import "./CreatePost.css"
import {createPost} from "../../api";

export default function CreatePost({onCreatedPost = (newPostData) => {}}){

    const user = useContext(UserContext)
    const title = useRef()
    const content = useRef()
    const [open, setOpen] = useState(false)

    async function submit(){
        if (!(title.current.value && content.current.value)){
            return
        }
        const newPostData = await createPost(user, title.current.value, content.current.value)
        if ("message" in newPostData){
            alert(newPostData.message)
            return
        }
        onCreatedPost(newPostData)
        clear()
    }

    function clear(){
        title.current.value = ""
        content.current.value = ""
        setOpen(false)
    }
    if (!user){
        return
    }
    if (open) {
        return (
            <div className={"post create"}>
                <h3 className="title" ><input ref={title} type="text" placeholder={"Put a title on your post!"}/></h3>
                <p className="content" ><textarea ref={content} placeholder={"Then write something here!"}/></p>
                <button onClick={submit}>Create Post</button>
            </div>
        )
    }

    return <div className="open-create" onClick={() => setOpen(true)}>Click here to create a new post!</div>
}
