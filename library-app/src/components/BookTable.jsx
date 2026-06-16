function BookTable() {
  const books = [
    {
      id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      status: "Available",
    },
    {
      id: 2,
      title: "Deep Work",
      author: "Cal Newport",
      status: "Borrowed",
    },
    {
      id: 3,
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      status: "Available",
    },
  ];

  return (
    <div className="table-section">
      <h2>Books Collection</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Book</th>
            <th>Author</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookTable;