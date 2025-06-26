// Simulamos una base de datos de usuarios
const users = [
    {
      id: 1,
      email: "admin@test.com",
      password: "admin123", // En producción usar bcrypt!
      role: "admin",
      name: "Administrador Principal"
    },
    {
      id: 2,
      email: "cliente@test.com",
      password: "cliente123",
      role: "client",
      name: "Juan Pérez"
    },
    {
      id: 3,
      email: "tecnico@test.com",
      password: "tecnico123",
      role: "technician",
      name: "Carlos Gómez"
    }
  ];
  
  // Función para buscar usuario por credenciales
  export const findUserByCredentials = (email, password) => {
    return users.find(user => 
      user.email === email && user.password === password
    );
  };
  
  // Función para buscar usuario por ID (para verificación)
  export const findUserById = (id) => {
    return users.find(user => user.id === id);
  };