import React, { Fragment } from "react";
import { Modal } from "react-bootstrap";
import { printStyle } from "./../../utils/print";
import convertDate from "./../../utils/convertDate";

export const Bill = ({ show, handleClose, bill, user }) => {
  const print = () => {
    const content = document.querySelector(".bill").innerHTML;

    const print = window.open("", "");
    print.document.write(
      `<html>
        <head>
        <link rel="stylesheet" href="E:/Projects/debitit/src/css/style.css" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" crossorigin="anonymous">
      <style>${printStyle}</style>
      </head>
      <body>${content}</body>
      </html>`
    );
    print.document.close();
    print.print();
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Invoice</Modal.Title>
      </Modal.Header>
      <div className="bill">
        <Modal.Body>
          <div className="row bill-header">
            <div className="col-6">
              <div className="name-side">
                <div className="brand-name">{user.name}</div>
                <div className="address">{user.address}</div>
                <div className="phone">
                  <strong>Phone: </strong>
                  {user.mobile}
                </div>
                <div className="bill-to">
                  <div className="bill-to-heading">Bill To:</div>
                  <div className="customer">
                    <div className="customer-name">
                      {bill.customer ? bill.customer.name : "Cash"}
                    </div>
                    <div className="customer-mobile">
                      {bill.customer ? bill.customer.mobile : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="invoice-side">
                <div className="head">Invoice</div>
                <div className="date">
                  <strong>Date:</strong> {convertDate(bill.date)}
                </div>
              </div>
            </div>
          </div>
          <div className="bill-area">
            <div className="table-responsive">
              <table className="table table-dark mt-4 table-borderless">
                <thead>
                  <tr>
                    <th scope="col" className="des">
                      Description
                    </th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {bill &&
                    bill.soldProducts &&
                    bill.soldProducts.map(product => (
                      <tr key={product.productId}>
                        <td className="des-content">{product.productName}</td>
                        <td>{product.quantity}</td>
                        <td>
                          {"\u20B9"} {product.price}
                        </td>
                        <td>
                          {"\u20B9"} {product.total}
                        </td>
                      </tr>
                    ))}
                  {bill && bill.soldProducts && (
                    <Fragment>
                      <tr>
                        <td className="des-content">
                          <strong>Other Expenses</strong>
                        </td>
                        <td>-</td>
                        <td>-</td>
                        <td className="extra-opt">
                          {"\u20B9"} {bill.otherExpenses}
                        </td>
                      </tr>
                      <tr>
                        <td className="des-content">
                          <strong>Total Amount</strong>
                        </td>
                        <td>-</td>
                        <td>-</td>
                        <td className="extra-opt">
                          {"\u20B9"} {bill.totalAmount}
                        </td>
                      </tr>
                    </Fragment>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
      </div>
      <Modal.Footer>
        <button className="button transparent-button" onClick={handleClose}>
          Close
        </button>
        <button className="button filled-button" onClick={print}>
          Print
        </button>
      </Modal.Footer>
    </Modal>
  );
};
