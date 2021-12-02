// import { useState, useEffect } from "react";
// import { Submission } from "./components/Submission";
// import { Post} from "./components/Post";

import { Fragment } from "react";
// import styles from "./assets/css/app.module.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";

export interface Posts {
  id: number;
  title: string;
  context: string;
  expiration_date: string;
}

function App(): JSX.Element {
  // const [state, setState] = useState<Posts[]>([]);
  // const [toggle, setToggle] = useState(false);

  // const loadDataFromEndpoint = async (endpoint: `/${string}`) => {
  //   try {
  //     const res = await fetch(
  //       `https://aqueous-hollows-72286.herokuapp.com${endpoint}`
  //     );
  //     setState(await res.json());
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // console.log(state)
  // const posts = state.map(element => (
  //   <Post
  //     key={element.id}
  //     title={element.title}
  //     context={element.context}
  //     expiration_date={element.expiration_date.substring(0, 10)}
  //     id={element.id}
  //     setState={(elem: Posts[]) => setState(elem)}
  //     state={state}
  //   ></Post>
  // ));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => {
  //   loadDataFromEndpoint("/pastes");
  // }, [toggle]);

  return (
    <Fragment>
      <Header />
      <Home />
      <Footer />
    </Fragment>
  );
}

export default App;
