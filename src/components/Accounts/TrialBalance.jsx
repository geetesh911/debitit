import React, { Fragment } from "react";

export const TrialBalance = ({ data }) => {
  return (
    <div className="trial-balance material-css">
      <div className="ledger">
        <div className="tb">
          <div className="table-responsive">
            <div className="table-content">
              <table className="table table-dark table-borderless responsive-table">
                <thead className="t-head">
                  <tr className="t-header">
                    <th scope="col" className="tb-sno">
                      Sno.
                    </th>
                    <th scope="col" className="tb-par">
                      Particulars
                    </th>
                    <th scope="col" className="tb-dr">
                      Debit ({"\u20B9"})
                    </th>
                    <th scope="col" className="tb-cr">
                      Credit ({"\u20B9"})
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 &&
                    data.map((c, i) => (
                      <Fragment key={`${c.name}${Math.random()}`}>
                        {
                          <tr>
                            <td className="tb-sno">{i + 1}</td>
                            <td className="tb-par">
                              {c.name} <span>A/c</span>
                            </td>
                            <td className="tb-dr">
                              {c.type === "dr" && c.amount}
                            </td>
                            <td className="tb-cr">
                              {c.type === "cr" && c.amount}
                            </td>
                          </tr>
                        }
                      </Fragment>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* <div className="cr">
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
        </div> */}
      </div>
    </div>
  );
};
