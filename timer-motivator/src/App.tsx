import { useEffect, useState } from "react";
import chooseRandom from "./data-motivation";

function App() {
  const [selectedTime, setSelectedTime] = useState<number>(10);
  const [name, setName] = useState<string>("Chill bro");
  const [time, setTime] = useState<number>(selectedTime);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [phrase, setPhrase] = useState<string>("LET'S GOOO");
  console.log(time, selectedTime);

  useEffect(() => {
    setTime(selectedTime);
    setIsActive(false);
  }, [selectedTime]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && time > 0) {
      setPhrase(chooseRandom());

      timer = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }

    if (time === 0) {
      setIsActive(false);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, time]);

  function handleStart() {
    if (time === 0) {
      setTime(selectedTime);
    }
    setIsActive(true);
  }

  function handleReset() {
    setIsActive(false);
    setTime(selectedTime);
  }

  return (
    <main>
      <div className="container">
        <h1 className="title">Timer-Motivator</h1>

        <p className="info">
          {time === selectedTime && !isActive ? (
            <>
              Your name: <b>{name}</b>
            </>
          ) : time > 0 ? (
            <>
              {name}, you have only <b>{time}</b> seconds left. {phrase}
            </>
          ) : (
            <span style={{ color: "yellow" }}>
              You just won $1m dollars, <b>{name}</b>
            </span>
          )}
        </p>

        <div className="progress-bar">
          <div
            className="progress"
            style={{
              width:
                isActive || time === 0
                  ? `${((selectedTime - time) / selectedTime) * 100}%`
                  : "0%",
            }}
          ></div>
        </div>

        <div className="flex-row">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(Number(e.target.value))}
            disabled={isActive}
          >
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div className="flex-row">
          <button onClick={handleStart} disabled={isActive}>
            Start timer
          </button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </main>
  );
}

export default App;
