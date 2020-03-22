import React from "react";

export const NotFound = () => {
  return (
    <div className="offset-lg-2 col-lg-10 offset-md-2 col-md-10 offset-sm-2 col-sm-10 not-found">
      <div className="not-found-text">Sorry, that page doesn’t exist!</div>
      <div className="not-found-subtext">
        {/* Why not try a search to find something else? */}
      </div>
    </div>
  );
};
