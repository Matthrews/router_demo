import React, {
  useEffect,
  useState,
  useContext,
  createContext,
  useMemo,
} from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.
export const AppContext = createContext({});

export default function Basic() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/app">App</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <AppContext.Provider value={{ data }}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/app">
              <App />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
        </AppContext.Provider>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  const ctx = useContext(AppContext);

  console.log("Home", ctx);
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  const ctx = useContext(AppContext);

  console.log("About", ctx);
  return (
    <div>
      <h2>About</h2>
      <span>数量：{JSON.stringify(ctx, null, 2)}</span>
    </div>
  );
}

function Dashboard() {
  const ctx = useContext(AppContext);

  console.log("Dashboard", ctx);
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function App() {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/todos/1")
  //     .then((response) => response.json())
  //     .then((json) => setData(json));
  // }, []);

  return (
    // <AppContext.Provider value={{ data }}>
    <>
      <MemoList />
      <MemoDetail />
    </>
    // </AppContext.Provider>
  );
}

function List() {
  const ctx = useContext(AppContext);

  console.log("List", ctx);
  return (
    <div>
      <h2>List</h2>
    </div>
  );
}

const MemoList = React.memo(List);
const MemoDetail = React.memo(Detail);

function Detail() {
  const ctx = useContext(AppContext);

  console.log("Detail", ctx);
  return (
    <div>
      <h2>Detail</h2>
    </div>
  );
}
