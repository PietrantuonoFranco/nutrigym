"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import BotonesMultiples from "../../../../../components/account/adminPanel/botonesMultiples";
import { FileText } from 'lucide-react';
import { useMetaDataContext } from "@/components/layout/metaDataContext";

export default function EditRutinaPage() {
  const router = useRouter();

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [idsEjercicios, setIdsEjercicios] = useState([]);
  const [todasRelaciones, setTodasRelaciones] = useState([]);
  const [idRutina, setIdRutina] = useState(null);
  const [defaultIds, setDefaultIds] = useState([]);
  const [todosEjercicios, setTodosEjercicios] = useState([]);
  const [updatingRutina, setUpdatingRutina] = useState(false);
  const [rutinaUpdated, setRutinaUpdated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { setTitle, setName, setContent } = useMetaDataContext();
        
  useEffect(() => {
    setTitle("Editar Rutina");
    setName("description");
    setContent("Edita una rutina.");
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fullUrl = window.location.href;
      const segments = fullUrl.split('/');
      const id = segments[segments.length - 1];

      setIdRutina(id);
    }
  }, [router]);

  useEffect(() => {
    if (idRutina) {
      obtainRutina();
      obtainRelaciones();
    }
  }, [idRutina]);

  useEffect(() => {
    if (idsEjercicios.length > 0) {
      const uniqueIds = [...new Set(idsEjercicios)];

      setDefaultIds(uniqueIds);
      console.log("IDS seteados:", uniqueIds);
    }
  }, [idsEjercicios]);

  useEffect(() => {
    if (todasRelaciones.length > 0) {
      const ids = todasRelaciones.map(relacion => relacion.idEjercicio)

      setIdsEjercicios(ids);
    }
  }, [todasRelaciones]);

  //_____OBTENER DATOS DE LA RUTINA_______________________________________________________________________________________
  const obtainRutina = async () => {
    try {
      if (idRutina) {
        const response = await fetch(`/api/rutinas/${idRutina}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include' // Incluir cookies en la solicitud
        });
      
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API en la rutina.');
        }
    
        const data = await response.json();

        setNombre(data.nombre);
        setDescripcion(data.descripcion);
      }
      
    } catch (error) {
      console.error("Error al obtener la rutina:", error);
      setErrorMessage("Error al obtener datos de la rutina.");
    }
  };

  //____________OBTENER DATOS DE LAS RELACIONES___________________________________________
  const obtainRelaciones = async () => {
    try {
      if (idRutina) {
        const response = await fetch(`/api/rutinas-ejercicios?idRutina=${idRutina}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include' // Incluir cookies en la solicitud
        });

        if (!response.ok) {
          throw new Error('Error en la respuesta de la API en las asociaciones.');
        }
    
        const data = await response.json();

        console.log("Data Ejer: ", data);
        setTodasRelaciones(data);
      }
      
    } catch (error) {
      console.error("Error al obtener los ejercicios asociados a la rutina:", error);
      setErrorMessage("Error al obtener datos de las asociaciones.");
    }
  };


  const handleModal = () => {
    handleEjercicios();
    document.getElementById('my_modal_4').showModal();
  };
  
  const handleEjercicios = (idsSelecccionados) => {
    obtainEjercicios();
  };

  const guardarSeleccion = (selecciones) => {
    setIdsEjercicios(selecciones);
  };

  function eliminarRelaciones() {
    todasRelaciones.map(async (relacion, index) => {
    //  console.log(relacion)
      const responseDelete = await fetch(`/api/rutinas-ejercicios/${relacion.id}`, {
        method: 'DELETE',
        credentials: 'include' // Incluir cookies en la solicitud
      });

      if (responseDelete.ok) {
        console.log('Relaciones eliminadas.', relacion.id);
      }
    });
  }

  const obtainEjercicios = async () => {
    try {
      const response = await fetch(`/api/ejercicios`, {
        method: 'GET',
        credentials: 'include' // Incluir cookies en la solicitud
      });
      
      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }
  
      const data = await response.json();
      setTodosEjercicios(data);
    } catch (error) {
      console.error("Error al obtener los ejercicios:", error);
      setErrorMessage("Error al obtener datos de los ejercicios.");
    }
  };

  async function crearRelacion(idRutina, idEjercicio) {
    try {
      const response = await fetch(`/api/rutinas-ejercicios`, {
        method: 'POST',
        body: JSON.stringify({ idRutina, idEjercicio }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include' // Incluir cookies en la solicitud
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(
          errorData.errores?.map((e) => e.msg).join(', ') || 'Error al actualizar las asociaciones de la rutina'
        );
      }
    } catch (error) {
      console.error('Error al actualizar la relación:', error);
    }
  }

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setUpdatingRutina(true);
    setErrorMessage('');
    setRutinaUpdated(false);
  
    const response = await fetch(`/api/rutinas/${idRutina}`, {
      method: 'PUT',
      body: JSON.stringify({ nombre, descripcion }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include' // Incluir cookies en la solicitud
    });
  
    if (response.ok) {
      setRutinaUpdated(true);
      setUpdatingRutina(false);
  
      if (idRutina && todasRelaciones && idsEjercicios.length > 0) {
        eliminarRelaciones();
  
        console.log("LLEGAN: ", idsEjercicios);
  
        idsEjercicios.map((idEjercicio, index) => {
          crearRelacion(idRutina, idEjercicio);
        })
      }
    } else {
      const errorData = await response.json();
      setErrorMessage(
        errorData.errores?.map((e) => e.msg).join(', ') || 'Error al actualizar una rutina'
      );
      setUpdatingRutina(false);
    }
  }

  return (
    <main>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-2">Editar rutinas</h1>
          <p className="text-center text-gray-600 mb-6">Actualiza una rutina</p>

          {rutinaUpdated && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
              La rutina ha sido modificada. Verificalo en el <Link href="/cuenta/admin-panel" className="font-medium underline">panel de administrador</Link>.
            </div>
          )}
          {errorMessage && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(ev) => setNombre(ev.target.value)}
                disabled={updatingRutina}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>
            
            <div className="flex flex-col my-3 space-y-2">
              <label htmlFor="textarea" className="text-gray-600">
                Escribe una descripción:
              </label>
              <textarea
                id="textarea"
                value={descripcion}
                onChange={(ev) => setDescripcion(ev.target.value)}
                placeholder="Escribe aquí..."
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
              <p className="text-sm text-gray-500">
                Caracteres: {descripcion.length}
              </p>
            </div>
            
            <div>
              <button 
                type="button"
                onClick={() => handleModal()}
                disabled={updatingRutina}
                title="Elegir ejercicios"
                className='w-full shadow-md py-2 bg-[#52BCE8] rounded-md text-white hover:bg-[#52ACD8]'
              >
                <FileText size={20} className='inline-block'/>Elegir ejercicios
              </button>
              <div className="w-[100%]">
                <dialog id="my_modal_4" className="modal w-[45%] p-10 rounded-md">
                  <div className="modal-box m-auto w-14/15 max-w-full">
                    <h3 className="text-3xl font-bold mb-2">Ejercicios</h3>
                    <p className="pt-2 pb-1 text-gray-600">Selecciona los ejercicios pertenecientes a la rutina:</p>
                    <BotonesMultiples elementos={todosEjercicios} defaultIds={defaultIds} tipoElementos={'Ejercicios'} onEjerciciosSelected={handleEjercicios} onGuardar={guardarSeleccion}/>
                  </div>
                </dialog>
              </div>
            </div>

            <div className="w-[100%] py-2">
              <div className="w-[90%] justify-center h-[2px] bg-[#D2D2D255] mx-auto"></div>
            </div>

            <button
              type="submit"
              disabled={updatingRutina}
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updatingRutina ? 'Actualizando...' : 'Actualizar'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}