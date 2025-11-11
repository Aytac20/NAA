import Main from "./components/Main";
import Sidebar from "./components/sidebar/Sidebar";
export default function App() {
  return (
    <div className="grid md:grid-cols-[318px_auto] grid-cols-[2.5rem_auto] h-screen relative">
      <Sidebar />
      <Main />
    </div>
  );
}
