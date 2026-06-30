import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/conf.js";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  if (!post) return null;

  return (
    <div className="py-12">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Featured Image */}
          <div className="relative mb-10 overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
            <div className="relative flex justify-center items-center h-104 bg-gray-100 rounded-2xl shadow-lg overflow-hidden">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {isAuthor && (
              <div className="absolute top-6 right-6 flex gap-3">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-blue-600 hover:bg-blue-700">Edit</Button>
                </Link>

                <Button
                  bgColor="bg-red-500 hover:bg-red-600"
                  onClick={deletePost}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* Article */}
          <article className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold leading-tight mb-2">
              {post.title}
            </h1>

            <p className="text-gray-500 mb-8">
              Published on {new Date(post.$createdAt).toLocaleDateString()}
            </p>

            <div className="prose prose-lg max-w-none">
              {parse(post.content)}
            </div>
          </article>
        </div>
      </Container>
    </div>
  );
}
