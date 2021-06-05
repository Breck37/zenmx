import axios from 'axios';

export default async (req, res) => {
  const { week } = req.query;
  const { raceResults } = req.body;

  const calculatedPoints = await axios
    .post(`${process.env.API_URL}/calculate-points?week=${week}`, {
      raceResults,
    })
    .then((res) => res.data)
    .catch((e) => ({
      success: false,
      errorMessage: 'Error calculating points',
      error: e,
    }));

  res.status(200).send(calculatedPoints);
};
