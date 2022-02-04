import React, {createContext, useReducer} from "react"
import { ActivityIndicatorBase } from "react-native"
import users from "../data/users"

const UsersContext = createContext({})
const initialState = {users}

const actions = {
    createUser(state, action) {
        const user = action.payload
        user.id = Math.random()
        return {
            ...state,
            users: [...state.users, user] //clones
        }
    },
    updateUser(state, action){
        const updated = action.payload
        return{
            ...state,
            users: state.users.map(u => u.id === updated.id ? updated : u)
        }

    },
    deleteUser(state, action) {
        const user = action.payload;
            return {
                ...state,
                users: state.users.filter(u => u.id !== user.id) //gera outro array (clone)
            };

    }
}

export const UsersProvider = props => {

    // const reducer = (state, action) => {
    //     if (action.type === 'deleteUser') {
    //         const user = action.payload;
    //         return {
    //                 //...state,
    //                 users: state.users.filter(u => u.id !== user.id),
    //         };
    //     }
    //     return state
    // }

    const reducer = (state, action) => {
        const fn = actions[action.type]
        return fn ? fn(state, action) : state
    };

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <UsersContext.Provider value={{
            state, dispatch
        }}>
            {props.children}
        </UsersContext.Provider>
    )

}

export default UsersContext