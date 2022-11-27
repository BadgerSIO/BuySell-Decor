import React from "react";

const BlogCard = ({ blog }) => {
  const { question, image, ans, _id } = blog;
  return (
    <div id={_id} className="my-5 space-y-5 border-b py-5">
      <h1 className="text-2xl md:text-3xl lg:text-4xl">{question}</h1>
      <div>
        <img src={image} alt={ans} className="w-full " />
      </div>
      <div>
        {ans.includes("\\n") ? (
          ans.split("\\n").map((content, i) => (
            <p className="text-xl text-justify" key={i}>
              {content}
            </p>
          ))
        ) : (
          <p className="text-xl text-justify">{ans}</p>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
