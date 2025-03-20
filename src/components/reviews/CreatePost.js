import React, { useCallback, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ImagePreview from "./ui/ImagePreview";
import { useCreatePost } from "./hooks/useCreatePost";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./ui/Modal";
import CategorySelector from "./ui/CategorySelector";

const CreatePostPage = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    categories: [],
  });
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState("");
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (mode) => {
    setActiveModal(mode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setActiveModal(null);
    setIsModalOpen(false);
  };

  const errorNotified = useRef(false);

  const navigate = useNavigate();

  const { createPost } = useCreatePost();

  const handleImageUpload = (files) => {
    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    setFiles((prev) => [...prev, ...files]);
    const imageUrls = imageFiles.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...imageUrls]);
  };

  const handleFileInput = (e) => {
    handleImageUpload(e.target.files);
  };

  const handleDeleteImage = (indexToDelete) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToDelete));
    setFiles((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    handleImageUpload(files);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((item) => !item)) {
      setError("Rellene todos los campos");
      return;
    }

    // Si tienes imágenes, agrégalas a FormData
    try {
      createPost({
        files,
        ...formData,
      });

      notify("Post creado exitosamente.", "success", "bottom-right", 1700);
    } catch {
      if (!errorNotified.current) {
        notify("Ha ocurrido un error inesperado", "error");
        errorNotified.current = true;
      }
    }
  };

  const notify = (
    message,
    type = "success",
    position = "bottom-right",
    autoClose = 4000
  ) => {
    toast[type](message, {
      position: position,
      autoClose: autoClose,
    });
  };

  toast.onChange((payload) => {
    if (payload.status === "removed" && payload.type === "success") {
      navigate("/mis-publicaciones");
    }
  });

  return (
    <>
      <h1 className="text-4xl font-bold mb-6 dark:text-white text-black">
        Crear Post
      </h1>

      <form
        noValidate
        onSubmit={handleSubmit}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="space-y-6"
      >
        <div>
          <label className="block text-lg font-medium mb-2 dark:text-white text-black">
            Título
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 dark:border-gray-600 border-gray-300"
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2 dark:text-white text-black">
            Categoría
          </label>
          <CategorySelector
            selectedCategories={formData.categories}
            onChange={(categories) => setFormData({ ...formData, categories })}
            maxCategories={8}
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-2 dark:text-white text-black">
            Descripción
          </label>
          <textarea
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            className="w-full p-2 borde rounded-md h-40 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 dark:border-gray-600 border-gray-300"
            placeholder="Escribe tu descripción aquí..."
          />
          {error && (
            <p className="text-red-500 font-medium text-sm text-start">
              {error}
            </p>
          )}
        </div>

        <div>
          <label className="block text-lg font-medium mb-2 dark:text-white text-black">
            Imagen
          </label>
          <div className="flex flex-wrap gap-4">
            {images.map((img, index) => (
              <ImagePreview
                key={index}
                image={img}
                index={index}
                onDelete={handleDeleteImage}
              />
            ))}
            <label
              className={`w-36 h-48 border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-blue-500"
              }`}
            >
              <div className="text-center text-sm text-gray-600 dark:text-gray-200">
                <p>Haz click o arrastra</p>
                <p>para añadir archivos</p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
                multiple
              />
            </label>
          </div>
        </div>

        <div className="border-t flex justify-end space-x-4 pt-4 border-gray-300 dark:border-gray-500">
          <button
            type="button"
            onClick={() => {
              openModal("warning");
            }}
            className="px-4 py-2 rounded-md transition-colors border
            hover:bg-gray-300 dark:hover:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-white "
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Guardar
          </button>
        </div>
      </form>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        mode={activeModal}
        onButtonBClick={() => {
          navigate("/mis-publicaciones");
          closeModal;
        }}
        message="Perderás todos tus cambios"
        buttonB="Descartar cambios"
        buttonA="Seguir editando"
      />
    </>
  );
};

export default CreatePostPage;
