import { User } from "../types/User";

export interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

export type UserAction =
    | { type: "SET_USERS"; payload: User[] }
    | { type: "ADD_USER"; payload: User }
    | { type: "UPDATE_USER"; payload: User }
    | { type: "DELETE_USER"; payload: number }
    | { type: "SET_ERROR"; payload: string };

export const initialState: UserState = { users: [], loading: true, error: null };

export const userReducer = (state: UserState, action: UserAction): UserState => {
    switch (action.type) {
        case "SET_USERS":
            return { ...state, users: action.payload, loading: false };
        case "ADD_USER":
            return { ...state, users: [...state.users, action.payload] };
        case "UPDATE_USER":
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.payload.id ? action.payload : user
                ),
            };
        case "DELETE_USER":
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.payload),
            };
        case "SET_ERROR":
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
};
