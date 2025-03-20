import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { X } from "lucide-react"

const Modal = ({ isOpen, closeModal, setTurno, kinesiologo}) => {
  const { data: session} = useSession();

  const [paciente, setPaciente] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [horario, setHorario] = useState("17:30");
  const [fecha, setFecha] = useState("");
  const [today, setToday] = useState(null);
  const [dateMax, setDateMax] = useState(null);
  const [times, setTimes] = useState([]);
  const [morningTimes, setMorningTimes] = useState([]);
  const [afternoonTimes, setAfternoonTimes] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [tipoConsulta, setTipoConsulta] = useState("");
  const [turnoInProgress, setTurnoInProgress] = useState(false);
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const hoy = dateToString(new Date());
    const max = dateToString(addDays(new Date(), 30));

    const morningHours = generateTimeSlots(8, 12);
    const afternoonHours = generateTimeSlots(15, 20);

    const timeSlots = [...morningHours, ...afternoonHours];
    
    setFecha(hoy);
    setToday(hoy);
    setDateMax(max);
    setMorningTimes(morningHours);
    setAfternoonTimes(afternoonHours);
    setTimes(timeSlots);
  }, []);
  
  useEffect(() => {
    setDoctor(kinesiologo.nombre);
  }, [kinesiologo]);

  useEffect(() => {
    session?.user? setPaciente(`${session.user.apellido} ${session.user.nombre}`) : setPaciente(null);
  }, [session]);

  function generateTimeSlots(startHour, endHour) {
    const times = [];
    let currentTime = new Date();
    currentTime.setHours(startHour, 0, 0, 0); // Establece la hora inicial
    
    while (currentTime.getHours() < endHour || (currentTime.getHours() === endHour && currentTime.getMinutes() === 0)) {
      const timeString = currentTime.toTimeString().slice(0, 5); // Formato "HH:MM"
      times.push(timeString);
      currentTime.setMinutes(currentTime.getMinutes() + 30); // Aumenta 30 minutos
    }

    return times;
  }

  function addDays(date, days) {
    const result = new Date(date); // Clonamos para evitar modificar el original
    result.setDate(result.getDate() + days);
    return result; // Devuelve un objeto Date
  }

  function dateToString(date) {
    return date.toISOString().split("T")[0];
  }

  if (!isOpen) return null;

  const handleClick = (time) => {
    setHorario(time);
  }

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();
    setTurnoInProgress(true);
    setError(null);
    
    try {
      const response = await fetch("http://localhost:5000/agendar-consulta", {
        method: 'POST',
        body: JSON.stringify({ fecha, horario, doctor, tipoConsulta, descripcion, paciente }),
        headers: { 'Content-Type': 'application/json' }
      })
    
      console.log (response);
      
      if (response.ok) {
        const data = await response.json();

        console.log(data);
        setTurno(data);

        closeModal();
      } else {
        setError("Error al crear el turno.");
      }
    } catch (error) {
      setError("Error al solicitar el turno.");
      console.error(error);
    } finally {
      setTurnoInProgress(false); // Restablecer el estado de carga
    }
    
  };

  return (
    <div className="z-50 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md w-full max-w-3xl mx-4">
        <div className="w-full p-4 flex justify-end">
          <button
            type="button"
            onClick={closeModal}
          >
            <X size={24} strokeWidth={4} className="text-red-500 hover:text-red-600 hover:drop-shadow-md"/>
          </button>
        </div>

        <div className="px-10 pb-8">
          <h1 className="text-2xl font-bold text-center mb-2">Seleccioná un turno</h1>
          <p className="text-center text-gray-600 mb-4">Elegí un día y un horario</p>

          {/* Mostrar mensaje de error si existe */}
          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col space-y-2">
                <div className='flex flex-col space-y-2'>
                  <label htmlFor="fecha">Selecciona una fecha:</label>
                  <input
                    type="date"
                    id="fecha"
                    name="fecha"
                    min={today}
                    max={dateMax}
                    value={fecha}
                    required
                    onChange={(e) => setFecha(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900"
                  />
                </div>

                <div className='flex flex-col'>
                  <label htmlFor="horario">Selecciona un horario:</label>
                  {times && (
                    <div className="pl-4 space-y-2">
                      {morningTimes && (
                        <div>
                          <label htmlFor="morningHours" className="text-gray-700">Turno mañana:</label>
                          <div id="morningHours" className="pl-4 gap-4">
                            {morningTimes.map(time => (
                              <button
                                type="button"
                                onClick={() => handleClick(time)}
                                key={time}
                                className={`text-[10px] m-[3px] rounded-[12px] py-[4px] px-[6px] border-2 border-[#a2a2a275] bg-white text-center hover:bg-[#f2f2f2] hover:border-[#929292] ${horario === time ? "bg-[#d2d2d2] border-3 border-[#929292]" : ""}`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      {afternoonTimes && (
                        <div>
                          <label htmlFor="afternoonHours" className="text-gray-700">Turno tarde:</label>
                          <div id="morningHours"className="pl-4 gap-2">
                            {afternoonTimes.map(time => (
                              <button
                                type="button"
                                onClick={() => handleClick(time)}
                                key={time}
                                className={`text-[10px] m-[3px] rounded-[12px] py-[4px] px-[6px] border-2 border-[#a2a2a275] bg-white text-center hover:bg-[#f2f2f2] hover:border-[#929292] ${horario === time ? "bg-[#d2d2d2] border-3 border-[#929292]" : ""}`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <div className='flex flex-col space-y-2'>
                  <label htmlFor="tipoConsulta">Tipo de consulta:</label>
                  <input
                    type="text"
                    id="tipoConsulta"
                    name="tipoConsulta"
                    placeholder="Lesion"
                    value={tipoConsulta}
                    required
                    onChange={(e) => setTipoConsulta(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900"
                  />
                </div>

                <div className='flex flex-col'>
                  <label htmlFor="textarea">
                    Descripción:
                  </label>
                  <textarea
                    id="textarea"
                    value={descripcion}
                    onChange={(ev) => setDescripcion(ev.target.value)}
                    placeholder="Escribe aquí..."
                    required
                    className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900"
                  />
                  <p className="text-sm text-gray-500">
                    Caracteres: {descripcion.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-[100%] py-2">
              <div className="w-[85%] justify-center h-[2px] bg-[#D2D2D255] mx-auto"></div>
            </div>

            <div className="w-[100%] py-2 flex justify-center">
              <button
                type="submit"
                disabled={turnoInProgress}
                className="w-[60%] bg-black text-white py-2 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {turnoInProgress ? 'Solicitando...' : 'Solicitar turno'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;