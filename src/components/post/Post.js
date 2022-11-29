import React from "react";

export default function Post({title, content, creator}) {

    return (
        <div>
            <h3>{title}</h3>
            <p>{content}</p>
            <p>Posted by: <b>{creator.username}</b></p>
        </div>
    )
}
