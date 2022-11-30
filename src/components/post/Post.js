import React from "react";
import './Post.css'

export default function Post({title, content, creator}) {

    return (
        <div className="post">
            <h3>{title}</h3>
            <p>{content}</p>
            <p>Posted by: <b>{creator.username}</b></p>
        </div>
    )
}
