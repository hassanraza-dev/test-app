import React, { useState } from "react";
import { Items } from "../ItemsJson";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

const Table = () => {
  const countPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(Items);
  const [collection, setCollection] = useState(data.slice(0, countPerPage));

  const updatePage = (p) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(data.slice(from, to));
  };

  const filterHandler = (e, column) => {
    if (e.target.value !== "" && e.target.value !== "all") {
      const Tempdata = [...Items];
      const filterData = Tempdata.filter((val) => {
        return val[column].includes(e.target.value);
        // return val[column] == e.target.value;
      });
      setData(filterData);
      setCollection(filterData.slice(0, countPerPage));
    } else {
      setData(Items);
      setCollection(Items.slice(0, countPerPage));
    }
  };

  const removeCol = (colId) => {
    const Tempdata = [...data];
    const updateData = Tempdata.filter((val) => {
      return val.id !== colId;
    });
    console.log(updateData, "updateData");
    setData(updateData);
    setCollection(updateData.slice(0, countPerPage));
  };

  const searchHandler = (e) => {
    if (e.target.value !== "" && e.target.value !== "all") {
      const Tempdata = [...data];
      const filterData = Tempdata.filter((val) => {
        return (
          val.clientName.toLowerCase().includes(e.target.value.toLowerCase()) ||
          val.clientEmail.toLowerCase().includes(e.target.value.toLowerCase())
        );
      });
      setCollection(filterData.slice(0, countPerPage));
    } else {
      setData(Items);
      setCollection(Items.slice(0, countPerPage));
    }
  };

  const sortHandler = (order, colName) => {
    const Tempdata = [...Items];
    if (order === "asc") {
      const sortedData = Tempdata.sort((a, b) =>
        a[colName].localeCompare(b[colName])
      );
      setData(sortedData);
      setCollection(sortedData.slice(0, countPerPage));
    }
    if (order === "desc") {
      const sortedData = Tempdata.sort((a, b) =>
        b[colName].localeCompare(a[colName])
      );
      setData(sortedData);
      setCollection(sortedData.slice(0, countPerPage));
    }
  };

  return (
    <>
      <div className="search-bar">
        <input
          className="searchTerm"
          placeholder="Search here"
          onChange={(e) => searchHandler(e)}
        />
      </div>
      <div className="table-wrapper">
        <table border width={"100%"}>
          <tr>
            <th>
              <span>Client Name</span>
              <button
                className="remove-button"
                onClick={() => sortHandler("asc", "clientName")}
              >
                Sort A-Z
              </button>
              <button
                className="remove-button"
                onClick={() => sortHandler("desc", "clientName")}
              >
                Sort Z-A
              </button>
            </th>
            <th>
              <div className="filter-col">
                <span>Event Date</span>
                <input
                  type={"date"}
                  placeholder="Select range"
                  onChange={(e) => filterHandler(e, "eventDate")}
                />
              </div>
            </th>
            <th>
              <div className="filter-col">
                <span> Client Email</span>
                <input
                  placeholder="Search email"
                  onChange={(e) => filterHandler(e, "clientEmail")}
                />
              </div>
            </th>
            <th>
              <div className="filter-col">
                <span>Amount</span>
                <input
                  placeholder="Search amount"
                  onChange={(e) => filterHandler(e, "amount")}
                />
              </div>
              <button
                className="remove-button"
                onClick={() => sortHandler("asc", "amount")}
              >
                Sort max - min
              </button>
              <button
                className="remove-button"
                onClick={() => sortHandler("desc", "amount")}
              >
                Sort min - max
              </button>
            </th>
            <th>
              <div className="filter-col">
                <span>Status</span>
                <select
                  name="status"
                  id="status"
                  defaultValue={"all"}
                  onChange={(e) => filterHandler(e, "status")}
                >
                  <option value="confirmed">Confirmed</option>
                  <option value="canceled">Canceled</option>
                  <option value="postponed">Postponed</option>
                  <option value="all">All</option>
                </select>
              </div>
            </th>
            <th>
              <span>Actions</span>
            </th>
          </tr>
          {collection.map((val, key) => {
            return (
              <tr>
                <td>{val.clientName}</td>
                <td>{val.eventDate}</td>
                <td>{val.clientEmail}</td>
                <td>{val.amount}</td>
                <td>{val.status}</td>
                <td>
                  <button
                    className="remove-button"
                    onClick={() => removeCol(val.id)}
                  >
                    Hide
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
        {collection.length < 1 && <h1 className="no-record">No Record</h1>}
        <div className="pagination-wrapper">
          <Pagination
            pageSize={countPerPage}
            onChange={updatePage}
            current={currentPage}
            total={data.length}
          />
        </div>
      </div>
    </>
  );
};

export default Table;
