import React, { Fragment } from "react";
import convertDate from "./../../utils/convertDate";

export const CashBook = ({ cash }) => {
  let drCash = 0;
  let crCash = 0;
  cash.forEach(c => {
    if (c.type === "dr") drCash += c.amount;
    if (c.type === "cr") crCash += c.amount;
  });

  const netCash = drCash - crCash;

  return (
    <div className="cash-book material-css">
      <div className="caption">
        Cash A/c{" "}
        <span className="net">
          Net Cash:{" "}
          <span className="badge badge-dark">{`\u20B9${netCash}`}</span>
        </span>
      </div>
      <div className="ledger">
        <div className="dr">
          <div className="table-responsive">
            <div className="table-content">
              <table className="table table-dark table-borderless responsive-table">
                <thead className="t-head">
                  <tr className="t-header">
                    <th scope="col" className="t-date">
                      Date
                    </th>
                    <th scope="col" className="t-par">
                      Particulars
                    </th>
                    <th scope="col" className="t-amt">
                      Dr.({"\u20B9"})
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cash.length > 0 &&
                    cash.map(c => (
                      <Fragment key={`${c._id}${Math.random()}`}>
                        {c.type === "dr" && (
                          <tr>
                            <td className="t-date">{convertDate(c.date)}</td>
                            <td className="t-par">
                              {c.source} <span>A/c</span>
                            </td>
                            <td className="t-amt">{c.amount}</td>
                          </tr>
                        )}
                      </Fragment>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="cr">
          <div className="table-responsive">
            <table className="table table-dark table-borderless"></table>
            <div className="table-content">
              <table className="table table-dark table-borderless responsive-table">
                <thead>
                  <tr className="t-header">
                    <th scope="col" className="t-date">
                      Date
                    </th>
                    <th scope="col" className="t-par">
                      Particulars
                    </th>
                    <th scope="col" className="t-amt">
                      Cr.({"\u20B9"})
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cash.length > 0 &&
                    cash.map(c => (
                      <Fragment key={`${c._id}${Math.random()}`}>
                        {c.type === "cr" && (
                          <tr>
                            <td className="t-date">{convertDate(c.date)}</td>
                            <td className="t-par">{c.source} A/c</td>
                            <td className="t-amt">{c.amount}</td>
                          </tr>
                        )}
                      </Fragment>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
