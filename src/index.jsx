import { render } from "preact";
import { useEffect, useState } from "preact/hooks";
import "./style.css";

export function Duration({ elapsedSeconds }) {
  const hours = Math.floor(elapsedSeconds / 3600);
  const minutes = Math.floor((elapsedSeconds % 3600) / 60);
  const seconds = elapsedSeconds % 60;
  return (
    <time datetime={`${hours}h ${minutes}m ${seconds}s`}>
      {[hours, minutes, seconds]
        .map((number) => number.toString().padStart(2, "0"))
        .join(":")}
    </time>
  );
}

export function Stopwatch() {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const advanceStopwatch = () => {
    const newTimeoutId = setTimeout(
      () => setElapsedSeconds(elapsedSeconds + 1),
      1000
    );
    return () => clearTimeout(newTimeoutId);
  };

  useEffect(advanceStopwatch, [elapsedSeconds]);

  return <Duration elapsedSeconds={elapsedSeconds} />;
}

render(<Stopwatch />, document.getElementById("app"));
