import {Posts} from '../App';
import { EditPost } from './EditPost';

interface Props {
  id: number;
  title: string;
  context: string;
  state: Posts[];
  setState(elem:Posts[]): void; 
}

export function Post({ id, title, context, state,setState }: Props): JSX.Element {

  const handleDelete = async () => {
    try {
      await fetch(`https://aqueous-hollows-72286.herokuapp.com/pastes/${id}`, {
        method: "DELETE"
      });

      setState(state.filter(post => post.id !== id));
    } catch (err: unknown) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="post">
        <h3>{title}</h3>
        <EditPost id={id} title={title} context={context}/>
        <button onClick={handleDelete} type="button" className="btn btn-danger">Delete</button>
      </div>
    </>
  );
}
