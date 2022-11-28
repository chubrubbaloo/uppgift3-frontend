import React, {useEffect, useState} from 'react';
import '../components/PostsList.css'
import PostsList from "../components/PostsList";
import * as api from "../api";

const ViewPosts = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function getPosts(){
            const data = await api.fetchData();
            setPosts(data);
        }
        getPosts();
    },[]);

    return (
        <>
            <PostsList
                title={"Posts"}
                posts={posts}/>
        </>
    );
};

export default ViewPosts;