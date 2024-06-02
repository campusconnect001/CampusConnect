import React, { useContext } from "react";
import { PostCard } from "../../Home/Post/PostCard";
import { AdsCard } from "../../Home/Ads/AdsCard";
import { LoadingPost } from "../../Home/Post/LoadingPost";
import { LoadingBlog } from "../../Home/Blog/LoadingBlog";
import { LoadingAds } from "../../Home/Ads/LoadingAds";
import { BlogCard } from "../../Home/Blog/BlogCard";
import { PostContext } from "../../../../context/postContext/postContext";
import { AdsContext } from "../../../../context/adsContext/AdsContext";
import { Grid } from "@material-ui/core";
import CameraIcon from "@material-ui/icons/Camera";
import { BlogContext } from "../../../../context/blogContext/BlogContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

export const HomeTab = ({
  data,
  type,
  isLoading,
  updatePostList,
  deletePost,
}) => {
  // const postContext = useContext(PostContext);
  // const blogContext = useContext(BlogContext);
  // const adsContext = useContext(AdsContext);

  console.log(data);
  if (type === "post")
    return (
      <div className="mt-3">
        {!isLoading ? (
          data.length > 0 ? (
            data.map((post) => {
              return (
                <PostCard
                  updatePostList={updatePostList}
                  deletePost={deletePost}
                  post={post}
                  key={post.id}
                />
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
          )
        ) : (
          <LoadingPost />
        )}
      </div>
    );

  if (type === "blog")
    return (
      <div className="mt-3">
        {!isLoading ? (
          data.length > 0 ? (
            data.map((blog) => {
              return <BlogCard blog={blog} key={blog._id} />;
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
                <FontAwesomeIcon icon={faPencilAlt} fontSize="large" />
                <h6 className="mt-2">No blog out there</h6>
              </Grid>
            </div>
          )
        ) : (
          <LoadingBlog />
        )}
      </div>
    );
  if (type === "ads")
    return (
      <div className="mt-3">
        {!isLoading ? (
          data.length > 0 ? (
            data.map((ads) => {
              return <AdsCard ads={ads} key={ads._id} />;
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
                <FontAwesomeIcon icon={faPencilAlt} fontSize="large" />
                <h6 className="mt-2">No ad out there</h6>
              </Grid>
            </div>
          )
        ) : (
          <LoadingAds />
        )}
      </div>
    );
};
