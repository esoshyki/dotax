export interface Hero {
  name: string;
  icon: string;
};

interface HistoryData {
  id: string;
  team1pick: Hero[];
  team2pick: Hero[];
  league: string;
  winner: "dire" | "radiant";
};

interface CustomError {
  error: string
}

type HistoryResponseData = HistoryData[];

const getHistoryData = async () : Promise<Array<HistoryData> | CustomError> => {
  try {
    const response = await fetch("/tvoeapit");

    const data: HistoryResponseData = await response.json();

    if (!data) {
      return ({
        error: "No Data"
      })
    }

    return data.map((el) : HistoryData => ({
      id: el.id,
      team1pick: el.team1pick,
      team2pick: el.team2pick,
      league: el.league,
      winner: el.winner
    }))
  } catch (err: any) {
    return {
      error: err.message
    }
  }
};

const service = {
  getHistoryData
};

export default service;