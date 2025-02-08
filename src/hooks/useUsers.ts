import { useReducer, useEffect } from "react";
import axios from "axios";
import { User } from "../types/User";
import { userReducer, initialState, UserAction } from "../reducers/userReducer";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export const useUsers = () => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    useEffect(() => {
        axios.get<User[]>(API_URL)
            .then(response => dispatch({ type: "SET_USERS", payload: response.data }))
            .catch(error => dispatch({ type: "SET_ERROR", payload: error.message }));
    }, []);

    const addUser = (user: User) => dispatch({ type: "ADD_USER", payload: user });
    const updateUser = (user: User) => dispatch({ type: "UPDATE_USER", payload: user });
    const deleteUser = (id: number) => dispatch({ type: "DELETE_USER", payload: id });

    return { state, addUser, updateUser, deleteUser };
};
