import React, {useContext, useRef, useState} from "react";
import './Post.css'
import {UserContext} from "../../App";
import {FaPen, FaWindowClose, FaSave, FaMinusCircle} from 'react-icons/fa';
import * as api from "../../api"

export default function Post({title, initContent, creator, onDelete = (title) => {}, onEdit = (post) => {}}, on401 = () => {}) {
    const user = useContext(UserContext)
    const [editing, setEditing] = useState(false)
    const content = useRef()

    const owner = user? user.username === creator.username: false

    function onEditPost(){
        setEditing(true)
    }

    function closeEdit(){
        setEditing(false)
    }

    async function onSave(){
        const newPostData = await api.editPost(user, title, content.current.value)
        if ("message" in newPostData){
            if (!newPostData.message){
                on401()
            }else {
                alert(newPostData.message)
            }
            return
        }
        setEditing(false)
        onEdit(newPostData)
    }

    async function onDeletePost(){
        if (await api.deletePost(user, title)){
            onDelete(title)
            return
        }
        alert("something went wrong when deleting this post! try again later.")
        setEditing(false)
    }

    if (!editing){
        return (
            <div className="post">
                {owner? <div onClick={onEditPost} className="edit button"><FaPen/></div>: null}
                <h3>{title}</h3>
                <p>{initContent}</p>
                <p>Posted by: <b>{owner? "You": creator.username}</b></p>
            </div>
        )
    }
    return (
        <div className={'create post'}>
            <div onClick={closeEdit} className="edit button"><FaWindowClose/></div>
            <h3>{title}</h3>
            <p className={"content"}><textarea ref={content}  defaultValue={initContent}/></p>
            <div onClick={onSave} className="save button"><FaSave/> save</div>
            <div onClick={onDeletePost} className="delete button"><FaMinusCircle/> delete</div>
        </div>
    )
}
