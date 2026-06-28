import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../components/index.js";
import appwriteService from "../appwrite/conf.js";
import { useParams, useNavigate } from "react-router-dom";

function Editpost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => setPost(post));
    } else {
      navigate("/");
    }
  }, []);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default Editpost;
