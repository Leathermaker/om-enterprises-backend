import axios from "axios";

const backendUrl = "https://om-enterprises-backend.onrender.com";

export function rerunMachine() {
  axios
    .get(`${backendUrl}/api/v1`)
    .then((res) => console.log('Backend Reloaded'))
    .catch((err) => console.log(err));
}


