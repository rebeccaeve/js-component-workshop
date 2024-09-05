import { render } from "preact";
import "./style.css";

export function Duration({ elapsedSeconds }) {
  const hours = Math.floor(elapsedSeconds / 3600);
  const minutes = Math.floor((elapsedSeconds % 3600) / 60);
  const seconds = elapsedSeconds % 60;
  return [hours, minutes, seconds]
    .map((number) => number.toString().padStart(2, "0"))
    .join(":");
}

render(<Duration elapsedSeconds={330} />, document.getElementById("app"));
