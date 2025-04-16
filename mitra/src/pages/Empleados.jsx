import { useState } from "react";
import BtnAdd from "../components/btn-add/BtnAdd";
import ContentHeader from "../components/content-header/ContentHeader";
import InputSearch from "../components/input-search/InputSearch";
import DataTable from "react-data-table-component";
import Modal from "../components/modal/Modal";
import Swal from "sweetalert2";

//Importación servicios que hacen las peticiones al backend
import { getUsers, createUser, updateUser, changeUserStatus } from "../services/userService";
import { useEffect } from "react";


const Empleados = () => {
    
   // Estado para mostrar u ocultar el modal
     const [showModal, setShowModal] = useState(false);
   
     // Estado para guardar la lista de colaboradores (usuarios)
     const [colaboradores, setColaboradores] = useState([]);
     // Para diferenciar si giuardo o actualizo
     const [colaboradorEditado, setColaboradorEditado] = useState([]); 

     //NOTA Para evitar error de carga del modal al editar y guardar, definir método closeModal
     // Llamarlo abajo en la línea 220, como se indica en comentario.

     const closeModal = () => {
        setShowModal(false); // Cierre el modal
        setColaboradorEditado(null); //Restablezca el estado
        setNewColaborador({ //Restablezca los campos
          nombre: "",
          apellido: "",
          numtelefono: "",
          correo: "",
          password: "",
          estado: 1,
        });
      };
      
   
     // Estado para el formulario de un nuevo colaborador
     const [newColaborador, setNewColaborador] = useState({
       nombre: "",
       apellido: "",
       numtelefono: "",
       correo: "",
       password: "",
       estado: 1,
     });
   
     // Función para obtener colaboradores desde la API
     const fetchColaboradores = async () => {
       try {
         const res = await getUsers(); // Llama al servicio que hace fetch a /user/get-users/
         setColaboradores(res.data || []); // Guarda la lista en el estado, o un array vacío si falla
       } catch (error) {
         Swal.fire("Error", "No se pudieron cargar los colaboradores", "error"); // Muestra alerta si falla
       }
     };
   
     // Se ejecuta una vez al cargar el componente (similar a componentDidMount)
     useEffect(() => {
       fetchColaboradores(); // Carga la lista de colaboradores desde la API
     }, []);
   
     // Definición de columnas para la tabla
     const columns = [
       { name: "Nombre", selector: row => row.nombre, sortable: true },
       { name: "Apellido", selector: row => row.apellido, sortable: true },
       { name: "Num. Teléfono", selector: row => row.numtelefono },
       { name: "Correo", selector: row => row.correo },
       {
         name: "Estado",
         selector: row => (
           <span className={`badge ${row.estado === 1 ? "badge-green" : "badge-red"}`}>
             {row.estado === 1 ? "Activo" : "Inactivo"} {/* Muestra badge según estado */}
           </span>
         ),
       },
       {
           name: "Acciones",
           cell: row => (
             <div className="action-buttons">
               <i
                 className="fas fa-edit icon-btn"
                 title="Editar"
                 style={{ marginRight: "10px", cursor: "pointer" }}
                 onClick={() => handleEdit(row)}
               ></i>
               <i
                 className={`fas ${row.estado === 1 ? "fa-toggle-on" : "fa-toggle-off"} icon-btn`}
                 title="Cambiar estado"
                 style={{ cursor: "pointer", color: row.estado === 1 ? "green" : "gray" }}
                 onClick={() => handleToggleEstado(row)}
               ></i>
             </div>
           ),
           ignoreRowClick: true,
           allowOverflow: true,
           button: true,
         }
         
     ];
   
     // Manejador para cambios en los inputs del formulario
     const handleChange = (e) => {
       setNewColaborador({ ...newColaborador, [e.target.name]: e.target.value });
     };
   
     // Manejador para envío del formulario (crear usuario)
     const handleSubmit = async (e) => {
       e.preventDefault(); // Previene recarga de página
       try{
         if(colaboradorEditado){
           const res= await updateUser({...newColaborador, id: colaboradorEditado.id });
           if(res.ok){
             const data= await res.json();
             if(data.success){
               Swal.fire("Actualización", data.message, "success");
             }else{
               Swal.fire("Sin Cambios", data.message, "info");
             }
           }else{
             const dataError= await res.json();
             Swal.fire("Error", dataError.message, "error");
           }
         }else{
           const res= await createUser(newColaborador);
           if(res.ok){
             const data= await res.json();
             Swal.fire("Usuario agregado", data.message, "success");
           }else{
             const dataError= await res.json();
             Swal.fire("Error", dataError.message, "error");
           }
         }
   
         setShowModal(false);
         setColaboradorEditado(null);
         setNewColaborador({
           nombre: "",
           apellido: "",
           numtelefono: "",
           correo: "",
           password: "",
           estado: 1
         });
         fetchColaboradores(); // Actualizamos la tabla para ver los cambios reflejados
       }catch(error){
         Swal.fire("Error", "Ocurrió inesperado", "error");
       }
      
     };
   
   
     const handleEdit = (colaborador) =>{
       setNewColaborador({
       nombre: colaborador.nombre,
       apellido: colaborador.apellido,
       numtelefono: colaborador.numtelefono,
       correo: colaborador.correo,
       password: colaborador.password,
       estado: colaborador.estado,
       })
       setColaboradorEditado(colaborador);
       setShowModal(true);
     }
   
     // Manejador para cambiar el estado del usuario (activo/inactivo)
     const handleToggleEstado = async (usuario) => {
       const nuevoEstado = usuario.estado === 1 ? 0 : 1;
       const estadoTexto = nuevoEstado === 1 ? "activar" : "inactivar";
     
       const result = await Swal.fire({
         title: `¿Estás seguro de que quieres ${estadoTexto} a ${usuario.nombre} ${usuario.apellido}?`,
         text: `Este usuario será marcado como ${nuevoEstado === 1 ? "activo" : "inactivo"}.`,
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: `Sí, ${estadoTexto}`,
         cancelButtonText: "Cancelar"
       });
     
       if (result.isConfirmed) {
         try {
           const res = await changeUserStatus(usuario.id, nuevoEstado);
           if (res.ok) {
             Swal.fire("Actualizado", `El usuario ha sido ${estadoTexto} correctamente.`, "success");
             fetchColaboradores(); // Refresca la tabla
           } else {
             Swal.fire("Error", "No se pudo actualizar el estado del usuario.", "error");
           }
         } catch (error) {
           Swal.fire("Error", "Ocurrió un error inesperado.", "error");
         }
       } 
     };
     
     return (
       <>
         <ContentHeader
           title="Colaboradores"
           paragraph="¡Bienvenido al panel de usuarios! Aquí podrás crear, modificar, asociar, desactivar y eliminar a los usuarios de tu empresa. Estamos aquí para ayudarte en todo lo que necesites."
         />
   
         <InputSearch />
         <BtnAdd textButton="Invitar Colaborador" onClick={() => setShowModal(true)} />
   
         <div className="table-container">
           <DataTable
             columns={columns}
             data={colaboradores}
             pagination
             highlightOnHover
           />
         </div>
   
         <Modal 
         isOpen={showModal}         
         //onClose={() => setShowModal(false)}  Reemplazar esta linea      
         onClose={closeModal} //Por esta
         title={colaboradorEditado ? "Editar Colaborador" : "Invitar Colaborador"}>
           <form onSubmit={handleSubmit}>
             <div className="form-group">
               <label>Nombre:</label>
               <input type="text" name="nombre" value={newColaborador.nombre} onChange={handleChange} required />
             </div>
   
             <div className="form-group">
               <label>Apellido:</label>
               <input type="text" name="apellido" value={newColaborador.apellido} onChange={handleChange} required />
             </div>
   
             <div className="form-group">
               <label>Número de Teléfono:</label>
               <input type="text" name="numtelefono" value={newColaborador.numtelefono} onChange={handleChange} required />
             </div>
   
             <div className="form-group">
               <label>Correo:</label>
               <input type="email" name="correo" value={newColaborador.correo} onChange={handleChange} required />
             </div>
   
             <div className="form-group">
               <label>Contraseña:</label>
               <input type="password" name="password" value={newColaborador.password} onChange={handleChange} required />
             </div>
            
            {!colaboradorEditado && (
                <div className="form-group">
               <label>Estado:</label>
               <select name="estado" value={newColaborador.estado} onChange={handleChange}>
                 <option value={1}>Activo</option>
                 <option value={0}>Inactivo</option>
               </select>
             </div>
            )}
             
   
             <button type="submit" className="submit-btn">
             {colaboradorEditado ? "Actualizar" : "Invitar"}  
             </button>
           </form>
         </Modal>
       </>
     );
   };

export default Empleados;