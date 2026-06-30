import React from "react";
import appwriteService from "../appwrite/conf";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="group block">
      <div className="overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
        {/* Image */}
        <div className="h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={
              featuredImage
                ? appwriteService.getFilePreview(featuredImage)
                : "/placeholder.png"
            }
            alt={title}
            className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <h2 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h2>

          <p className="mt-3 text-sm text-gray-500">Click to read more →</p>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
