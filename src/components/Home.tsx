import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { expirationOptions } from "../data/expirationOptions";
import capitalize from "../utils/capitalize";
import addMinutesToDate from "../utils/addMinutesToDate";
import highlight from "../utils/highlight";
import Editor from "react-simple-code-editor";
import postDataToEndpoint from "../helper/postDataToEndpoint";
import SyntaxHighlighter from "react-syntax-highlighter";
import Post from "../types/Post";
import PostListItem from "./PostListItem";
import styles from "../assets/css/home.module.css";
import "prismjs/themes/prism.css";
// import "prismjs/components/prism-clike";
// import "prismjs/components/prism-javascript";

export default function Home(): JSX.Element {
  const [posts, setPosts] = useState<Post[]>([]);
  const [mode, setMode] = useState("create");
  const [selectedPost, setSelectedPost] = useState<Post | undefined>();
  const [creationPost, setCreationPost] = useState<Post | undefined>();

  const [content, setContent] = useState("");
  const [syntaxHighlighted, setSyntaxHighlight] = useState(false);
  const [syntaxLanguage, setSyntaxLanguage] = useState("None");
  const [, setExpirationDate] = useState<Date>();
  const [postDate, setPostDate] = useState<Date>(new Date());
  const [postPassword, setPostPassword] = useState("");
  const [postTitle, setPostTitle] = useState("");

  const [postExpiration, setPostExpiration] = useState(0);
  const { reset, register } = useForm({ reValidateMode: "onChange" });

  const select_expiration_options = expirationOptions.map((element, index) => (
    <option key={index} className={styles.custom_option} value={element.value}>
      {element.label}
    </option>
  ));

  const codingLanguages = ["None", ...SyntaxHighlighter.supportedLanguages];

  const select_syntax_options = codingLanguages.map((element, index) => (
    <option
      key={index}
      className={styles.custom_option}
      value={element.toLowerCase()}
    >
      {capitalize(element)}
    </option>
  ));

  const view_posts = posts.map((element, index) => (
    <PostListItem
      key={index}
      post={element}
      posts={posts}
      postMode={mode}
      selectedPost={selectedPost}
      setPosts={(posts: Post[]) => setPosts(posts)}
      setSelectedPost={(post: Post) => setSelectedPost(post)}
      handleEdit={() => handleEdit(element)}
    />
  ));

  useEffect(() => {
    const getPostsFromEndpoint = async (endpoint: `/${string}`) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API + endpoint}`);
        setPosts(await response.json());
      } catch (err) {
        console.log(err);
      }
    };
    getPostsFromEndpoint("/pastes");
  }, []);

  const resetInputs = () => {
    reset({ content: "", name: "", password: "" });
  };

  const handleEdit = async (post: Post) => {
    setContent(post.content);
    setPostTitle(post.title);
    setPostDate(post.date);
    setPostPassword(post.password);
    setSyntaxLanguage(post.language);
    setSyntaxHighlight(post.language.toLowerCase() === "none" ? false : true);
    setExpirationDate(post.expiration);
    setPostExpiration(0);
    setMode("edit");
  };

  const handleFormSubmission = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let title: string;

    if (postTitle === "") {
      title = "Untitled";
    } else {
      title = postTitle;
    }
    setPostDate(new Date());

    const post: Post = {
      post_id: nanoid(10),
      title: title,
      language: syntaxLanguage,
      expiration: addMinutesToDate(postDate, postExpiration),
      date: postDate,
      password: postPassword,
      content: content,
    };

    postDataToEndpoint("/pastes", post);
    setPosts([...posts, post]);
    // setFormSubmitted(true);
    reset({ content: "", name: "", password: "" });
  };

  return (
    <section className={styles.content}>
      <div className={styles.content_grid}>
        <form onSubmit={handleFormSubmission} className={styles.form_grid}>
          <div
            className={
              mode === "edit"
                ? styles.content_syntax_edit
                : styles.content_syntax_create
            }
          >
            {mode === "edit" && (
              <button
                className={styles.post_create}
                id={styles.new_post_button}
                onClick={() => {
                  setMode("create");
                  resetInputs();
                }}
              >
                Create Post
              </button>
            )}
            {mode === "edit" && (
              <div className={styles.date_info}>
                {/* {postDate.toLocaleString()} {expirationDate?.toLocaleString()} */}
              </div>
            )}

            <div className={styles.syntax_toggle}>
              <label
                htmlFor="syntax-top"
                className={
                  syntaxHighlighted
                    ? styles.content_syntax_label_highlight
                    : styles.content_syntax_label
                }
              >
                Syntax Highlighting
              </label>
              <input
                type="checkbox"
                id="toggle"
                onClick={() => {
                  setSyntaxHighlight(!syntaxHighlighted);
                }}
                {...register("syntax-top")}
              />
            </div>
          </div>
          <div className={styles.content_item}>
            <label htmlFor={syntaxHighlighted ? "content-code" : "content"}>
              {mode === "create" ? "New Post" : "Edit Post"}
            </label>
            {syntaxHighlighted ? (
              <Editor
                {...register("content-code")}
                id="content-code"
                value={content}
                onValueChange={(code) => setContent(code)}
                highlight={(code) => highlight(code, syntaxLanguage)}
                padding={10}
                className={styles.content_input}
                autoFocus={true}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  height: "200px",
                  fontSize: 14,
                }}
              />
            ) : (
              <textarea
                {...register("content")}
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                className={styles.content_input}
                autoFocus={true}
              ></textarea>
            )}
          </div>

          <div className={styles.content_item} id={styles.options}>
            <h3>Optional Settings</h3>
            <div
              className={
                syntaxHighlighted
                  ? styles.content_item
                  : styles.content_item_hide
              }
            >
              <label htmlFor="syntax-bottom" className={styles.input_label}>
                Syntax Highlighting:
              </label>
              <select
                {...register("syntax")}
                id="syntax"
                className={styles.select}
                onChange={(event) => {
                  setSyntaxLanguage(event.target.value);
                }}
                disabled={!syntaxHighlighted}
              >
                {select_syntax_options}
              </select>
            </div>
            <div className={styles.content_item}>
              <label htmlFor="expiration" className={styles.input_label}>
                Post Expiration:
              </label>
              <select
                {...register("expiration")}
                id="expiration"
                onChange={(event) =>
                  setPostExpiration(parseInt(event.target.value))
                }
                className={styles.select}
              >
                {select_expiration_options}
              </select>
            </div>
            <div className={styles.content_item}>
              <label htmlFor="password" className={styles.input_label}>
                Password:
              </label>
              <input
                {...register("password")}
                type="text"
                value={postPassword}
                onChange={(event) => setPostPassword(event.target.value)}
                className={styles.content_input}
              />
            </div>
            <div className={styles.content_item}>
              <label htmlFor="name" className={styles.input_label}>
                Post Title:
              </label>
              <input
                {...register("name")}
                type="text"
                value={postTitle}
                onChange={(event) => setPostTitle(event.target.value)}
                className={styles.content_input}
              />
            </div>
            <div className={styles.content_item}>
              <span></span>
              <button type="submit" className="button">
                {mode === "create" ? "Create Post" : "Update Post"}
              </button>
            </div>
          </div>
        </form>
        <div
          className={styles.content_item}
          id={mode === "edit" ? styles.posts_edit : styles.posts_create}
        >
          {posts.length !== 0 ? (
            view_posts
          ) : (
            <h4>No valid posts have been created...</h4>
          )}
        </div>
      </div>
    </section>
  );
}
