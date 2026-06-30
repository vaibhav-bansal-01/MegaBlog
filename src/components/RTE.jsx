import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full bg-white rounded-2xl shadow-lg">
      <label className="block text-md font-semibold text-gray-700 mb-2 ml-1">
          {label}
        </label>
      <Controller
        name={name || "content"} //means everything in the form needs to be stored inside content or the given feild name
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => {
          return (
            <Editor
              apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
              value={value}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                content_style:
                  "body { font-family:Helvetica, Arial, sans-serif; font-size: 14px;}",
              }}
              onEditorChange={onChange}
            />
          );
        }}
      />
    </div>
  );
}
