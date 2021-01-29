import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "../../components";
import ResultsStyled from "./styles";

const Results = () => {
  const [raceResults, setResults] = useState([]);

  useEffect(() => {
    if (!raceResults || !raceResults.length) {
      axios
        .get("http://localhost:3700/get-live-results")
        .then(({ data }) => {
          console.log({ data, Table });
          setResults(data.raceResults);
        })
        .catch((e) => console.log("E on Results", e));
      return;
    }
  }, [raceResults]);

  return (
    <ResultsStyled>
      Results
      <main>
        {raceResults && raceResults.length ? (
          <Table raceResults={raceResults} />
        ) : null}
      </main>
    </ResultsStyled>
  );
};

export default Results;
