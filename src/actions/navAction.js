import {
  ACCOUNTS_ACTIVE,
  SALES_ACTIVE,
  PURCHASE_ACTIVE,
  OTHERS_ACTIVE
} from "./types";

export const AccountsActive = () => {
  return {
    type: ACCOUNTS_ACTIVE
  };
};

export const SalesActive = () => {
  return {
    type: SALES_ACTIVE
  };
};

export const PurchaseActive = () => {
  return {
    type: PURCHASE_ACTIVE
  };
};

export const othersActive = () => {
  return {
    type: OTHERS_ACTIVE
  };
};
