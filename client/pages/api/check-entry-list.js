import crawler from "crawler-request";
import { scheduledData } from "../../constants";

const riderMapper = (collectedEntryList) => {
  return collectedEntryList.reduce((riderObjects, currentRider) => {
    const [number, name, ...rest] = currentRider;
    const rider = {
      number,
      name,
    };
    if (!riderObjects) {
      return [rider];
    }
    riderObjects.push(rider);
    return riderObjects;
  }, []);
};

const collectEntryListData = (splicedEntryList) => {
  let currentRider = [];
  let entryList = [];

  splicedEntryList.map((riderString) => {
    if (currentRider.length === 4) {
      entryList.push(currentRider);
      currentRider = [];
    }
    if (currentRider.length === 0 && !parseInt(riderString)) {
      return;
    }

    currentRider.push(riderString);
  }, []);
  return entryList;
};

const spliceEntryList = (formattedResponse) => {
  const startingIndex = formattedResponse.indexOf("SPONSORS");
  const riderData = formattedResponse.splice(startingIndex + 1);
  return riderData;
};

export default async (req, res) => {
  try {
    const { week } = req.query;
    const currentWeek = scheduledData[week];

    await crawler(currentWeek.entryList).then((response) => {
      if (response && !response.error) {
        const formattedResponse = response.text.split("\n");

        const riders = riderMapper(
          collectEntryListData(spliceEntryList(formattedResponse))
        );
        return res.status(200).send({
          riders,
          success: true,
        });
      }
      return res.status(200).send({
        data: response.error,
        success: false,
      });
    });
  } catch (error) {
    console.log("ERR", { error });
    res.status(404).send("Entry list not yet available.");
  }
};
