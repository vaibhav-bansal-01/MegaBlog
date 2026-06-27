import React from "react";
import { Container, postForm } from "../components/index.js";

const AddPostComponent = () => {
  return (
    <div className="py-8">
      <Container>
        <postForm />
      </Container>
    </div>
  );
};

export default Addpost;