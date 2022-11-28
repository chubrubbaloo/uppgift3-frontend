import React, {useEffect, useState} from 'react';
import './ViewPosts.css'

const ViewPosts = () => {
    const url = 'http://localhost:8080/posts/getAll';

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const result = await fetch(url);

            setPosts(await result.json());
        }
        fetchPosts();
    }, []);


    return (
        <div className="todo-list">
            <h2>Posts</h2>
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

export default ViewPosts;