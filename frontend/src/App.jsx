import { useState } from "react";

function App() {
  const [userId, setUserId] = useState("");
  const [type, setType] = useState("login");
  const [payload, setPayload] = useState("");

  const createEvent = async () => {
    const response = await fetch("http://localhost:8000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        type: type,
        payload: payload ? { message: payload } : {},
      }),
    });

    const data = await response.json();

    console.log(data);

    alert("Événement créé !");
  };

  return (
    <div>
      <h1>PIVER Events</h1>

      <div>
        <label>User ID</label>
        <br />
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>Type</label>
        <br />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="login">login</option>
          <option value="transaction">transaction</option>
          <option value="report">report</option>
        </select>
      </div>

      <br />

      <div>
        <label>Payload</label>
        <br />
        <input
          type="text"
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
        />
      </div>

      <br />

      <button onClick={createEvent}>
        Créer un événement
      </button>
    </div>
  );
}

export default App;
