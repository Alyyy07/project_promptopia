"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import Image from "next/image";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    const fetchPosts = async () => {
      setPosts(false);
      const response = await fetch("/api/prompt");
      const data = await response.json();
      const filteredData = data.filter((data) => data.prompt.includes(searchText) || data.creator.email.includes(searchText) || data.creator.username.includes(searchText) || data.tag.includes(searchText));
      setPosts(filteredData);
    };
    fetchPosts();
  };

  const handleTagClick = async (tag) => {
    const fetchPosts = async (tag) => {
      setPosts(false);
      const response = await fetch("/api/prompt");
      const data = await response.json();
      const filteredData = data.filter((data) => data.tag.includes(tag));
      setPosts(filteredData);
      setSearchText(tag);
    };
    fetchPosts(tag);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      {posts ? (
        <>
          <form className="relative w-full flex-center flex" onSubmit={(e) => handleSearch(e)}>
            <input
              type="search"
              placeholder="Search for a tag or a username"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              className="search_input peer"
            />
          </form>

          <PromptCardList data={posts} handleTagClick={handleTagClick} />
        </>
      ) : (
        <Image src="/assets/icons/loader.svg" alt="loading" width={100} height={100} className="mt-10" />
      )}
    </section>
  );
};

export default Feed;
