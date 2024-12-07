

interface BusinessInfo {
    name: string;
    location: {
      address: string;
      city: string;
      state: string;
      zipCode: string;
      coordinates?: {
        lat: number; // opcional, si tienes datos de geolocalización
        lng: number;
      };
    };
    contact: {
      phone: string;
      email: string;
      socialMedia?: {
        facebook?: string;
        instagram?: string;
      };
    };
    openingHours: {
      day: string;
      open: string; // formato HH:mm
      close: string; // formato HH:mm
    }[];
  }
  
  const businessInfo: BusinessInfo = {
    name: "Peludópolis",
    location: {
      address: "Av. Principal 123",
      city: "Ciudad Ejemplo",
      state: "Estado Ejemplo",
      zipCode: "12345",
      coordinates: {
        lat: -34.603684,
        lng: -58.381559,
      },
    },
    contact: {
      phone: "+1 (555) 123-4567",
      email: "contacto@polidopolis.com",
      socialMedia: {
        facebook: "@peludopolis",
        instagram: "@peludopolis",
      },
    },
    openingHours: [
      { day: "Lunes", open: "09:00", close: "18:00" },
      { day: "Martes", open: "09:00", close: "18:00" },
      { day: "Miércoles", open: "09:00", close: "18:00" },
      { day: "Jueves", open: "09:00", close: "18:00" },
      { day: "Viernes", open: "09:00", close: "18:00" },
      { day: "Sábado", open: "10:00", close: "14:00" },
      { day: "Domingo", open: "Cerrado", close: "Cerrado" },
    ],
  };
  
  export default businessInfo;