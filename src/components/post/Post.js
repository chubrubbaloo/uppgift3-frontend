import React, {useContext, useRef, useState} from "react";
import './Post.css'
import {UserContext} from "../../App";
import {FaPen, FaWindowClose, FaSave, FaMinusCircle} from 'react-icons/fa';
import * as api from "../../api"

export default function Post({title, content, creator, onDelete = (title) => {}, onEdit = (post) => {}}) {
    const user = useContext(UserContext)
    const [editing, setEditing] = useState(false)
    const contentE = useRef()

    const owner = user? user.username === creator.username: false

    function onEditPost(){
        setEditing(true)
    }

    function closeEdit(){
        setEditing(false)
    }

    async function onSave(){
        const newPostData = await api.editPost(user, title, contentE.current.value)
        console.log(newPostData)
        if ("message" in newPostData){
            alert(newPostData.message)
            return
        }
        onEdit(newPostData)
        setEditing(false)
    }

    async function onDeletePost(){
        if (await api.deletePost(user, title)){
            console.log("---------------------------------------")
            console.log(title)
            onDelete(title)
            return
        }
        alert("something went wrong when deleting this post!")
        setEditing(false)
    }

    if (!editing){
        return (
            <div className="post">
                {owner? <div onClick={onEditPost} className="edit button"><FaPen/></div>: null}
                <h3>{title}</h3>
                <p>{content}</p>
                <p>Posted by: <b>{owner? "You": creator.username}</b></p>
            </div>
        )
    }
    return (
        <div className={'create post'}>
            <div onClick={closeEdit} className="edit button"><FaWindowClose/></div>
            <h3>{title}</h3>
            <p className={"content"}><textarea ref={contentE}  defaultValue={content}/></p>
            <div onClick={onSave} className="save button"><FaSave/> save</div>
            <div onClick={onDeletePost} className="delete button"><FaMinusCircle/> delete</div>
        </div>
    )
}
