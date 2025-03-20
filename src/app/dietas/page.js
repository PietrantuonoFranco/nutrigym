"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Leaf } from 'lucide-react'
import Link from 'next/link.js';
import DietCard from "../../components/dietCard"
import { dietasInfo } from "../../mocks/dietasInfo"
import { useMetaDataContext } from '@/components/layout/metaDataContext';

export default function DietasPage() {
  const [dietas, setDietas] = useState([])

  const { setTitle, setName, setContent } = useMetaDataContext();
        
  useEffect (() => {
    setTitle("Dietas");
    setName("description");
    setContent("Elige una opción para continuar.");
  }, []);


  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setDietas(dietas)
    }, 500)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Descubre tu <span className="text-green-600">Dieta Ideal</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Explora nuestras dietas cuidadosamente seleccionadas para encontrar la que mejor se adapte a tus objetivos de salud y estilo de vida.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {dietasInfo.map((dieta, index) => (
            <Link key={index} href={`dietas/${dieta.nombre}`}>
              <DietCard key={index} dieta={dieta} index={index} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}