import { Fragment, useState } from "react";
import { Posts } from "../App";



export function EditPost({ title,context,id }: Posts): JSX.Element {
    const [name,setTitle] = useState(title);
    const [text,setContext] = useState(context);

  const updatePost = async (e: React.FormEvent) => {
    // e.preventDefault();
    try {
      const body = { title: name, context: text};
      const response = await fetch(
        `https://aqueous-hollows-72286.herokuapp.com/pastes/${id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body)
        }
      );
      console.log(response)
      // window.location.reload();
    } catch (err: unknown) {
      console.error(err);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${id}`}
      >
        Edit
      </button>

      <div
        className="modal"
        id={`id${id}`}
        onClick={() => setContext(text)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Post</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setContext(text)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input 
                className="form-control"
                value={name}
                onChange={e => setTitle(e.target.value)}
              />
              <textarea
                className="form-control"
                value={text}
                onChange={e => setContext(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={e => updatePost(e)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => {
                    setContext(text);
                    setTitle(name);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}