import { useEffect, useState } from "react";
import io from "Socket.IO-client";
let socket;

const Home = () => {
  const [data, setData] = useState(null);
  const [activeAthlete, setActiveAthlete] = useState(null);

  useEffect(() => {
    socketInitializer();
  }, []);

  useEffect(() => {
    const active = data?.athletes?.filter((el) => el.active)[0];
    setActiveAthlete((old) => active);
  }, [data]);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("intervall", (res) => {
      if (JSON.stringify(data) !== JSON.stringify(res)) setData((old) => res);
    });
  };

  return (
    <main className="container">
      <div className="athlete">
        <div className="info">
          {activeAthlete?.name} | {activeAthlete?.team} |{" "}
          {activeAthlete?.bodyweight.toFixed(1)} |{" "}
          {activeAthlete?.sinclairCoefficient?.toFixed(4)}
        </div>
        <div className="attempts">
          <div className="discipline">
            {activeAthlete?.snatch?.attempts.map((attempt) => (
              <div
                className={`attempt${
                  attempt.status === 1
                    ? " good-lift"
                    : attempt.status === 0
                    ? ""
                    : " no-lift"
                }`}
              >
                {attempt.weight}
              </div>
            ))}
            <div className="attempt result">
              {activeAthlete?.snatch.sinclair.toFixed(2)}
            </div>
          </div>
          <div className="discipline">
            {activeAthlete?.cj?.attempts.map((attempt) => (
              <div
                className={`attempt${
                  attempt.status === 1
                    ? " good-lift"
                    : attempt.status === 0
                    ? ""
                    : " no-lift"
                }`}
              >
                {attempt.weight}
              </div>
            ))}
            <div className="attempt result">
              {activeAthlete?.cj.sinclair.toFixed(2)}
            </div>
          </div>
          <div className="discipline">
            <div className="attempt result">{activeAthlete?.total.weight}</div>
            <div className="attempt result">
              {activeAthlete?.total.sinclair.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
