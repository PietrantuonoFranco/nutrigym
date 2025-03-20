import { useState } from 'react';
import getArgyToken from './utils/getArgyToken';
import Link from 'next/link';

const Modal = ({ isOpen, closeModal, setArgyToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [error, setError] = useState(null); // Estado para manejar errores



  if (!isOpen) return null;

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();
    setLoginInProgress(true);
    setError(null); // Limpiar errores anteriores

    try {
      const token = await getArgyToken(username, password);
    
      if (token instanceof Error) {
        setError("No se pudo obtener el token. Verifica tus credenciales.");
      } else {
        setArgyToken(token); // Guardar el token en el estado
        closeModal(); // Cerrar el modal
      }
    } catch (error) {
      setError("Error al iniciar sesión. Inténtalo de nuevo.");
      console.error(error);
    } finally {
      setLoginInProgress(false); // Restablecer el estado de carga
    }
  };

  return (
    <div className="z-10 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-2">Inicia sesión en ArgyReviews</h1>
        <p className="text-center text-gray-600 mb-6">Accede a tu cuenta</p>

        {/* Mostrar mensaje de error si existe */}
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="text-gray-600">
              Nombre de usuario
            </label>
            <input
              id="username"
              type="text" // Cambiado de "username" a "text"
              placeholder="Escribe tu nombre de usuario"
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
              disabled={loginInProgress}
              required
              autoComplete="current-username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-gray-600">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Escribe tu contraseña"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              disabled={loginInProgress}
              required
              autoComplete="current-password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900"
            />
          </div>
          <button
            type="submit" // Cambiado de "button" a "submit"
            disabled={loginInProgress}
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loginInProgress ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Link href="http://localhost:8000" className="font-medium text-black hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Modal;