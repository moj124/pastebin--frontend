import { useState, useEffect } from "react";
import { Submission } from "./components/Submission";
import { Post} from "./components/Post";

export interface Posts {
  id: number;
  title: string;
  context: string;
}

function App(): JSX.Element {
  const [state, setState] = useState<Posts[]>([]);
  const [toggle, setToggle] = useState(false);

  const loadDataFromEndpoint = async (endpoint: `/${string}`) => {
    try {
      const res = await fetch(
        `https://aqueous-hollows-72286.herokuapp.com${endpoint}`
      );
      setState(await res.json());
    } catch (err) {
      console.log(err);
    }
  };

  const posts = state.map((element, index) => (
    <Post
      key={element.id}
      title={element.title}
      context={element.context}
      id={element.id}
      setState={(elem: Posts[]) => setState(elem)}
      state={state}
    ></Post>
  ));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    loadDataFromEndpoint("/pastes");
  }, [toggle]);

  return (
    <div className="grid">
      <header>
        <h1>Paste Bin</h1>
      </header>
      <main>
        <Submission
          setToggle={(bool: boolean) => setToggle(bool)}
          toggle={toggle}
        ></Submission>
      </main>
      <aside>{posts}</aside>
      {/* <footer>
        Footer
      </footer> */}
    </div>
  );
}

export default App;
