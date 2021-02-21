import axios from "axios";

export default (req, res) => {
  const { email, bigBikePicks, week, totalPoints } = req.body;
  const userPick = JSON.stringify({
    week,
    year: new Date().getFullYear(),
    user: email,
    bigBikePicks,
    totalPoints,
  });
  console.log(userPick);
  //   return axios
  //     .post(`${process.env.API_URL}/save-picks`, params, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((response) => {
  //       res.status(200).json(response.data);
  //       return response.data;
  //     })
  //     .catch((error) => console.error("/get-user error", error));
};
