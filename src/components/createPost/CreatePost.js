import {UserContext} from "../../App";
import React, {useContext, useRef} from "react";
import "./CreatePost.css"
import {createPost} from "../../api";

export default function CreatePost({onCreatedPost = (newPostData) => {}}){

    const user = useContext(UserContext)
    const title = useRef()
    const content = useRef()

    async function submit(){
        if (!(title.current.value && content.current.value)){
            return
        }
        const newPostData = await createPost(user, title.current.value, content.current.value)
        console.log(newPostData)
        onCreatedPost(newPostData)
        clear()
    }

    function clear(){
        title.current.value = ""
        content.current.value = ""
    }

    return (
        <div className={"post create"}>
            <h3 className={"title"} ><input ref={title} type="text" placeholder={"Put a title on your post!"}/></h3>
            <p className={"content"} ><textarea ref={content} placeholder={"Then write something here!"}/></p>
            <button onClick={submit}>Create Post</button>
        </div>
    )
}
