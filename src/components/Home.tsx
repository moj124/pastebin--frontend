import styles from "../assets/css/home.module.css";
// import Select, { StylesConfig } from "react-select";

export default function Home(): JSX.Element {
  // const expirationOptions = [
  //   { value: null, label: "Never" },
  //   { value: 10, label: "10 Minutes" },
  //   { value: 60, label: "1 Hour" },
  //   { value: 60 * 24, label: "1 Day" },
  //   { value: 60 * 24 * 7, label: "1 Week" },
  //   { value: 60 * 24 * 7 * 2, label: "2 Weeks" },
  // ];

  // const languageOptions = [{ value: null, label: "None" }];

  // const colourStyles: StylesConfig = {
  //   control: (styles) => ({
  //     ...styles,
  //     backgroundColor: "#191627",
  //     color: "white",
  //   }),
  // option: (styles, { data, isDisabled, isFocused, isSelected }) => {
  //   const color = chroma(data.color);
  //   return {
  //     ...styles,
  //     backgroundColor: isDisabled
  //       ? undefined
  //       : isSelected
  //       ? data.color
  //       : isFocused
  //       ? color.alpha(0.1).css()
  //       : undefined,
  //     color: isDisabled
  //       ? '#ccc'
  //       : isSelected
  //       ? chroma.contrast(color, 'white') > 2
  //         ? 'white'
  //         : 'black'
  //       : data.color,
  //     cursor: isDisabled ? 'not-allowed' : 'default',

  //     ':active': {
  //       ...styles[':active'],
  //       backgroundColor: !isDisabled
  //         ? isSelected
  //           ? data.color
  //           : color.alpha(0.3).css()
  //         : undefined,
  //     },
  //   };
  // },
  // input: (styles) => ({ ...styles, ...dot() }),
  // placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
  // singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  // };

  return (
    <section className={styles.content}>
      <div className={styles.content_grid}>
        <form action="" className={styles.form_grid}>
          <div className={styles.content_syntax}>
            <label htmlFor="syntax-top" className={styles.content_syntax_label}>
              Syntax Highlighting
            </label>
            <input type="checkbox" name="syntax-top" id="toggle" />
          </div>
          <div className={styles.content_item}>
            <label htmlFor="content">New Post</label>
            <textarea
              name="content"
              id="content"
              rows={10}
              className={styles.content_input}
              autoFocus={true}
            ></textarea>
          </div>
          <div className={styles.content_item} id={styles.options}>
            <h3>Optional Settings</h3>
            <div className={styles.content_item}>
              <label htmlFor="syntax-bottom" className={styles.input_label}>
                Syntax Highlighting:
              </label>
            </div>
            <div className={styles.content_item}>
              <label htmlFor="expiration" className={styles.input_label}>
                Post Expiration:
              </label>
            </div>
            <div className={styles.content_item}>
              <label htmlFor="password" className={styles.input_label}>
                Password:
              </label>
              <input
                name="password"
                type="text"
                className={styles.content_input}
              />
            </div>
            <div className={styles.content_item}>
              <label htmlFor="name" className={styles.input_label}>
                Post Title:
              </label>
              <input name="name" type="text" className={styles.content_input} />
            </div>
            <div className={styles.content_item}>
              <span></span>
              <button className="button">Create Post</button>
            </div>
          </div>
        </form>
        <div className={styles.content_item} id={styles.posts}>
          lorem ipsum dolor sit amet, consect
        </div>
      </div>
    </section>
  );
}
