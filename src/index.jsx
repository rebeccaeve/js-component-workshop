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
  const [timeoutId, setTimeoutId] = useState(null);

  const advanceStopwatch = () => {
    const newTimeoutId = setTimeout(
      () => setElapsedSeconds(elapsedSeconds + 1),
      1000
    );
    setTimeoutId(newTimeoutId);
    return () => clearTimeout(newTimeoutId);
  };

  const stopStopwatch = () => {
    clearTimeout(timeoutId);
    setTimeoutId(null);
  };

  const toggleStopwatch = () =>
    timeoutId === null ? advanceStopwatch() : stopStopwatch();

  const resetStopwatch = () => setElapsedSeconds(0);

  useEffect(() => {
    if (elapsedSeconds > 0) advanceStopwatch();
  }, [elapsedSeconds]);

  const startButtonText = timeoutId === null ? "Start" : "Stop";

  return (
    <>
      <Duration elapsedSeconds={elapsedSeconds}></Duration>
      <div>
        <button class={startButtonText.toLowerCase()} onClick={toggleStopwatch}>
          {startButtonText}
        </button>
        <button
          disabled={timeoutId !== null || elapsedSeconds == 0}
          onClick={resetStopwatch}
        >
          Reset
        </button>
      </div>
    </>
  );
}

render(<Stopwatch />, document.getElementById("app"));
