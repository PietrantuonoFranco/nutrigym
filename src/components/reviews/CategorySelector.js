import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import usePostCategories from "./hooks/usePostCategories";

const CategorySelector = ({
  selectedCategories,
  onChange,
  maxCategories = 8,
  token
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { categories } = usePostCategories(token); // Usa tu hook personalizado
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    if (categories) {
      const filtered = categories.filter(
        (category) =>
          category.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !selectedCategories.includes(category.id)
      );
      setFilteredCategories(filtered);
    }
  }, [searchTerm, selectedCategories, categories]);

  const handleSelectCategory = (category) => {
    if (selectedCategories.length < maxCategories) {
      onChange([...selectedCategories, category.id]);
      setSearchTerm("");
      setIsOpen(false);
    }
  };

  const handleRemoveCategory = (categoryIdToRemove) => {
    onChange(selectedCategories.filter((id) => id !== categoryIdToRemove));
  };

  const canAddMore = selectedCategories.length < maxCategories;

  return (
    <div className="space-y-2">
      {/* Selected Categories */}
        <div className="flex flex-wrap gap-2">
        {selectedCategories.map((categoryId) => {
          const category = categories.find((cat) => cat.id === categoryId);
          return (
            category && (
              <span
                key={category.id}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-700"
              >
                {category.name}
                <button
                  onClick={() => handleRemoveCategory(category.id)}
                  className="ml-2 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <X size={14} />
                </button>
              </span>
            )
          );
        })}
      </div>
      

      {/* Category Selector */}
      <div className="relative">
        <div className="flex items-center">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsOpen(true)}
              placeholder={
                canAddMore
                  ? "Buscar o seleccionar categoría"
                  : `Máximo ${maxCategories} categorías`
              }
              disabled={!canAddMore}
              className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900"
            />
          </div>
        </div>

        {isOpen && canAddMore && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-900 rounded-md shadow-lg max-h-60 overflow-auto">
            <ul className="py-1">
              {filteredCategories.map((category) => (
                <li
                  key={category.id}
                  onClick={() => handleSelectCategory(category)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-300"
                >
                  {category.name}
                </li>
              ))}
              {filteredCategories.length === 0 && (
                <li className="px-4 py-2 text-gray-500 dark:text-gray-400">
                  No se encontraron categorías
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Category limit indicator */}
      <p className="text-sm text-gray-500">
        {selectedCategories.length} de {maxCategories} categorías seleccionadas
      </p>
    </div>
  );
};

export default CategorySelector;