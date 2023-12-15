import io from "socket.io-client";
// export const Socket = io.connect(import.meta.env.VITE_API_URL);

export const SocketService=()=>{
    return io.connect(import.meta.env.VITE_API_URL);
}