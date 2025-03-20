'use client'

import { useRouter } from "next/navigation.js"
import { Dumbbell, Salad } from "lucide-react"
import Card from "../components/Card.js"
import Reviews from "../components/reviews/ReviewsContainer.js"
import { motion } from "framer-motion"
import Image from "next/image"
import musculo from "../public/musculo.jpg"
import { TypingAnimation } from "../components/ui/typingAnimation.js"

export default function Home() {
  const router = useRouter();

  const handleClick = (page) => {
    router.push(page);
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <>
      <div className="min-h-screen">
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/90 to-orange-500/90"></div>

          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="container mx-auto px-4 relative"
          >
            <motion.div 
              variants={fadeInUp}
              className="max-w-3xl mx-auto text-center text-white"
            >
              <TypingAnimation
                className="text-6xl font-extrabold mb-4 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-200"
                duration={50}
                startOnView={false}
              >
                Tu salud, nuestro objetivo.
              </TypingAnimation>
              <p className="text-xl mb-8 text-gray-100">
                ¿Quieres transformar tu cuerpo y sentirte más saludable? ¡Somos tu equipo! Ofrecemos planes personalizados de entrenamiento y nutrición para ayudarte a alcanzar tus metas.
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-8 mt-12"
            >
              <motion.div variants={fadeInUp}>
                <Card 
                  title="Generá tu plan de entrenamiento"
                  description="Diseña tu cuerpo ideal con nuestro plan de entrenamiento personalizado. Mejora tu condición física. ¡Adaptamos cada rutina a tus necesidades y objetivos!"
                  icon={<Dumbbell size={24} className="text-orange-500" />}
                  handleClick={() => handleClick("/rutinas")}
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Card 
                  title="Generá tu plan nutricional"
                  description="Alimenta tu cuerpo y transforma tu vida con nuestro plan nutricional! Crea hábitos alimenticios saludables y eficaces para ayudarte a alcanzar tus metas."
                  icon={<Salad size={24} className="text-orange-500" />}
                  handleClick={() => handleClick("/dietas")}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        <section className="relative py-16">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-white via-orange-50 to-white" />
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-4 text-center relative"
          >
            <h3 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-600">
              ¿Tenés dudas sobre qué es lo que buscas?
            </h3>
            <p className="text-xl text-gray-600 mb-8">
              Aquí te brindamos asesoramiento sobre cuáles son tus verdaderos objetivos y cómo podés alcanzarlos.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleClick("crear-plan")}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300"
            >
              Generá tu plan!
            </motion.button>
          </motion.div>
        </section>

        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-16 bg-gray-100"
        >
          <div className="container mx-auto px-4">
            <h3 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-600">
              Sobre nosotros
            </h3>
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 p-8">
                  <p className="text-lg mb-6">
                    En <span className="text-orange-500 font-bold">NutriGym</span>, creemos que cada persona es única y merece un plan de salud y bienestar personalizado. Somos un equipo que intenta ayudar a cada usuario a alcanzar sus metas, ya sea que quieras perder peso, ganar masa muscular, mejorar tu rendimiento deportivo o simplemente sentirte más saludable y fuerte.
                  </p>
                  <p className="text-lg font-semibold mb-4">Con nuestros <span className="text-orange-500">planes personalizados</span>, tendrás acceso a:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li><span className="font-semibold">Entrenamientos diseñados a tu medida:</span> Adaptados a tus objetivos, nivel de condición física y preferencias.</li>
                    <li><span className="font-semibold">Guías nutricionales completas:</span> Planes de alimentación flexibles y deliciosos que se ajustan a tu estilo de vida.</li>
                    <li><span className="font-semibold">Soporte personalizado:</span> Un chat a tu disposición para responder a tus preguntas y motivarte en cada paso del camino.</li>
                  </ul>
                  <p className="text-lg mt-6">
                    Nuestra misión es empoderarte para que tomes el control de tu salud y alcances tu máximo potencial. ¡Únete a nuestra comunidad y descubre la mejor versión de ti mismo!
                  </p>
                </div>
                <div className="md:w-1/2">
                  <Image 
                    src={musculo} 
                    alt="Logros de NutriGym" 
                    width={800} 
                    height={600} 
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <Reviews/>
      </div>
    </>
  )
}