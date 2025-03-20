'use client';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useSession } from 'next-auth/react';
import PrimeroRegistrate from '@/components/Primero-registrate';
import { useMetaDataContext } from '@/components/layout/metaDataContext';
import { useRouter } from "next/navigation";

const CrearPlanPage = () => {
  const { data: session } = useSession();
  const { setTitle, setName, setContent } = useMetaDataContext();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [experience, setExperience] = useState('');
  const [goal, setGoal] = useState('');
  const [diet, setDiet] = useState('');
  const [planAlimenticio, setPlanAlimenticio] = useState('1');
  const [error, setError] = useState('');
  const [precio, setPrecio] = useState(14.99);
  const [descuentoAplicado, setDescuentoAplicado] = useState(false);

  useEffect(() => {
    setTitle("Crear Plan");
    setName("description");
    setContent("Crea un plan de entrenamiento y alimenticio.");

    // Acceder a localStorage solo en el lado del cliente
    const descuento = window.localStorage.getItem('descuentoB');
    if (descuento) {
      setDescuentoAplicado(true);
      calcuPrecio();
    }
  }, []);

  useEffect(() => {
    const precioStorage = window.localStorage.getItem('valorDescuento');

    if (precioStorage) {
      setPrecio(precioStorage);
    }
    }, [])

const calcuPrecio = () => {
  if (descuentoAplicado) {
    setPrecio((precio - (precio * 0.3)).toFixed(2));
  }
}
//VERIFICAR DESCUENTO
const descuentoForm = () => {
  if (descuentoAplicado) {
    Swal.fire({
      icon: 'info',
      title: 'Descuento ya aplicado',
      text: 'Ya tienes un descuento aplicado.',
    });
    return;
  }

  Swal.fire({
    title: 'CuponMania',
    html: `
      <p>Logueate o registrate para obtener un cupón</p>
      <input type="email" id="email" class="swal2-input" placeholder="Email">
      <input type="password" id="password" class="swal2-input" placeholder="Contraseña">
    `,
    confirmButtonText: 'Verificar',
    focusConfirm: false,
    showLoaderOnConfirm: false, // Desactivar animación de carga
    preConfirm: async () => {
      const email = Swal.getPopup().querySelector('#email').value;
      const password = Swal.getPopup().querySelector('#password').value;
      if (!email || !password) {
        Swal.showValidationMessage(`Por favor ingrese ambos campos`);
        return;
      }

      const response = await fetch('http://localhost:5000/verificarUsuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, // Incluir cookies en la solicitud
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);
      if (data.status === 'Exitoso') {
        Swal.fire({
          icon: 'success',
          title: 'Descuento aplicado',
          text: `Descuento aplicado: ${data.descuento * 100}%`,
          showCancelButton: true,
          confirmButtonText: 'Aplicar Descuento',
          cancelButtonText: 'Cerrar',
        }).then((result) => {
          if (result.isConfirmed) {
            fetch('http://localhost:5000/obtenerDescuento', {
              method: 'GET',
            }).then((response) => response.json())
              .then((data) => {
                console.log('Descuento obtenido:', data.descuento);
                const nuevoPrecio = precio - (precio * data.descuento);

                setPrecio(nuevoPrecio.toFixed(2)); // Actualizar el precio con el descuento aplicado
                setDescuentoAplicado(true); // Marcar el descuento como aplicado

                const valueB = true;

                window.localStorage.setItem('descuentoB', valueB);
                
                window.localStorage.setItem('valorDescuento', nuevoPrecio.toFixed(2));
              });
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Usuario no encontrado. Por favor, verifica tus credenciales.',
        });
      }
    }
  });
};
//APLICAR DESCUENTO

  const handleNext = () => {
    let valid = true;
    switch (step) {
      case 1:
        if (!age || !gender) {
          valid = false;
          setError('Por favor complete todos los campos');
        }
        break;
      case 2:
        if (!experience) {
          valid = false;
          setError('Por favor complete todos los campos');
        }
        break;
      case 3:
        if (!goal) {
          valid = false;
          setError('Por favor complete todos los campos');
        }
        break;
      case 4:
        if (!diet) {
          valid = false;
          setError('Por favor complete todos los campos');
        }
        break;
      default:
        break;
    }
    if (valid) {
      setError('');
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!age || !gender || !experience || !goal || !diet) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    const data = { age, gender, experience, goal, diet };

    const planMap = {
      '1-1': 4, '1-2': 5, '1-3': 6,
      '2-1': 4, '2-2': 5, '2-3': 6,
      '3-1': 7, '3-2': 8, '3-3': 9,
      '4-1': 1, '4-2': 2, '4-3': 3,
    };
    const key = `${data.goal}-${data.diet}`;
    setPlanAlimenticio(planMap[key]);

    await new Promise((resolve) => setTimeout(resolve, 0));

    console.log(planAlimenticio);

    try {
      // Mostrar loading
      Swal.fire({
        title: 'Generando plan...',
        text: 'Por favor espere',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // Obtener datos secuencialmente
      const rutina = await fetch(`/api/rutinas/${data.goal}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      if (!rutina.ok) throw new Error('Error al obtener rutina');
      const rutinaData = await rutina.json();

      const ejercicios = await fetch(`/api/rutinas-ejercicios?idRutinaForEjercicios=${data.goal}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      if (!ejercicios.ok) throw new Error('Error al obtener ejercicios');
      const ejerciciosData = await ejercicios.json();

      const plan = await fetch(`/api/planes-alimenticios/${planAlimenticio}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      if (!plan.ok) throw new Error('Error al obtener plan alimenticio');
      const planData = await plan.json();

      const idPlatillosResponse = await fetch(`/api/planes-platillos?idPlanAlimenticio=${planAlimenticio}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      if (!idPlatillosResponse.ok) throw new Error('Error al obtener IDs de platillos');
      const idPlatillos = await idPlatillosResponse.json();

      // Obtener platillos uno por uno
      const platillos = [];
      for (const platillo of idPlatillos) {
        const platilloResponse = await fetch(`/api/platillos/${platillo.id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        });
        if (!platilloResponse.ok) throw new Error(`Error al obtener platillo ${platillo.id}`);
        const platilloData = await platilloResponse.json();
        platillos.push(platilloData);
      }

      const responseData = {
        rutina: rutinaData,
        ejercicios: ejerciciosData,
        plan: planData,
        platillos,
      };

      console.log(responseData); //TODOS
      console.log(responseData)


      //Codigo para generar el pdf
      const doc = new jsPDF();
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(40, 40, 40);
      doc.text("Datos de la Rutina", 10, 10);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(60, 60, 60);
      doc.text(`Edad: ${age}`, 10, 20);
      doc.text(`Género: ${gender}`, 10, 30);
      doc.text(`Experiencia: ${experience}`, 10, 40);
      doc.text(`Objetivo: ${goal}`, 10, 50);
      doc.text(`Dieta: ${diet}`, 10, 60);
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text(`Nombre: ${responseData.rutina.nombre}`, 10, 70);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(60, 60, 60);

      const descripcion = doc.splitTextToSize(responseData.rutina.descripcion, 180);
      doc.text(descripcion, 10, 80);
      // Sección para los días de ejercicio
      const dias = ["Día 1", "Día 2", "Día 3", "Día 4", "Día 5", "Día 6"];
      const divisiones = ["Push", "Legs", "Pull"];
      dias.forEach((dia, index) => {
        const division = divisiones[index % 3];
        const ejerciciosDia = responseData.ejercicios.filter(
          (ejercicio) => ejercicio.divisionRutina === division
        );
      
        doc.autoTable({
          startY: index === 0 ? 90 : doc.lastAutoTable.finalY + 10,
          headStyles: { fillColor: [50, 150, 250], textColor: [255, 255, 255] },
          head: [
            [
              dia,
              "Nombre",
              "Descripción",
              "Repeticiones",
              "Series",
              "Músculo Afectado",
            ],
          ],
          body: ejerciciosDia.map((ejercicio) => [
            "",
            ejercicio.nombre,
            ejercicio.descripcion,
            ejercicio.cantidadRepeticionesRecomendadas,
            ejercicio.cantidadSeriesRecomendadas,
            ejercicio.musculoAfectado,
          ]),
          theme: "grid",
          margin: { left: 10, right: 10 },
          styles: { cellPadding: 4, fontSize: 10 },
        });
      });
      
      // Sección para el nombre y descripción del plan
      doc.autoTable({
        startY: doc.lastAutoTable.finalY + 10,
        headStyles: { fillColor: [100, 150, 255] },
        head: [["Nombre del Plan", "Descripción"]],
        body: [[responseData.plan.nombre, responseData.plan.descripcion]],
        theme: "grid",
      });
      
      // Sección para platillos
      const formatPlatillos = (platillos, turno) =>
        platillos
          .filter((platillo) => platillo.turno === turno)
          .map((platillo) => [platillo.nombre]);
      
      ["Desayuno", "Almuerzo", "Merienda", "Cena"].forEach((turno) => {
        const platillosTurno = formatPlatillos(responseData.platillos, turno.toLowerCase());
        doc.autoTable({
          startY: doc.lastAutoTable.finalY + 10,
          head: [[turno]],
          body: platillosTurno,
          theme: "grid",
          headStyles: { fillColor: [150, 200, 250], textColor: [0, 0, 0] },
          styles: { cellPadding: 3 },
        });
      });
      // Convertir el PDF a un array de bytes y crear URL
      const pdfBlob = doc.output('blob');

      // Mostrar alerta de descarga
      Swal.fire({
        title: '¡Felicidades!',
        text: 'Haz creado tu rutina',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Descargar PDF',
        cancelButtonText: 'Cerrar',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            // Convertir el blob a base64
            const reader = new FileReader();
            reader.readAsDataURL(pdfBlob);
            
            reader.onloadend = async () => {
              const base64data = reader.result;
              
              // Guardar el blob en base64 en la base de datos
              const pdfResponse = await fetch('/api/pdf', {
                method: 'POST',
                body: JSON.stringify({
                  pdf: base64data,
                  nombre: `rutina${session.user.nombre}.pdf`
                }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include' // Incluir cookies en la solicitud|
              });

              if (!pdfResponse.ok) {
                throw new Error('Error al guardar el PDF');
              }

              const pdfData = await pdfResponse.json();
              console.log('PDF guardado:', pdfData.data.id);

              

              // Actualizar el usuario con el ID del PDF si está autenticado
              if (session?.user?.email) {
                const updateResponse = await fetch(`/api/usuarios/${session.user.id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    idRutinaPdf: pdfData.data.id
                  }),
                  credentials: 'include' // Incluir cookies en la solicitud
                });

                if (!updateResponse.ok) {
                  console.error('Error al actualizar el usuario con el nuevo PDF');
                  
                }
              }

              // Descargar el PDF usando el blob
              const url = URL.createObjectURL(pdfBlob);
              const link = document.createElement('a');
              link.href = url;
              link.download = 'rutina.pdf';
              link.click();

              // Liberar la URL creada
              URL.revokeObjectURL(url);
              session.user.idRutinaPdf = pdfData.id;
            };

          } catch (error) {
            console.error('Error al guardar el PDF:', error);
            Swal.fire({
              title: 'Error',
              text: 'Hubo un error al guardar el PDF',
              icon: 'error'
            });
          }
        }
      });

    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al generar el plan. Por favor intente nuevamente.'
      });
    }
  };

  //Codigo para renderizar los pasos
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Paso 1: Información Personal</h2>
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                Edad
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={age}
                onChange={(ev) => setAge(ev.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Género
              </label>
              <select
                id="gender"
                name="gender"
                onChange={(ev) => setGender(ev.target.value)}
                value={gender}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Seleccione su género</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Paso 2: Experiencia</h2>
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                Nivel de Experiencia
              </label>
              <select
                id="experience"
                name="experience"
                onChange={(ev) => setExperience(ev.target.value)}
                value={experience}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Seleccione su nivel de experiencia</option>
                <option value="Principiante">Principiante</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
              </select>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Paso 3: Objetivo</h2>
            <div>
              <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-1">
                Rutina
              </label>
              <select
                id="goal"
                name="goal"
                onChange={(ev) => setGoal(ev.target.value)}
                value={goal}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Seleccione su objetivo</option>
                <option value="1">Hipertrofia</option>
                <option value="2">Recomposición</option>
                <option value="3">Definición</option>
                <option value="4">Pérdida de Peso</option>
              </select>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Paso 4: Dieta</h2>
            <div>
              <label htmlFor="diet" className="block text-sm font-medium text-gray-700 mb-1">
                Preferencia Dietética
              </label>
              <select
                id="diet"
                name="diet"
                onChange={(ev) => setDiet(ev.target.value)}
                value={diet}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Seleccione su preferencia dietética</option>
                <option value="1">Sin restricciones</option>
                <option value="2">Vegetariano</option>
                <option value="3">Celiaco</option>
              </select>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Paso 5: Confirmación</h2>
            <p>Por favor, revise su información antes de crear el plan:</p>
            <ul className="list-disc list-inside">
              <li>Edad: {age}</li>
              <li>Género: {gender}</li>
              <li>Experiencia: {experience}</li>
              <li>Objetivo: {goal === '1' ? 'Hipertrofia' : goal === '2' ? 'Recomposición' : goal === '3' ? 'Definición' : 'Pérdida de Peso'}</li>
              <li>Dieta: {diet === '1' ? 'Sin restricciones' : diet === '2' ? 'Vegetariano' : 'Celiaco'}</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

 
//Codigo para renderizar el componente
  return session ? (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
    <div className="p-8 relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Creador de Plan de Fitness
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-lg font-semibold text-orange-500">{precio}$</span>
          <button className={` ${ descuentoAplicado ? 'bg-blue-500 hover:bg-blue-600' : 'bg-orange-500 hover:bg-orange-600'} px-3 py-1 text-sm  text-white rounded-lg  transition.2s`} onClick={descuentoForm}>
            { descuentoAplicado ? `Descuento Aplicado` : `Cupón Descuento`}
          </button>
        </div>
      </div>

      {/* Progreso */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                s <= step ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              {s}
            </div>
          ))}
        </div>
        <div className="mt-2 h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-orange-500 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${(step - 1) * 25}%` }}
          ></div>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-red-500 text-center">{error}</p>}
        {renderStep()}
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Anterior
            </button>
          )}
          {step < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            >
              Siguiente
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-md shadow-lg shadow-orange-300 hover:bg-orange-600"
            >
              Crear Plan
            </button>
          )}
        </div>
      </form>
    </div>
  </div>
</div>


  ) : (
    <PrimeroRegistrate />
  );

}
export default CrearPlanPage;