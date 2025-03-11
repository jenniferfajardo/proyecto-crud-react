import { useState } from "react";
import BtnAdd from "../components/btn-add/BtnAdd";
import ContentHeader from "../components/content-header/ContentHeader";
import InputSearch from "../components/input-search/InputSearch";
import DataTable from "react-data-table-component";
import Modal from "../components/modal/Modal";
import Swal from "sweetalert2";


const Empleados = () => {

    //Fuente de datos
    const data = [
        { "nombre": "Juan", "apellido": "Perez", "numtlefono": "3124567896", "correo": "juanperez@gmail.com", "estado": 1 },
        { "nombre": "María", "apellido": "Gomez", "numtlefono": "3124567896", "correo": "mgomez@gmail.com", "estado": 1 },
        { "nombre": "-carlos", "apellido": "López", "numtlefono": "3124567896", "correo": "clopez@gmail.com", "estado": 1 }
    ]

    //Configuración columnas
    const columns = [
        { name: "Nombre", selector: row => row.nombre, sortable: true },
        { name: "Apellido", selector: row => row.apellido, sortable: true },
        { name: "Num. Teléfono", selector: row => row.numtlefono },
        { name: "Correo", selector: row => row.correo },
        { name: "Estado", selector: row => (row.estado === 1 ? "Activo" : "Inactivo") }
    ]
    const [showModal, setShowModal] = useState(false); //Estado del modal
    const [newEmployee, setNewEmployee] = useState({
        nombre: "",
        apellido: "",
        numtlefono: "",
        correo: "",
        estado: 1
    })

    const handleChange = (e) => {
        setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Nuevo Empleado ", newEmployee)
        Swal.fire({
            title: "Usuario Agregado",
            text: "Ha sido registrado exitosamente",
            icon: "success",
            confirmButtonText: "OK"
        })
        setShowModal(false);
    }
    return (
        <>
            <ContentHeader
                title="Empleados"
                paragraph="lorem ipsum"></ContentHeader>
            <div className="content-search">
                <InputSearch></InputSearch>
                <BtnAdd
                    textButton="Invitar a empleado"
                    onClick={() => {                        
                        setShowModal(true);
                    }}
                />

            </div>
            <div className="table-container">
                <DataTable
                    columns={columns}
                    data={data}
                    pagination
                    highlightOnHover
                ></DataTable>
            </div>


            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={"Invitar empleados"}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre</label>
                        <input type="text" name="nombre" value={newEmployee.nombre} onChange={handleChange}></input>
                    </div>
                    <div className="form-group">
                        <label>Apellido</label>
                        <input type="text" name="apellido" value={newEmployee.apellido} onChange={handleChange}></input>
                    </div>
                    <div className="form-group">
                        <label>Numéro de Teléfono</label>
                        <input type="text" name="numtlefono" value={newEmployee.numtlefono} onChange={handleChange}></input>
                    </div>
                    <div className="form-group">
                        <label>Correo</label>
                        <input type="text" name="correo" value={newEmployee.correo} onChange={handleChange}></input>
                    </div>
                    <div className="form-group">
                        <label>Estado</label>
                        <select name="estado" value={newEmployee.estado} onChange={handleChange}>
                            <option value={1}>Activo</option>
                            <option value={0}>Inactivo</option>
                        </select>

                    </div>

                    <button type="submit">Invitar</button>
                </form>
            </Modal>
        </>
    );
};

export default Empleados;