'use client'

import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import Modal from "@/components/kinesiologos/Modal"
import Image from "next/image"
import DraSmith from "../../public/Dra. Smith.jpeg"
import DrWilliams from "../../public/Dr. Williams.jpeg"
import DrJohnson from "../../public/Dr. Johnson.jpeg"
import DrBrown from "../../public/Dr. Brown.jpeg"
import { useMetaDataContext } from '@/components/layout/metaDataContext';

export default function KinesiologosPage () {
  const [kinesiologo, setKinesiologo] = useState(null);
  const [kinesiologos, setKinesiologos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [turno, setTurno] = useState(null)
  const { setTitle, setName, setContent } = useMetaDataContext();
          
  useEffect (() => {
    setTitle("Kinesiólogos");
    setName("description");
    setContent("Conocé los kinesiólogos y conseguí tu turno.");
  }, []);


  const handleClick = (kinesiologo) => {
    setKinesiologo(kinesiologo);
    setIsModalOpen(true);
  }

  useEffect(() => {
    const getKinesiologos = async () => {
      try {
        const response = await fetch("http://localhost:5000/obtener-kinesiologos");

        if (response.ok) {
          const data = await response.json();

          setKinesiologos(data.kinesiologos);
        } else {
          throw new Error("Error al obtener los kinesiologos");
        }
      } catch {
        console.error(e);
      }
    }

    getKinesiologos();
  }, []);

  useEffect(() => {
    const emitirAviso = async () => {
      try {
        if (turno) {
          Swal.fire({
            title: '¡Turno registrado!',
            text: `${turno.paciente} ha registrado un turno con ${turno.doctor === "Dra. Smith" ? "la" : "el"} ${turno.doctor} el día ${turno.dia} a las ${turno.horario}`,
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'Aceptar',
          });
        }
      } catch {
        console.error(e);
      }
    }

    emitirAviso();
  }, [turno]);

  return (
    <main className="bg-gray-100 overflow-hidden py-8 px-20">
      {kinesiologo && (
        <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} setTurno={setTurno} kinesiologo={kinesiologo}/>
      )}
      <section className="min-h-screen relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Especialistas</h3>
          <p className="text-xl text-gray-600 mb-4">Selecciona uno de nuestros kinesiólogos para sacar un turno.</p>
        </div>

        {kinesiologos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-6">
            {kinesiologos.map((kinesiologo) => (
              <div key={kinesiologo.id} className="hover:scale-105 bg-white shadow-md rounded-lg p-6 border-gray-300 w-full">
                <div className="flex flex-col items-center justify-center mb-1 space-y-4 relative">
                  <div className="p-1 flex items-center justify-center font-bold">
                    <div className="rounded-full overflow-hidden w-32 h-32 shadow-md"> {/* Contenedor circular */}
                      <Image
                        src={
                          kinesiologo.nombre === "Dra. Smith"
                            ? DraSmith
                            : kinesiologo.nombre === "Dr. Williams"
                            ? DrWilliams
                            : kinesiologo.nombre === "Dr. Johnson"
                            ? DrJohnson
                            : DrBrown
                        }
                        alt={kinesiologo.nombre}
                        className="object-cover w-full h-full" // Asegura que la imagen cubra el contenedor
                      />
                    </div>
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-center">
                      <span className="font-bold text-2xl">
                        {kinesiologo.nombre}
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="text-gray-500 text-lg">
                        {kinesiologo.especialidad}
                      </span>
                    </div>
                  </div>

                  <div className="w-[100%] py-2">
                    <div className="w-[90%] justify-center h-[2px] bg-[#D2D2D255] mx-auto"></div>
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-center">
                      <p className="text-gray-500 text-md">
                        Turnos disponibles: { 
                          kinesiologo.disponible ? 
                            <span className="text-green-500 font-semibold text-md">Si</span> 
                          : 
                            <span className="text-red-500 font-semibold text-md">No</span>
                          }
                      </p>
                    </div>
                    {(kinesiologo.disponible) && (
                      <div className="p-4 pb-0">
                        <button
                          onClick={() => handleClick(kinesiologo)}
                          className="hover:scale-105 bg-primary text-white  text-sm font-semibold py-2 px-5 rounded-full shadow-lg hover:bg-primary-dark transition duration-300"
                        >
                          Solicitar turno
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}