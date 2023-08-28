"use client";

import Profile from "@components/Profile";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";


const ProfilePage = ({params}) => {
  const router = useRouter();
  const [posts,setPosts] = useState(false);
  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  },[]);
  return (
  <>
  {posts ? <Profile name={`${params.username}'s`} desc={`Welcome to ${params.username} personalized profile page. Explore ${params.username} exceptional prompts and be inspired by the power of their imagination `} data={posts}/>
  : <Image src="/assets/icons/loader.svg" alt="loading" width={100} height={100} className="mt-10"/> }
  </>);
};

export default ProfilePage;
