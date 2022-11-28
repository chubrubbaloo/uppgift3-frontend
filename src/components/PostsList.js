import React from 'react';
import './PostsList.css'

const PostsList = ({posts, title}) => {
    return (
        <div className="todo-list">
            <h2> {title} </h2>
            <ul>
                {
                    posts.map((post) => (
                        <li key={post.title}>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <p>Posted by: <b>{post.creator.username}</b></p>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default PostsList;