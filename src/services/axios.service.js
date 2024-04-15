import API from "./axios.config";

export const IniciarSesion = (body) => {
  return API.post("/sesion/login?portalId=3", body, {
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

export const ObtenerItems = (tipo, id) => {
  return API.get(`/item/${tipo}?area=${id}`, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
};

export const ObtenerDimensiones = (id) => {
  return API.get(`/dimension/${id}`, {
    validateStatus: function (status) {
      return status < 500;
    },
  });
};
