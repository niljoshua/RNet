import { Route, Routes } from "react-router-dom";
import { HomePage } from './../pages/home';
import { Admin } from "../pages/admin";
import {  MinhasCotas } from "../pages/minhascotas";

export const RoutesMain = () => {
   return (
      <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/admin" element={<Admin />} />
         <Route path="/minhascotas" element={<MinhasCotas />} />
      </Routes>
   );
};