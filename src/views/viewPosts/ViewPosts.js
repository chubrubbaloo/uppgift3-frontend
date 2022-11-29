import React, {useEffect, useState} from 'react';
import * as api from "../../api";
import Post from "../../components/post/Post";
import CreatePost from "../../components/createPost/CreatePost";

const ViewPosts = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function getPosts() {
            const data = await api.fetchData();
            setPosts(await data);
        }

        getPosts();
    }, []);

    function addPost(postData){
        setPosts([postData, ...posts])
    }

    return (
        <div className="posts">
            <h2>Posts</h2>
            <ul>
                <li>
                    <CreatePost onCreatedPost={addPost}/>
                </li>
                {posts.map((post) => (
                    <li key={post.title}>
                        <Post title={post.title} content={post.content} creator={post.creator}/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewPosts;
