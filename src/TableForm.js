import React from 'react';

const data = [
  { id: 1, name: 'John Doe', age: 25, occupation: 'Developer' },
  { id: 2, name: 'Jane Doe', age: 30, occupation: 'Designer' },
  { id: 3, name: 'Bob Smith', age: 35, occupation: 'Manager' },
];

const Table = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Occupation</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.age}</td>
            <td>{row.occupation}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function App() {
  return (
    <div className="App">
      <h1>React Table Example</h1>
      <Table />
    </div>
  );
}

export default App;
