import React from "react";

export const VerticalTable = ({ data }) => {
  return (
    <div className="table-responsive">
      <table className="table table-dark table-borderless dr-vertical-table">
        <tbody>
          {data.map(d => (
            <tr key={d.heading}>
              <th>{d.heading}</th>
              {d.data.map(tableData => (
                <td key={`${tableData}${Math.random()}`}>{tableData}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
