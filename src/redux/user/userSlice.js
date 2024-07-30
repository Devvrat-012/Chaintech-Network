import { createSlice } from "@reduxjs/toolkit";

// Function to load state from localStorage
const loadStateFromLocalStorage = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  return { currentUser };
};

// Initial state for the user slice
const initialState = {
  loading: false,
  currentUser: loadStateFromLocalStorage().currentUser, // Load current user from localStorage if available
  error: null,
};

// Function to save state to localStorage
const saveStateToLocalStorage = (state) => {
  localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
};

// Create a slice of the Redux store
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Actions related to login
    loginStart: (state) => {
      state.loading = true; // Set loading to true when login starts
      state.error = null; // Reset error on login start
    },
    loginSuccess: (state, action) => {
      state.loading = false; // Set loading to false when login succeeds
      state.currentUser = action.payload; // Update currentUser with the login payload
      state.error = null; // Reset error on successful login
      saveStateToLocalStorage(state); // Save updated state to localStorage
    },
    loginFailure: (state, action) => {
      state.loading = false; // Set loading to false when login fails
      state.error = action.payload; // Set error with the failure message
    },

    // Actions related to registration
    registerStart: (state) => {
      state.loading = true; // Set loading to true when registration starts
      state.error = null; // Reset error on registration start
    },
    registerSuccess: (state, action) => {
      state.loading = false; // Set loading to false when registration succeeds
      state.currentUser = action.payload; // Update currentUser with the registration payload
      state.error = null; // Reset error on successful registration
      saveStateToLocalStorage(state); // Save updated state to localStorage
    },
    registerFailure: (state, action) => {
      state.loading = false; // Set loading to false when registration fails
      state.error = action.payload; // Set error with the failure message
    },

    // Actions related to updating user information
    updateUserStart: (state) => {
      state.loading = true; // Set loading to true when user update starts
      state.error = null; // Reset error on update start
    },
    updateUserSuccess: (state, action) => {
      state.loading = false; // Set loading to false when user update succeeds
      state.currentUser = action.payload; // Update currentUser with the update payload
      saveStateToLocalStorage(state); // Save updated state to localStorage
    },
    updateUserFailure: (state, action) => {
      state.loading = false; // Set loading to false when user update fails
      state.error = action.payload; // Set error with the failure message
    },

    // Action related to logout
    logout: (state) => {
      state.currentUser = null; // Clear currentUser on logout
      localStorage.removeItem("currentUser"); // Remove user data from localStorage
    },

    // Error handling actions
    setError: (state, action) => {
      state.error = action.payload; // Set error with the provided message
    },
    resetError: (state) => {
      state.error = null; // Reset error to null
    },

    // Loading state actions
    setLoading: (state, action) => {
      state.loading = action.payload; // Set loading state with the provided value
    },
  },
});

// Export actions to be used in components
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  logout,
  setError,
  resetError,
  setLoading,
} = userSlice.actions;

// Export the reducer to be included in the store
export default userSlice.reducer;
