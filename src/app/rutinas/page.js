"use client"

import { motion } from 'framer-motion';
import { Dumbbell } from 'lucide-react'
import RutCard from "../../components/rutCard.js"
import rutinasInfo from "../../mocks/rutinasInfo.js"
import Link from 'next/link.js';
import { useEffect } from 'react';
import { useMetaDataContext } from '@/components/layout/metaDataContext.js';
import { useRouter } from "next/navigation.js"

export default function RutinasPage() {
  const router = useRouter();
  const { setTitle, setName, setContent } = useMetaDataContext();
        
  useEffect (() => {
    setTitle("Rutinas");
    setName("description");
    setContent("Elige una opción para continuar.");
  }, []);

  const handleClick = (page) => {
    router.push(page);
  }

  return (
    <main className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 overflow-hidden p-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary opacity-10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary opacity-10 rounded-full filter blur-3xl"></div>
      </div>
      <section className="min-h-screen py-16 relative overflow-hidden">
        {/* Decorative background elements */}
        

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-block">
              <h1 className="text-5xl font-extrabold text-gray-800 mb-4 relative">
                La mejor rutina para vos
                <span className="absolute -top-6 -right-6 text-primary opacity-20">
                  <Dumbbell size={48} />
                </span>
              </h1>
              <div className="h-1 w-1/3 bg-primary mx-auto rounded-full"></div>
            </div>
            <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
              Seleccioná la rutina que mejor se adapte a tus objetivos y comienza tu viaje hacia un cuerpo más fuerte y saludable.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="m-auto w-[75%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
          >
            {rutinasInfo.map((rutinaInfo, index) => (
              <Link key={index} href={`rutinas/${rutinaInfo.titulo}`}>
              <RutCard 
                key={index}
                titulo={rutinaInfo.titulo}
                descripcion={rutinaInfo.descripcion}
                icon={rutinaInfo.icon}
              />
              </Link>
            ))}
          </motion.div>
        </div>
      </section>
          
      <section className="py-10">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-4">¿Necesitas realizar una rehabilitación?</h3>
            <p className="text-xl text-gray-600 mb-8">Aquí te brindamos la posibilidad de agendar turnos con nuestros kinesiólogos de confianza.</p>
            <button
              onClick={() => handleClick ("/kinesiologos")}
              className="hover:scale-105 bg-primary text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-primary-dark transition duration-300"
            >
              Saca tu turno!
            </button>
          </div>
        </section>
      
    </main>
  );
}