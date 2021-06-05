// const API = "https://randomuser.me/api/";
const API = process.env.API; // proteger datos sensibles (devops puede preparar mejor las variables).

const getData = async (id) => {
  let randomNum = Math.floor(Math.random() * 10 + 1);
  const apiURl = id ? `${API}${id}` : `${API}random?count=${randomNum}`;
  try {
    const response = await fetch(apiURl);
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.log("Fetch Error", error);
  }
};

export default getData;
