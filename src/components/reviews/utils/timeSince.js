function TimeSince(date) {
    const now = new Date();
    const past = new Date(date);
    const seconds = Math.floor((now - past) / 1000);
  
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return "Hace " + interval + " año" + (interval !== 1 ? "s" : "");
  
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return "Hace " +  interval + " mes" + (interval !== 1 ? "es" : "");
  
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return "Hace " + interval + " día" + (interval !== 1 ? "s" : "");
  
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return "Hace " + interval + " hora" + (interval !== 1 ? "s" : "");
  
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return "Hace " + interval + " minuto" + (interval !== 1 ? "s" : "");
  
    return "Justo ahora";
  }

  export default TimeSince
  