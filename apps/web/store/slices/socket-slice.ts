import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure of the socket state
export interface SocketState {
  isConnected: boolean;
  messages: string[];
  error: string | null;
}

// Initial state for the socket connection
const initialState: SocketState = {
  isConnected: false,
  messages: [],
  error: null,
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    // Action to set the connection status to true
    connectSocket(state) {
      state.isConnected = true;
      state.error = null; 
    },
    // Action to set the connection status to false
    disconnectSocket(state) {
      state.isConnected = false;
    },
    // Action to add a new message to the state
    addMessage(state, action: PayloadAction<string>) {
      state.messages.push(action.payload);
    },
    // Action to set an error message
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    // Action to clear all messages
    clearMessages(state) {
      state.messages = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  connectSocket,
  disconnectSocket,
  addMessage,
  setError,
  clearMessages,
} = socketSlice.actions;

export default socketSlice.reducer;
