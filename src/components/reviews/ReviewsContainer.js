'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation.js";
import Review from "./Review";
import { motion } from "framer-motion";

export default function Reviews() {
  const router = useRouter();

  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    try {
      const response = await fetch("http://localhost:8000/carousels/");

      if (response.ok) {
        const data = await response.json();
        setReviews(data.recent_posts);
      } else {
        console.error("Se ha producido un error al obtener las reseñas.");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const handleClick = (page) => {
    router.push(page);
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="py-16 bg-gray-100"
    >
      <h3 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-600">
        Opiniones de nuestro servicio
      </h3>
      <div className="container mx-auto px-4">
        {reviews.length === 0 ? (
          <div className="p-8 text-center max-w-2xl mx-auto">
            <div className="mb-6">
              <svg className="w-16 h-16 text-orange-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </div>
            <h4 className="text-2xl font-bold mb-4 text-gray-800">¡Aún no hay reseñas disponibles!</h4>
          </div>
        ) : (
          <div className="relative">
            <button 
              onClick={prevSlide} 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform z-10"
            >
              &#10094;
            </button>
            <div className="overflow-hidden mx-6 z-1">
              <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}>
                {reviews.map((review, index) => (
                  <div key={index} className="w-1/3 p-2">
                    <div className="bg-white rounded-lg shadow-lg h-full">
                      <Review review={review} postId={review.id} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button 
              onClick={nextSlide} 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform z-10"
            >
              &#10095;
            </button>
          </div>
        )}
      </div>

      <div className="w-full flex items-center justify-center mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleClick("/crear-review")}
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300"
        >
          ¡Déjanos tu opinión!
        </motion.button>
      </div>
    </motion.section>
  );
}