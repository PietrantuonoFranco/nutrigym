const getArgyToken = async (username, password) => {
    console.log({ Username: username, Password: password });
  
    try {
      // Obtener el token
      const tokenResponse = await fetch("http://localhost:8000/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
  
      // Verificar si la respuesta es exitosa
      if (!tokenResponse.ok) {
        throw new Error("Failed to fetch token: " + tokenResponse.statusText);
      }
  
      const tokenData = await tokenResponse.json();
  
      // Verificar si el token existe
      if (!tokenData.access) {
        throw new Error("No JWT token found in the response");
      }
  
      // Guardar tokens en localStorage
      localStorage.setItem("argyToken", JSON.stringify(tokenData.access));
      localStorage.setItem("argyRefreshToken", JSON.stringify(tokenData.refresh));
  
      // Devolver el token de acceso
      return tokenData.access;
    } catch (error) {
      console.error("Error fetching token:", error);
      throw new Error("Error fetching token: " + error.message); // Propagar el error
    }
  };
  
  export default getArgyToken;