import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/conf.js";
import { Container, PostCard } from "../components/index.js";

const AllPostComponent = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {}, []);

  appwriteService.getAllPosts([]).then((posts) => setPosts(posts));

  return (
    <div className="py-8 w-full">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div className="p-2 w-1/4">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Allpost;
