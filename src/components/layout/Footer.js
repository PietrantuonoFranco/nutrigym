'use client'
import React from 'react';
import NutriGymLogo from "../../public/NutriGym Logo.png"
import Image from 'next/image'
import { Mail, Instagram } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo */}
          <div className="flex justify-center md:justify-start">
            <Link href="/" className="w-20 transition-opacity hover:opacity-80">
              <Image
                src={NutriGymLogo}
                alt="NutriGym Logo"
                className="w-full"
              />
            </Link>
          </div>

          {/* Compañía */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Compañía
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/sobre-nosotros" 
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Acerca de NutriGym
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/terminos-y-condiciones-de-uso"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link 
                  href="/politicas-de-privacidad"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Políticas de Privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Contacto
            </h3>
            <div className="flex space-x-4">
              <Link 
                href="mailto:nutrigym.official@gmail.com"
                className="text-gray-400 hover:text-orange-500 transition-colors"
                target="_blank"
              >
                <Mail size={20} />
              </Link>
              <Link 
                href="https://www.instagram.com/nutrigym/"
                className="text-gray-400 hover:text-orange-500 transition-colors"
                target="_blank"
              >
                <Instagram size={20} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} NutriGym. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;