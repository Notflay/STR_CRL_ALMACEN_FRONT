import API from "./axios.config";

export const IniciarSesion = (body) => {
  return API.post("/sesion/login", body, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
};

export const ObtenerEstados = () => {
  return API.get("/estado", {
    validateStatus: function (status) {
      return status < 500;
    },
  });
};
