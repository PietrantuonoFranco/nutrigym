import React, { useEffect, useState, useRef } from "react";
import TimeSince from "./utils/timeSince";
import { Star, CircleUserRound } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Review = ({ review, postId }) => {
  const [owner, setOwner] = useState({});
  const [openMenuId, setOpenMenuId] = useState(null);
  const [valorations, setValorations] = useState({
    likes: "",
    dislikes: "",
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const stars = Array.from({ length: 5 });

  const menuRef = useRef(null);

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const fetchData = async (url, setData, field = null, urlParam = "") => {
    try {
      const response = await fetch(`http://localhost:8000${url}${urlParam}`);
      const data = await response.json();

      if (field) {
        setData((prev) => ({ ...prev, [field]: data }));
      } else {
        setData(data);
      }
    } catch (error) {
      console.error(`Error loading data from ${url}:`, error);
    }
  };

  useEffect(() => {
    fetchData(`/users/${review.owner}/`, setOwner);
    fetchData(
      `/posts/${postId}/reviews/${review.id}/valorations/`,
      setValorations
    );
  }, [postId, review.id]);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenMenuId(null);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white shadow-md rounded-md p-6 border-gray-300 w-full h-full flex flex-col justify-between">
      <div className="flex items-start mb-1 relative">
        <div className="mr-4">
          <div className="p-1 flex items-center justify-center font-bold">
            <CircleUserRound size={38} className="text-primary" />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center">
            {owner.username && (
              <span className="text-gray-700 font-semibold mr-2">
                {owner.username}
              </span>
            )}
          </div>
          <div className="flex flex-col justify-center mb-2">
            <span className="text-gray-500 text-sm">
              {TimeSince(review.created_at)}
            </span>
            <div className="flex items-center">
              {stars.map((_, index) => (
                <Star
                  key={index}
                  className={`w-4 h-4 ${
                    index < review.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="px-2">
        <div className="my-2 font-bold">
          <h4>{review.title || "Sin título"}</h4>
        </div>
        <div className="text-sm text-gray-700">
          {review.content ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ src, alt }) => (
                  <img src={src} alt={alt} className="h-52 w-auto rounded-lg" loading="lazy" />
                ),
              }}
            >
              {isExpanded || review.content.length <= 100
                ? review.content.replace(/\n/g, "  \n")
                : `${review.content.slice(0, 100)}...`}
            </ReactMarkdown>
          ) : (
            <p>No hay reseñas disponibles actualmente.</p>
          )}
          {review.content && review.content.length > 100 && (
            <button
              onClick={toggleExpand}
              className="text-blue-500 hover:underline"
            >
              {isExpanded ? "Mostrar menos" : "Mostrar más"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;
