import { useEffect, useState } from "react";

const usePostCategories = token => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null); // Estado para manejar errores

    useEffect(() => {
        const fetchCategories = async () => {
            // Verificar si ya están en localStorage
            const storedCategories = localStorage.getItem("postCategories");
            if (storedCategories) {
                setCategories(JSON.parse(storedCategories));
                return; // No hacer fetch si ya existen
            }

            try {
                
                // Obtener las categorías
                const response = await fetch("http://localhost:8000/categories/", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                
                const data = await response.json();

                // Ordenar las categorías
                const sortedCategories = data.sort((a, b) => a.name.localeCompare(b.name));

                // Actualizar el estado y localStorage
                setCategories(sortedCategories);
                localStorage.setItem("postCategories", JSON.stringify(sortedCategories));
            } catch (error) {
                console.error("Error fetching categories:", error);
                setError(error.message); // Guardar el mensaje de error
            }
        };

        fetchCategories();
    }, []);

    return { categories, error }; // Devolver las categorías y el error
};

export default usePostCategories;