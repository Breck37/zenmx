import axios from "axios";

export default (req, res) => {
  const { email } = req.query;
  return axios
    .get(`${process.env.API_URL}/get-user?email=${email}`)
    .then((response) => {
      res.status(200).json(response.data);
      return response.data;
    })
    .catch((error) => console.error("/get-user error", error));
};
