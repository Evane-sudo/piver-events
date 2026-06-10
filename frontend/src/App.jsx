import { useState, useEffect } from "react";

function App() {
  const [userId, setUserId] = useState("");
  const [type, setType] = useState("login");
  const [payload, setPayload] = useState("");

  const [events, setEvents] = useState([]);
  const [summary, setSummary] = useState(null);

  const loadEvents = async () => {
    const response = await fetch(
      "http://localhost:8000/events"
    );

    const data = await response.json();

    setEvents(data);
  };

  const loadSummary = async () => {
    if (!userId) return;

    const response = await fetch(
      `http://localhost:8000/users/${userId}/summary`
    );

    const data = await response.json();

    setSummary(data);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const createEvent = async () => {
    const response = await fetch(
      "http://localhost:8000/events",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          type: type,
          payload: payload
            ? { message: payload }
            : {},
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    alert("Événement créé !");

    loadEvents();
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
          onChange={(e) =>
            setUserId(e.target.value)
          }
        />
      </div>

      <br />

      <div>
        <label>Type</label>
        <br />
        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
        >
          <option value="login">
            login
          </option>

          <option value="transaction">
            transaction
          </option>

          <option value="report">
            report
          </option>
        </select>
      </div>

      <br />

      <div>
        <label>Payload</label>
        <br />
        <input
          type="text"
          value={payload}
          onChange={(e) =>
            setPayload(e.target.value)
          }
        />
      </div>

      <br />

      <button onClick={createEvent}>
        Créer un événement
      </button>

      <button
        onClick={loadSummary}
        style={{ marginLeft: "10px" }}
      >
        Voir résumé
      </button>

      <hr />

      {summary && (
        <div>
          <h2>Résumé utilisateur</h2>

          <p>
            <strong>User :</strong>{" "}
            {summary.user_id}
          </p>

          <p>
            <strong>Total événements :</strong>{" "}
            {summary.total_events}
          </p>

          <p>
            <strong>Premier événement :</strong>{" "}
            {summary.first_event}
          </p>

          <p>
            <strong>Dernier événement :</strong>{" "}
            {summary.last_event}
          </p>

          <h3>Répartition</h3>

          <ul>
            {Object.entries(
              summary.event_types
            ).map(([type, count]) => (
              <li key={type}>
                {type} : {count}
              </li>
            ))}
          </ul>
        </div>
      )}

      <h2>Liste des événements</h2>

      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.user_id} - {event.type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
