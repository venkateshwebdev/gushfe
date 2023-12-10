const { default: axiosAuth } = require("./axiosAuth");

export const getProcesses = async () => {
  const response = { error: undefined, data: undefined };
  const res = await axiosAuth.get("/process").catch((err) => {
    response.error = err.response.data.error;
  });
  response.data = res.data.data;
  return response;
};
export const getProcess = async (id) => {
  const response = { error: undefined, data: undefined };
  const res = await axiosAuth.get(`/process/${id}`).catch((err) => {
    response.error = err.response.data.error;
  });
  response.data = res.data.data;
  return response;
};
export const updateProcess = async (process) => {
  const response = { error: undefined, data: undefined };
  const res = await axiosAuth
    .put(`/process/${process.id}`, process)
    .catch((err) => {
      response.error = err.response.data.error;
    });
  response.data = res.data.data;
  return response;
};
export const deleteProcess = async (id) => {
  const response = { error: undefined, data: undefined };
  const res = await axiosAuth.delete(`/process/${id}`).catch((err) => {
    response.error = err.response.data.error;
  });
  response.data = res.data.data;
  return response;
};
export const createProcess = async (process) => {
  const response = { error: undefined, data: undefined };
  console.log("sending data is ", process);
  const res = await axiosAuth.post(`/process`, process).catch((err) => {
    response.error = err.response.data.error;
  });
  response.data = res.data.data;
  return response;
};
