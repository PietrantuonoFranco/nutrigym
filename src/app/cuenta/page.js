'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BackgroundBeams } from "@/components/ui/background-beams"
import { motion } from "framer-motion"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { useMetaDataContext } from '@/components/layout/metaDataContext'
import { useEffect } from 'react'

export default function AccountPage() {
  const { setTitle, setName, setContent } = useMetaDataContext();
  
  useEffect(() => {
    setTitle("Cuenta");
    setName("description");
    setContent("Inicia sesión o registrate en NutriGym, donde ofrecemos planes personalizados y dietas.");
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-neutral-100 flex items-center justify-center -mt-20 md:-mt-5 relative"
    >
      <motion.div 
        variants={itemVariants}
        className="h-full w-full relative flex flex-col items-center justify-center p-4 md:px-8 z-20"
      >
        <motion.div 
          variants={itemVariants}
          className="max-w-2xl w-full"
        >
          <motion.h1 
            variants={itemVariants}
            className="z-20 text-2xl xxsm:text-3xl md:text-4xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-orange-300 to-orange-600 text-center font-sans font-bold pb-2 md:pb-3 mb-2 md:mb-3"
          >
            Bienvenido a NutriGym
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-neutral-400 text-center text-xs sm:text-sm md:text-base max-w-lg mx-auto mb-4 md:mb-8 relative z-10 px-2"
          >
            Descubre nuestros planes personalizados y dietas adaptadas a tus necesidades.
          </motion.p>
          <motion.div 
            variants={itemVariants}
            className="flex flex-col space-y-3 md:space-y-0 md:flex-row justify-center md:gap-4 relative z-10 px-4 md:px-0"
          >
            <Link href="/cuenta/inicio-de-sesion" className="w-full md:w-auto">
              <HoverBorderGradient
                className="tracking-wider text-xs sm:text-sm md:text-base"
                containerClassName="w-full"
                duration={2}
              >
                INICIAR SESIÓN
              </HoverBorderGradient>
            </Link>
            <Link href="/cuenta/registro" className="w-full md:w-auto">
              <HoverBorderGradient
                className="tracking-wider text-xs sm:text-sm md:text-base"
                containerClassName="w-full"
                duration={2}
              >
                CREAR CUENTA
              </HoverBorderGradient>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
      <BackgroundBeams className="z-10" />
    </motion.div>
  )
}