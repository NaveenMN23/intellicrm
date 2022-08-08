import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateUser from "../screens/admin/createUser";
import Signin from "./../screens/signin/index";


export const Router = () => {
    return(
        <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/admin/createuser" element={<CreateUser />} />
        </Routes>
    )
}