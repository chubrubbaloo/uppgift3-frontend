import React, {useEffect, useState} from 'react';
import * as api from "../../api";
import Post from "../../components/post/Post";
import './ViewPosts.css'

const ViewPosts = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function getPosts() {
            const data = await api.fetchData();
            setPosts(await data);
        }

        getPosts();
    }, []);

    return (
        <div className="post-container">
            <h2>Posts</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post.title} className="post">
                        <Post title={post.title} content={post.content} creator={post.creator}/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewPosts;
