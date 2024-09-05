import { render } from "preact";
import "./style.css";

export function App() {
  return "Hello world!";
}

render(<App />, document.getElementById("app"));
