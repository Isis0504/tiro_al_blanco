import React, { useState, useEffect } from "react";

export default function App() {
  const [score, setScore] = useState(0);
  const [size, setSize] = useState(80);
  const [time, setTime] = useState(2000);
  const [position, setPosition] = useState({ top: "50%", left: "50%" });

  const randomPosition = () => {
    return {
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
    };
  };

  const handleHit = () => {
    setScore(score + 1);
    setSize(Math.max(size * 0.9, 20));
    setTime(Math.max(time * 0.9, 500));
    setPosition(randomPosition());
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosition(randomPosition());
    }, time);
    return () => clearTimeout(timer);
  }, [position, time]);

  return (
    <div className="game-container" style={styles.container}>
      <h1 style={styles.score}>Score: {score}</h1>
      <div
        style={{
          ...styles.target,
          width: size,
          height: size,
          top: position.top,
          left: position.left,
        }}
        onClick={handleHit}
      />
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#222",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    color: "white",
  },
  score: {
    position: "absolute",
    top: 20,
    fontSize: 24,
  },
  target: {
    position: "absolute",
    backgroundColor: "red",
    borderRadius: "50%",
    cursor: "pointer",
  },
};
