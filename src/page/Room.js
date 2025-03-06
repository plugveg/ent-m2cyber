import { useState } from "react";

export default function Room() {
  const [roomType, setRoomType] = useState("public");
  const [roomName, setRoomName] = useState("");
  const [users, setUsers] = useState([]);
  const [isTemporary, setIsTemporary] = useState(false);
  const [closedDate, setClosedDate] = useState("")

  const handleCreateRoom = () => {
    const newRoom = {
      name: roomName,
      type: roomType,
      users: roomType === "private" ? users : [],
      isTemporary: roomType === "private" ? isTemporary : false,
      closedDate: isTemporary === true ? closedDate : null,
    };
    console.log("Salon créé:", newRoom);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "200px auto", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2>Créer un salon</h2>

      <input
        type="text"
        placeholder="Nom du salon"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        style={{ display: "block", width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <select value={roomType} onChange={(e) => setRoomType(e.target.value)} style={{ display: "block", width: "100%", padding: "8px", marginBottom: "10px" }}>
        <option value="public">Public</option>
        <option value="private">Privé</option>
      </select>

      {roomType === "private" && (
        <>
          <select
            type="number"
            value={users}
            onChange={(e) => setUsers(Array(e.target.value))}
            style={{ display: "block", width: "100%", padding: "8px", marginBottom: "10px" }}
            multiple
          >
            <option value={1}>Personne 1</option>
            <option value={2}>Personne 2</option>
            <option value={3}>Personne 3</option>
            <option value={4}>Personne 4</option>
            <option value={5}>Personne 5</option>
            <option value={6}>Personne 6</option>
            <option value={7}>Personne 7</option>
            <option value={8}>Personne 8</option>
            <option value={9}>Personne 9</option>
          </select>
          <label>
            <input
              type="checkbox"
              checked={isTemporary}
              onChange={(e) => setIsTemporary(e.target.checked)}
            />
            Temporaire ?
          </label>
          {isTemporary === true && (
            <>
              <br />
              <label>
                Date de fermeture :
                <input
                  type="date"
                  value={closedDate}
                  onChange={(e) => setClosedDate(e.target.value)}
                  style={{ display: "block", width: "100%", padding: "8px", marginBottom: "10px" }}
                />
              </label>

            </>
          )}
        </>
      )}

      <button onClick={handleCreateRoom} style={{ display: "block", width: "100%", padding: "10px", marginTop: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" }}>
        Créer le salon
      </button>
    </div>
  );
}
