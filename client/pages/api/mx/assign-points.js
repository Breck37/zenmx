import axios from 'axios';

export default async (req, res) => {
  const { week, type, year } = req.query;
  const { raceResults } = req.body;

  const calculatedPoints = await axios
    .post(`${process.env.API_URL}/calculate-points?week=${week}&type=${type}&year=${year}`, {
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
