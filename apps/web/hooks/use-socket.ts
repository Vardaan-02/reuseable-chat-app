import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import {
  addMessage,
  connectSocket,
  disconnectSocket,
  setError,
} from "@/store/slices/socket-slice";
import { RootState } from "@/store/store";

const useSocket = (url: string) => {
  const dispatch = useDispatch();

  const { isConnected, messages, error } = useSelector(
    (state: RootState) => state.socket
  );

  useEffect(() => {
    // Create a Socket.IO connection
    const socket: Socket = io(url, {
      transports: ["websocket"], 
    });

    // Event handler for when the socket connects
    socket.on("connect", () => {
      dispatch(connectSocket());
      console.log("Socket.IO connected");
    });

    // Event handler for receiving messages
    socket.on("message", (data: string) => {
      dispatch(addMessage(data));
      console.log("Message received:", data);
    });

    // Event handler for errors
    socket.on("connect_error", (err: any) => {
      dispatch(setError("Socket.IO error: " + err.message));
      console.log("Socket.IO connection error:", err.message);
    });

    // Event handler for when the socket disconnects
    socket.on("disconnect", () => {
      dispatch(disconnectSocket());
      console.log("Socket.IO disconnected");
    });

    // Cleanup the Socket.IO connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [dispatch, url]);

  // Return the WebSocket state and actions to use in the component
  return {
    isConnected,
    messages,
    error,
  };
};

export default useSocket;
