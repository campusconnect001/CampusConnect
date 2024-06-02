import React, { useContext, useEffect, useState } from "react";
import { Home } from "../../../common/Base/Home";
import { PostCard } from "./PostCard";
import CameraIcon from "@material-ui/icons/Camera";
import { LoadingPost } from "./LoadingPost";
import { Grid } from "@material-ui/core";
import ServiceConfig from "../../../../helpers/service-endpoint";
import HttpRequestPrivate from "../../../../helpers/private-client";
import { toast } from "react-toastify";
import { ThemeContext } from "../../../../context/themeContext";
import { NewAuthContext } from "../../../../context/newAuthContext";

export const Post = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const { theme } = useContext(ThemeContext);
  const { tokens } = useContext(NewAuthContext);

  async function getPosts() {
    setIsLoading(true);
    try {
      const requestOptions = {
        url: ServiceConfig.postEndpoint,
        method: "GET",
        showActual: true,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${tokens?.access_token}`, // Assuming 'userToken' holds the token
        },
      };
      const response = await HttpRequestPrivate(requestOptions);
      console.log(response);
      setIsLoading(false);
      if (response.data.data) {
        setPosts(response.data.data);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deletePost = async (postId) => {
    try {
      const updatedPosts = posts.filter((post) => post.id !== postId);
      setPosts(updatedPosts);
      const requestOptions = {
        url: `${ServiceConfig.postEndpoint}/${postId}`,
        method: "DELETE",
        showActual: true,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${tokens?.access_token}`, // Assuming 'userToken' holds the token
        },
      };
      const response = await HttpRequestPrivate(requestOptions);
      if (response.data.data) {
        toast.success(response.data.message, {
          theme: `${theme === "dark" ? "dark" : "light"}`,
        });
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message, {
        theme: `${theme === "dark" ? "dark" : "light"}`,
      });
    }
  };

  const updatePostList = (updatedPost) => {
    if (updatedPost) {
      const updatedPosts = posts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      );
      setPosts(updatedPosts);
    }
  };

  return (
    <Home>
      <div className="px-2">
        {isLoading ? (
          <LoadingPost />
        ) : posts.length > 0 ? (
          posts.map((post) => {
            return (
              <div key={post.id}>
                <PostCard
                  updatedPost={updatePostList}
                  deletePost={deletePost}
                  post={post}
                />
              </div>
            );
          })
        ) : (
          <div
            className="m-auto"
            style={{
              height: "30vh",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid
              container
              spacing={3}
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <CameraIcon fontSize="large" />
              <h6 className="mt-2">No post out there</h6>
            </Grid>
          </div>
        )}
      </div>
    </Home>
  );
};
