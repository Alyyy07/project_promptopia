"use client";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";


const MyProfile = () => {
  const router = useRouter();
  const {data:session} = useSession();
  const [posts,setPosts] = useState(false);
  
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure want to delete this prompt ?");

    if(hasConfirmed){
      try {
        await fetch(`/api/prompt/${post._id.toString()}`,{
          method:"DELETE",
        })

        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (session){

      const fetchPosts = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        setPosts(data);
      };
      if(session?.user.id)fetchPosts();
    } else {
      router.push("/");
    }

    });
  return (
  <>
  {posts ? <Profile name="My" desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire the others with the power of your imagination " data={posts} handleEdit={()=> handleEdit} handleDelete={()=> handleDelete} />
  : <Image src="/assets/icons/loader.svg" alt="loading" width={100} height={100} className="mt-10"/> }
  </>);
};

export default MyProfile;
