import Post from "../types/Post";
import styles from "../assets/css/post_list_item.module.css";
import TimeAgo from "timeago-react";

interface PostListItemProps {
  post: Post;
  posts: Post[];
  postMode: string;
  selectedPost: Post | undefined;
  setSelectedPost(post: Post | undefined): void;
  setPosts(posts: Post[]): void;
  handleEdit(): void;
}

export default function PostListItem({
  post,
  posts,
  postMode,
  selectedPost,
  setSelectedPost,
  setPosts,

  handleEdit,
}: PostListItemProps): JSX.Element {
  const deletePostItem = async (item: Post) => {
    console.log(item);
    await fetch(`${process.env.REACT_APP_API}/pastes/${item.post_id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify([item.post_id]),
    });
    setPosts([...posts.filter((element) => element.post_id !== item.post_id)]);
  };

  return (
    <div className={styles.post_list_item}>
      <h1
        className={
          selectedPost?.post_id !== post.post_id
            ? styles.post_title
            : styles.post_title_highlight
        }
      >
        {post.title}
      </h1>
      <div className={styles.post_item_info}>
        <TimeAgo
          style={{ opacity: 0.3, fontSize: "0.8rem" }}
          datetime={post.date}
        />
        <div className={styles.post_item_icons}>
          <i
            className="uil uil-edit"
            id="icon"
            onClick={() => {
              handleEdit();
              setSelectedPost(post);
            }}
          ></i>
          <i
            className="uil uil-trash-alt"
            id="icon"
            onClick={() => {
              deletePostItem(post);
            }}
          ></i>
        </div>
      </div>
      <hr />
    </div>
  );
}
