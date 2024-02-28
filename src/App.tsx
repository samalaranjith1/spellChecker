import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// import Home from "./components/Home";
import WordDocumentReader from "./components/WordDocumentReader";

function App() {
  // const [count, setCount] = useState(0)
  const changeColorOnClick = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => {
        document.body.style.backgroundColor = "green";
      },
    });
  };
  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      {/* <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => changeColorOnClick()}>Change Color</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      {/* <Home /> */}
      <WordDocumentReader />
    </>
  );
}
export default App;
