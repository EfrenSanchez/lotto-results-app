import React, { Fragment, useState, useEffect } from "react";
import { getLastDrawing } from "../utils/api";
import { tableShcema, tableHeaderTranslations } from "./eurojackpot.config";
import { getFridaysInMonth, dateParser } from "../utils/dates";
import { romanize } from "../utils/numberHandler";

import { Dropdown } from "./Dropdown";
import { DataTable } from "./DataTable";

import './App.css';

const useDataApi = (initialUrlParam, initialData) => {
  const [data, setData] = useState(initialData);
  const [urlParam, setUrlParam] = useState(initialUrlParam);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await getLastDrawing(urlParam);
        setData(result);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [urlParam]);

  return [{ data, isLoading, isError }, setUrlParam];
};

export default function App() {
  const [{ data, isLoading, isError }, doFetch] = useDataApi("euroJackpot", {
    odds: {},
  });

  const propertyFriday = getFridaysInMonth(
    new Date().getMonth(),
    new Date().getFullYear()
  )
    .filter((friday) => new Date(friday) <= new Date())
    .map((friday) => new Date(friday).toDateString());

  const [fridays, setFridays] = useState(propertyFriday);
  const [dataTable, setDataTable] = useState(data.odds);

  useEffect(() => {
    setDataTable(
      Object.values(data.odds)
        .slice(1)
        .map((rank, index) => ({
          tier: romanize(index + 1),
          spiele:
            tableShcema.find((item) => item.tier === index + 1)?.spiele || 0,
          gewinner: `${rank.winners}x`,
          quoten: rank.prize.toLocaleString("de-DE", {
            style: "currency",
            currency: data.currency,
          }),
        }))
    );
  }, [data]);

  const handlerSubmit = (target) => {
    const dateTarget = new Date(target);

    const query = dateParser({
      year: dateTarget.getFullYear(),
      month: dateTarget.getMonth() + 1,
      day: dateTarget.getDate(),
    });

    doFetch(`euroJackpot/${query}`);
  };

  return (
    <main className="main-container">
      <div className='nav'>
        <Dropdown
          loading={isLoading ? true : null}
          options={fridays}
          onChange={handlerSubmit}
        />
      </div>
      
      <div className='hero'>
        {isError && <div>Something went wrong ...</div>}
        {isLoading ? (
            <gh-spinner />
          ) : (
            <DataTable
              conf={tableHeaderTranslations}
              data={dataTable}
              widthToCollapse="768"
            />
        )}
      </div>

    </main>
  );
}
