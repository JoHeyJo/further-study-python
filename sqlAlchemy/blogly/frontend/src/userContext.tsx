import React from "react";
import { createContext } from "react";
import { UserContextType } from './interface';

const UserContext = createContext<UserContextType>({ firstName: '', lastName: '' });

export default UserContext;