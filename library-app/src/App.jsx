import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Books from "./pages/Books";
import Members from "./pages/Members";
import BorrowedBooks from "./pages/BorrowedBooks";
import Returns from "./pages/Returns";
import Settings from "./pages/Settings";
import AddBook from "./pages/AddBook";
import IssueBook from "./pages/IssueBook";
import BookDetails from "./pages/BookDetails";
import AddMember from "./pages/AddMember";
import Dashboard from "./layout/Dashboard";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import EditMember from "./pages/EditMember";
import Reports from "./pages/Reports";


function App() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />
      <Route path="/welcome" element={<Welcome />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Library Pages */}
      <Route path="/books" element={<Books />} />
      <Route path="/members" element={<Members />} />
      <Route path="/issue-book" element={<IssueBook />} />
      <Route
        path="/borrowed-books"
        element={<BorrowedBooks />}
      />
      <Route path="/returns" element={<Returns />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/add-book" element={<AddBook />} />
      <Route path="/add-member" element={<AddMember />} />
      <Route
        path="/edit-member/:id"
        element={<EditMember />}
      />
      <Route
        path="/book/:id"
        element={<BookDetails />}
      />
      <Route
        path="/edit-profile"
        element={<EditProfile />}
      />
      <Route path="/reports" element={<Reports />} />
      <Route
        path="/change-password"
        element={<ChangePassword />}
      />


    </Routes>
  );
}

export default App;