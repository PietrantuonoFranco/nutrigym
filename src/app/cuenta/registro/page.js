"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useMetaDataContext } from "@/components/layout/metaDataContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { setTitle, setName, setContent } = useMetaDataContext();
  
  useEffect (() => {
    setTitle("Registro");
    setName("description");
    setContent("Crea tu cuenta y comenza a utilizar nuestros servicios.");
  }, []);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setErrorMessage('');
    setUserCreated(false);

    try {
      const response = await fetch(`/api/usuarios`, {
        method: 'POST',
        body: JSON.stringify({ 
          email, 
          contrasenia, 
          nombre, 
          apellido, 
          idRol: 2  // Usuario normal
        }),
        headers: { 
          'Content-Type': 'application/json' 
        },
        credentials: 'include',
      });

      if (response.ok) {
        setUserCreated(true);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.errores?.map(e => e.msg).join(', ') || 'Error al registrar usuario');
      }
    } catch (error) {
      setErrorMessage('Error al conectar con el servidor. Por favor, intenta de nuevo más tarde.');
    } finally {
      setCreatingUser(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900">
      <div className="max-w-md w-full mx-auto md:rounded-2xl p-4 md:p-8 md:shadow-input bg-gray-100 dark:bg-zinc-900 md:bg-white md:dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center">
          Registrarse
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300 text-center">
          Crea tu cuenta y comienza a utilizar nuestros servicios
        </p>

        {userCreated && (
          <div className="my-4 p-4 bg-green-100 text-green-700 rounded-md dark:bg-green-900 dark:text-green-100">
            El usuario ha sido creado. Ahora puedes <Link href="/account/login" className="font-medium underline">iniciar sesión</Link>.
          </div>
        )}
        {errorMessage && (
          <div className="my-4 p-4 bg-red-100 text-red-700 rounded-md dark:bg-red-900 dark:text-red-100">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="my-8">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(ev) => setNombre(ev.target.value)}
                disabled={creatingUser}
                required
                className="selection:bg-orange-500 selection:text-white"
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="apellido">Apellido</Label>
              <Input
                id="apellido"
                type="text"
                placeholder="Apellido"
                value={apellido}
                onChange={(ev) => setApellido(ev.target.value)}
                disabled={creatingUser}
                required
                className="selection:bg-orange-500 selection:text-white"
              />
            </LabelInputContainer>
          </div>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              disabled={creatingUser}
              required
              className="selection:bg-orange-500 selection:text-white"
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={contrasenia}
              onChange={(ev) => setContrasenia(ev.target.value)}
              disabled={creatingUser}
              required
              className="selection:bg-orange-500 selection:text-white"
            />
          </LabelInputContainer>

          <button
            type="submit"
            disabled={creatingUser}
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          >
            {creatingUser ? 'Registrando...' : 'Registrarse'} &rarr;
            <BottomGradient />
          </button>

          <p className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-300">
            Ya tienes una cuenta?{' '}
            <Link href="/cuenta/inicio-de-sesion" className="font-medium text-black dark:text-white hover:underline">
              Iniciar sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};