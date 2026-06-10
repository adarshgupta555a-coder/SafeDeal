import { useState, useRef, useCallback } from "react";
import LoginPage from "../../components/admin/Login";
import Dashboard from "../../components/admin/Dashboard";

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  return authed ? <Dashboard onLogout={() => setAuthed(false)} /> : <LoginPage onLogin={() => setAuthed(true)} />;
  // return <Dashboard onLogout={() => setAuthed(false)} /> ;
}