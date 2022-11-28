import React, {useEffect, useState} from 'react';
import './ViewPosts.css'
import PostsList from "../components/PostsList";

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
        <>
            <PostsList
                title={"Posts"}
                posts={posts}/>
        </>
    );
};

export default ViewPosts;