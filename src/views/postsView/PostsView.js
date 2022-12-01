import React, {useEffect, useState} from 'react';
import * as api from "../../api";
import Post from "../../components/post/Post";
import CreatePost from "../../components/createPost/CreatePost";
import './PostsView.css'

const PostsView = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function getPosts() {
            const data = await api.fetchData();
            setPosts(await data);
        }
        getPosts();
    }, []);

    function addPost(postData) {
        setPosts([postData, ...posts])
    }

    function onPostDelete(title){
        const deletedPosts = posts.filter((post) => post.title !== title)
        setPosts(deletedPosts)
    }

    function onPostEdit(editedPost){
        const changedPosts = posts.map((post) => {
            if (post.title === editedPost.title){
                return {...post, content:editedPost.content}
            }
            return post
        })
        setPosts(changedPosts)
    }

    return (
        <div className="posts-container">
            <div className="posts">
                <h2>Posts</h2>
                <ul>
                    <li>
                        <CreatePost onCreatedPost={addPost}/>
                    </li>
                    {posts.map((post) => (
                        <li key={post.title}>
                            <Post title={post.title} initContent={post.content} creator={post.creator} onEdit={onPostEdit} onDelete={onPostDelete}/>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PostsView;
