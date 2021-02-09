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
  //   console.log({ riderData, startingIndex });
  return riderData;
};

export default async (req, res) => {
  try {
    const { week } = req.query;
    const currentWeek = scheduledData.rounds[week];
    console.log(currentWeek);
    const entryListRequest = await crawler(currentWeek.entryList).then(
      (response) => {
        //   console.log("SUH", response);
        if (response && !response.error) {
          const formattedResponse = response.text.split("\n");
          //   spliceEntryList(formattedResponse);
          const data = riderMapper(
            collectEntryListData(spliceEntryList(formattedResponse))
          );
          return {
            data,
            success: true,
          };
        }
        return {
          data: response.error,
          success: false,
        };
      }
    );
    if (!entryListRequest.success) {
      return res.status(200).send(entryListRequest);
    }
    return res.status(200).send(entryListRequest);
    // return res.status(200).send(entryListRequest.data);
  } catch (error) {
    console.log("ERR", { error });
    res.status(404).send("Entry list not yet available.");
  }
};
