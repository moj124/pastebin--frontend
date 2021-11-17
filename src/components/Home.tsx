import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import styles from "../assets/css/home.module.css";
import capitalize from "../utils/capitalize";
import Editor from "react-simple-code-editor";
import SyntaxHighlighter from "react-syntax-highlighter";
import "prismjs/themes/prism.css";
// import "prismjs/components/prism-clike";
// import "prismjs/components/prism-javascript";
import highlight from "../utils/highlight";
import Post from "../types/Post";
import addMinutesToDate from "../utils/addMinutesToDate";
import PostListItem from "./PostListItem";
import { expirationOptions } from "../data/expirationOptions";

export default function Home(): JSX.Element {
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState("");
  const [syntaxHighlighted, setSyntaxHighlight] = useState(false);
  const [syntaxLanguage, setSyntaxLanguage] = useState("None");
  const [postExpiration, setPostExpiration] = useState(0);
  const [postDate, setPostDate] = useState<Date>(new Date());
  const [postPassword, setPostPassword] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({ reValidateMode: "onChange" });

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
    <PostListItem key={index} post={element} />
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

  const postDataToEndpoint = async (endpoint: `/${string}`, post: Post) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API + endpoint}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      setPosts([...posts, (await response.json()).data]);
    } catch (err) {
      console.log(err);
    }
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
      id: nanoid(10),
      title: title,
      language: syntaxLanguage,
      expiration: addMinutesToDate(postDate, postExpiration),
      date: postDate,
      password: postPassword,
      content: content,
    };

    postDataToEndpoint("/pastes", post);

    const getPostsFromEndpoint = async (endpoint: `/${string}`) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API + endpoint}`);
        setPosts(await response.json());
      } catch (err) {
        console.log(err);
      }
    };
    getPostsFromEndpoint("/pastes");

    setPostPassword("");
    setPostTitle("");
    setContent("");
  };

  return (
    <section className={styles.content}>
      <div className={styles.content_grid}>
        <form onSubmit={handleFormSubmission} className={styles.form_grid}>
          <div className={styles.content_syntax}>
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
              name="syntax-top"
              id="toggle"
              onClick={() => {
                setSyntaxHighlight(!syntaxHighlighted);
              }}
            />
          </div>
          <div className={styles.content_item}>
            <label htmlFor="content">New Post</label>
            {syntaxHighlighted ? (
              <Editor
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
                name="content"
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
            <div className={styles.content_item}>
              <label htmlFor="syntax-bottom" className={styles.input_label}>
                Syntax Highlighting:
              </label>
              <select
                name="syntax"
                id="syntax"
                className={styles.select}
                onChange={(event) => {
                  setSyntaxLanguage(event.target.value);
                }}
              >
                {select_syntax_options}
              </select>
            </div>
            <div className={styles.content_item}>
              <label htmlFor="expiration" className={styles.input_label}>
                Post Expiration:
              </label>
              <select
                name="expiration"
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
                name="password"
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
                name="name"
                type="text"
                value={postTitle}
                onChange={(event) => setPostTitle(event.target.value)}
                className={styles.content_input}
              />
            </div>
            <div className={styles.content_item}>
              <span></span>
              <button type="submit" className="button">
                Create Post
              </button>
            </div>
          </div>
        </form>
        <div className={styles.content_item} id={styles.posts}>
          {view_posts}
        </div>
      </div>
    </section>
  );
}
