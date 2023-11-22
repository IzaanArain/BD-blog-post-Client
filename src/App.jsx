import Layout from "./components/Layout";
import { ToastContainer } from "react-toastify";
import io from "socket.io-client";

const socket = io.connect(import.meta.env.VITE_API_URL);
function App() {
  return (
    <>
      <Layout />
      <ToastContainer/>
    </>
  );
}

export default App;
