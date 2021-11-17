import Post from "../types/Post";
import styles from "../assets/css/post_list_item.module.css";
import TimeAgo from "timeago-react";

interface PostListItemProps {
  post: Post;
}

export default function PostListItem({ post }: PostListItemProps): JSX.Element {
  return (
    <div className={styles.post_list_item}>
      <h1 className={styles.post_title}>{post.title}</h1>
      <TimeAgo
        style={{ opacity: 0.3, fontSize: "0.8rem" }}
        datetime={post.date}
      />
    </div>
  );
}
