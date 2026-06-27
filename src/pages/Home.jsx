import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/conf.js";
import { Container, PostCard } from "../components/index.js";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getAllPosts([]).then((posts) => setPosts(posts));
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-cnetre">
        <Container>
          <div className="flex felx-wrap">
            <div className="p-2 w-full">
              <h1 className="text-4xl font-bold">No Posts Yet</h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-8 w-full">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div className="p-2 w-1/4" key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
