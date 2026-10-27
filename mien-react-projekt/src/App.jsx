import { useState, useEffect } from "react";

// Die Hauptkomponente "App" definieren
function App() {
  const [inputText, setInputText] = useState("");

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("meine_todos");
    if (savedTodos) {
      return JSON.parse(savedTodos)
    }
  });

  useEffect(() => {
    localStorage.setItem("meine_todos", JSON.stringify(todos));
  }, [todos])

  const addTodo = (e) => {
    e.preventDefault();

    if (inputText.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: inputText
    }

    setTodos([...todos, newTodo])

    setInputText("");
  }

  const deleteTodo = (idToDelete) => {
    setTodos(todos.filter(todo => todo.id !== idToDelete))
  }

  return (
    <div style={styles.container}>
      <h1>Meine To-Do-Liste</h1>

      <form onSubmit={addTodo}>
        <input type="text" placeholder="Neue Aufgabe eingeben..." value={inputText} onChange={(e) => setInputText(e.target.value)} style={styles.input} />
        <button type="submit" style={styles.addButton}>
          Hinzufügen
        </button>
      </form>


      <ul style={styles.list}>
        {todos.length === 0 ? (
          <p style={{ color: '#888' }}>
            Keine Aufgaben vorhanden
          </p>
        ) : (
          todos.map((todo) => (
            <li key={todo.id} style={styles.listItem}>
              <span>{todo.text}</span>
              <button onClick={() => deleteTodo(todo.id)} style={styles.deleteButton}>Erledigt</button>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

//styling

const styles = {
  // Styling für den Haupt-Behälter
  container: {
    maxWidth: '400px', // Maximale Breite
    margin: '50px auto', // Zentriert den Behälter vertikal und horizontal
    padding: '20px', // Innenabstand
    fontFamily: 'Arial, sans-serif', // Schriftart
    textAlign: 'center', // Textausrichtung mittig
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Weicher Schatten
    borderRadius: '10px', // Abgerundete Ecken
    backgroundColor: '#fff' // Weißer Hintergrund
  },
  // Styling für die Formular-Zeile
  form: {
    display: 'flex', // Nebeneinander-Anordnung
    gap: '10px', // Abstand zwischen Input und Button
    marginBottom: '20px' // Außenabstand nach unten
  },
  // Styling für das Texteingabefeld
  input: {
    flex: 1, // Nimmt den verfügbaren Platz ein
    padding: '10px', // Innenabstand
    fontSize: '14px', // Schriftgröße
    borderRadius: '5px', // Ecken abrunden
    border: '1px solid #ccc' // Graue Umrandung
  },
  // Styling für den Hinzufügen-Button
  addButton: {
    padding: '10px 15px', // Innenabstand oben/unten und links/rechts
    backgroundColor: '#4CAF50', // Grüne Hintergrundfarbe
    color: 'white', // Weiße Schrift
    border: 'none', // Keine Rahmenlinie
    borderRadius: '5px', // Abgerundete Ecken
    cursor: 'pointer' // Zeiger-Mauszeiger beim Drüberfahren
  },
  // Styling für die Aufgabenliste
  list: {
    listStyleType: 'none', // Entfernt standardmäßige Aufzählungspunkte
    padding: 0 // Entfernt den Standard-Innenabstand
  },
  // Styling für die einzelnen Listenelemente
  listItem: {
    display: 'flex', // Elemente im Eintrag nebeneinander anordnen
    justifyContent: 'space-between', // Text links, Button rechts ausrichten
    alignItems: 'center', // Vertikal zentrieren
    padding: '10px', // Innenabstand
    marginBottom: '8px', // Abstand zum nächsten Element
    backgroundColor: '#f9f9f9', // Hellgrauer Hintergrund
    borderRadius: '5px', // Abgerundete Ecken
    border: '1px solid #eee' // Dezenter Rahmen
  },
  // Styling für den Löschen-Button
  deleteButton: {
    backgroundColor: '#ff4d4d', // Rote Hintergrundfarbe
    color: 'white', // Weiße Schrift
    border: 'none', // Kein Rahmen
    padding: '5px 10px', // Innenabstand
    borderRadius: '3px', // Ecken leicht abrunden
    cursor: 'pointer' // Zeiger-Mauszeiger
  }
}

export default App;