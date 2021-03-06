import axios from 'axios';

export default (req, res) => {
  const { email, week, type } = req.query;
  if (!email) {
    res.status(200).send({ success: false, error: 'No email provided' });
  }

  let queryString = `?email=${email}`;
  if (week) {
    queryString += `&week=${week}`;
  }
  if (type) {
    queryString += `&type=${type}`;
  }

  return axios
    .get(`${process.env.API_URL}/get-user${queryString}`)
    .then((response) => {
      res.status(200).json(response.data);
      return response.data;
    })
    .catch((error) => console.error('/get-user error', error));
};
