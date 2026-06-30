import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index.js";
import appwriteService from "../../appwrite/conf.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "", // <-- change this line
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  console.log("Title:", post?.title);
  console.log("ID:", post?.$id);

  const submit = async (data) => {
    try {
      if (post) {
        const file = data.image[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file) {
          await appwriteService.deleteFile(post.featuredImage);
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined,
        });


        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        const file = await appwriteService.uploadFile(data.image[0]);

        if (file) {

          const dbPost = await appwriteService.createPost({
            ...data,
            featuredImage: file.$id,
            userId: userData.$id,
          });


          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d]+/g, "-");
    }
    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  const [preview, setPreview] = useState(
    post ? appwriteService.getFilePreview(post.featuredImage) : null,
  );

  return (
    <div>
      <div className="mb-10 ml-4">
        <h1 className="text-4xl font-bold text-gray-900">
          {post ? "Edit Post" : "Create New Post"}
        </h1>
        <p className="text-gray-500 mt-2">
          Share your thoughts with the world.
        </p>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
          <div className="w-3/4 px-2">
            <Input
              label="Title"
              placeholder="Title"
              className="mb-4"
              {...register("title", { required: true })}
            />
            <Input
              label="Slug"
              placeholder="Slug"
              className="mb-4"
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
            />
            <RTE
              label="Content"
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
          </div>
          <div className="w-1/4 px-2">
            <Input
              label="Featured Image"
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", { required: !post })}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />
            {preview && (
              <div className="mt-5">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-56 rounded-xl object-contain border border-gray-300"
                />
              </div>
            )}
            <Select
              options={["active", "inactive"]}
              label="Status"
              className="mb-4"
              {...register("status", { required: true })}
            />
            <Button
              type="submit"
              bgColor={post ? "bg-green-500" : undefined}
              className="w-full py-2 text-lg rounded-xl"
            >
              {post ? "Update Post" : "🚀 Publish Post"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
