"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useMetaDataContext } from "@/components/layout/metaDataContext";
import CategorySelector from "@/components/reviews/CategorySelector"
import PrimeroRegistrate from "@/components/Primero-registrate";
import { useSession } from "next-auth/react";
import ModalArgyAccount from "@/components/reviews/ModalArgyAccount"

export default function CreateReviewPage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    categories: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [creatingReview, setCreatingReview] = useState(false);
  const [reviewCreated, setReviewCreated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [argyToken, setArgyToken] = useState("");

  const { data: session } = useSession();
  
  const { setTitle, setName, setContent } = useMetaDataContext();

  useEffect(() => {
    setTitle("Crear Reseña");
    setName("description");
    setContent("Dejanos una reseña de nuestros servicios.");
  }, []);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingReview(true);
    setErrorMessage('');
    setReviewCreated(false);

    const response = await fetch(`http://localhost:8000/posts/`, {
      method: 'POST',
      body: JSON.stringify(formData) ,
      headers: {
        "Authorization": `Bearer ${argyToken}`,
        "Content-Type": "application/json"
      }
    });
  
    if (response.ok) {
      setReviewCreated(true);
      setCreatingReview(false);
      
    } else {
      const errorData = await response.json();
      setErrorMessage(
        errorData.errores?.map((e) => e.msg).join(', ') || 'Error al crear la reseña'
      );
      setCreatingReview(false);
    }
  }
  
  const getToken = (token) => {
    setArgyToken(token);
  }

  return session ? (
    <main className="py-8 bg-gray-100">
      <div className="min-h-screen flex items-center justify-center">
        {isModalOpen ? (
          <ModalArgyAccount isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} setArgyToken={getToken}/>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold text-center mb-2">Crear reseña</h1>
            <p className="text-center text-gray-600 mb-6">Crea una reseña de nuestros servicios</p>

            {reviewCreated && (
              <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
                La reseña ha sido creada con exito. Verificalo en nuestra <Link href="/" className="font-medium underline">página de inicio</Link> o bien en <Link href="http://localhost:8000/" className="font-medium underline">ArgyReviews</Link>.
              </div>
            )}
            {errorMessage && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="titulo" className="text-gray-600">
                  Título
                </label>
                <input
                  id="titulo"
                  type="text"
                  placeholder="Escribe un título"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  disabled={creatingReview}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900"
                />
              </div>

              <div className="flex flex-col my-3 ">
                <label className="text-gray-600">
                  Categoría
                </label>
                <CategorySelector
                  selectedCategories={formData.categories}
                  onChange={(categories) => setFormData({ ...formData, categories })}
                  maxCategories={8}
                  token={argyToken}
                />
              </div>
              
              <div className="flex flex-col my-3 space-y-2">
                <label htmlFor="textarea" className="text-gray-600">
                  Comentario
                </label>
                <textarea
                  id="textarea"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Escribe aquí..."
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900"
                />
                <p className="text-sm text-gray-500">
                  Caracteres: {formData.content.length}
                </p>
              </div>

              <div className="w-[100%] py-2">
                <div className="w-[90%] justify-center h-[2px] bg-[#D2D2D255] mx-auto"></div>
              </div>

              <button
                type="submit"
                disabled={creatingReview}
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {creatingReview ? 'Enviando...' : 'Enviar'}
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  ) : (
    <PrimeroRegistrate/>
  );
}