import {Routes, Route, Navigate} from "react-router-dom"
import Empleados from "../pages/Empleados";
import App from "../App";



function Rutas(){
    return(
        
        <Routes>
            <Route path="/dashboard" element={<App></App>}>
                <Route path="employees" element={<Empleados></Empleados>}></Route>
                {/* Aquí van todas las ritas anidadas dentro dle dashboard */}
            </Route>

            {/* Rutas independientes al dashboard */}
            <Route path="/login" element={<Empleados></Empleados>}></Route>

            {/* Redirecciones ruta que no existe */}
            <Route path="*" element={<Navigate to="/login"></Navigate>}></Route>

        </Routes>
        
    )
}

export default Rutas;