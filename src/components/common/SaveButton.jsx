import React from "react";

export const SaveButton = ({ label, loading }) => {
  return (
    <button type="submit" className="button filled-button submit-button">
      {loading ? (
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      ) : (
        label || "Save"
      )}
    </button>
  );
};
