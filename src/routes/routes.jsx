import { Route, Routes } from "react-router-dom";
import { HomePage } from './../pages/home';
import { Admin } from "../pages/admin";
import { Carrinho } from "../pages/carrinho";

export const RoutesMain = () => {
   return (
      <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/minhascotas" element={<Admin />} />
         <Route path="/admin" element={<Admin />} />
         <Route path="/carrinho" element={<Carrinho />} />
      </Routes>
   );
};