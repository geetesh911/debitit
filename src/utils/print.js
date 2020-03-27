export const printStyle = `
.body {

}
.table {
    width: 100%;
    margin-bottom: 1rem;
    color: #000;
    }
    
    .table th,
    .table td {
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
    }
    
    .table thead th {
    vertical-align: bottom;
    border-bottom: 2px solid #dee2e6;
    }
    
    .table tbody + tbody {
    border-top: 2px solid #dee2e6;
    }
    
    .table-sm th,
    .table-sm td {
    padding: 0.3rem;
    }
    
    .table-bordered {
    border: 1px solid #dee2e6;
    }
    
    .table-bordered th,
    .table-bordered td {
    border: 1px solid #dee2e6;
    }
    
    .table-bordered thead th,
    .table-bordered thead td {
    border-bottom-width: 2px;
    }
    
    .table-borderless th,
    .table-borderless td,
    .table-borderless thead th,
    .table-borderless tbody + tbody {
    border: 0;
    }
    
    .table-striped tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.1);
    }
    
    .table-hover tbody tr:hover {
    color: #000000;
    background-color: rgba(0, 0, 0, 0.075);
    }
    
    .table-primary,
    .table-primary > th,
    .table-primary > td {
    background-color: #b8daff;
    }
    
    .table-primary th,
    .table-primary td,
    .table-primary thead th,
    .table-primary tbody + tbody {
    border-color: #7abaff;
    }
    
    .table-hover .table-primary:hover {
    background-color: #9fcdff;
    }
    
    .table-hover .table-primary:hover > td,
    .table-hover .table-primary:hover > th {
    background-color: #9fcdff;
    }
    
    .table-secondary,
    .table-secondary > th,
    .table-secondary > td {
    background-color: #d6d8db;
    }
    
    .table-secondary th,
    .table-secondary td,
    .table-secondary thead th,
    .table-secondary tbody + tbody {
    border-color: #b3b7bb;
    }
    
    .table-hover .table-secondary:hover {
    background-color: #c8cbcf;
    }
    
    .table-hover .table-secondary:hover > td,
    .table-hover .table-secondary:hover > th {
    background-color: #c8cbcf;
    }
    
    .table-success,
    .table-success > th,
    .table-success > td {
    background-color: #c3e6cb;
    }
    
    .table-success th,
    .table-success td,
    .table-success thead th,
    .table-success tbody + tbody {
    border-color: #8fd19e;
    }
    
    .table-hover .table-success:hover {
    background-color: #b1dfbb;
    }
    
    .table-hover .table-success:hover > td,
    .table-hover .table-success:hover > th {
    background-color: #b1dfbb;
    }
    
    .table-info,
    .table-info > th,
    .table-info > td {
    background-color: #bee5eb;
    }
    
    .table-info th,
    .table-info td,
    .table-info thead th,
    .table-info tbody + tbody {
    border-color: #86cfda;
    }
    
    .table-hover .table-info:hover {
    background-color: #abdde5;
    }
    
    .table-hover .table-info:hover > td,
    .table-hover .table-info:hover > th {
    background-color: #abdde5;
    }
    
    .table-warning,
    .table-warning > th,
    .table-warning > td {
    background-color: #ffeeba;
    }
    
    .table-warning th,
    .table-warning td,
    .table-warning thead th,
    .table-warning tbody + tbody {
    border-color: #ffdf7e;
    }
    
    .table-hover .table-warning:hover {
    background-color: #ffe8a1;
    }
    
    .table-hover .table-warning:hover > td,
    .table-hover .table-warning:hover > th {
    background-color: #ffe8a1;
    }
    
    .table-danger,
    .table-danger > th,
    .table-danger > td {
    background-color: #f5c6cb;
    }
    
    .table-danger th,
    .table-danger td,
    .table-danger thead th,
    .table-danger tbody + tbody {
    border-color: #ed969e;
    }
    
    .table-hover .table-danger:hover {
    background-color: #f1b0b7;
    }
    
    .table-hover .table-danger:hover > td,
    .table-hover .table-danger:hover > th {
    background-color: #f1b0b7;
    }
    
    .table-light,
    .table-light > th,
    .table-light > td {
    background-color: #fdfdfe;
    }
    
    .table-light th,
    .table-light td,
    .table-light thead th,
    .table-light tbody + tbody {
    border-color: #fbfcfc;
    }
    
    .table-hover .table-light:hover {
    background-color: #ececf6;
    }
    
    .table-hover .table-light:hover > td,
    .table-hover .table-light:hover > th {
    background-color: #ececf6;
    }
    
    .table-dark,
    .table-dark > th,
    .table-dark > td {
    background-color: #c6c8ca;
    }
    
    .table-dark th,
    .table-dark td,
    .table-dark thead th,
    .table-dark tbody + tbody {
    border-color: #95999c;
    }
    
    .table-hover .table-dark:hover {
    background-color: #b9bbbe;
    }
    
    .table-hover .table-dark:hover > td,
    .table-hover .table-dark:hover > th {
    background-color: #b9bbbe;
    }
    
    .table-active,
    .table-active > th,
    .table-active > td {
    background-color: rgba(0, 0, 0, 0.075);
    }
    
    .table-hover .table-active:hover {
    background-color: rgba(0, 0, 0, 0.075);
    }
    
    .table-hover .table-active:hover > td,
    .table-hover .table-active:hover > th {
    background-color: rgba(0, 0, 0, 0.075);
    }
    
    .table .thead-dark th {
    color: #000000;
    background-color: #343a40;
    border-color: #454d55;
    }
    
    .table .thead-light th {
    color: #000000;
    background-color: #e9ecef;
    border-color: #dee2e6;
    }
    
    .table-dark {
    color: #000000;
    background-color: #343a40;
    }
    
    .table-dark th,
    .table-dark td,
    .table-dark thead th {
    border-color: #454d55;
    }
    
    .table-dark.table-bordered {
    border: 0;
    }
    
    .table-dark.table-striped tbody tr:nth-of-type(odd) {
    background-color: rgba(255, 255, 255, 0.05);
    }
    
    .table-dark.table-hover tbody tr:hover {
    color: #000000;
    background-color: rgba(255, 255, 255, 0.075);
    }
    
    @media (max-width: 575.98px) {
    .table-responsive-sm {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    }
    .table-responsive-sm > .table-bordered {
    border: 0;
    }
    }
    
    @media (max-width: 767.98px) {
    .table-responsive-md {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    }
    .table-responsive-md > .table-bordered {
    border: 0;
    }
    }
    
    @media (max-width: 991.98px) {
    .table-responsive-lg {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    }
    .table-responsive-lg > .table-bordered {
    border: 0;
    }
    }
    
    @media (max-width: 1199.98px) {
    .table-responsive-xl {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    }
    .table-responsive-xl > .table-bordered {
    border: 0;
    }
    }
    
    .table-responsive {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    }
    
    .table-responsive > .table-bordered {
    border: 0;
    }
    
    .table-responsive {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    }
    
    .table-responsive > .table-bordered {
    border: 0;
    }
    
    
    
    .modal-body {
        width: 100%;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ubuntu;
      }
      .modal-body .brand {
        font-size: 30px;
        text-transform: capitalize;
        text-align: center;
        font-weight: 700;
        margin-bottom: 25px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ubuntu;
      }
      
      .modal-body .bill-header {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ubuntu;
      }
      
      .modal-body .bill-header .brand-name {
        font-size: 25px;
        width: 100%;
        font-weight: 800;
        text-transform: capitalize;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ubuntu;
       "Helvetica Neue", sans-serif;
      }
      
      .modal-body .bill-header .name-side {
        width: 50vw;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ubuntu;
      }
      
      .modal-body .bill-header .name-side .address {
        text-transform: capitalize;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ubuntu;
        margin-top: 15px;
      }
      
      .modal-body .bill-header .name-side .phone {
        margin-top: 5px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ubuntu;
      }
      
      .modal-body .bill-header .name-side .bill-to {
        margin-top: 15px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ubuntu;
      }
      
      .modal-body .bill-header .name-side .bill-to .bill-to-heading {
        background-color: transparent;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ubuntu;
        padding: 7px 10px 7px 10px;
        margin-left: -10px;
        font-size: 20px;
        font-weight: 600;
      }
      
      .modal-body .bill-header .name-side .bill-to .customer {
        margin-top: 5px;
        text-transform: capitalize;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ubuntu;
      }
      
      .modal-body .bill-header .invoice-side {
        width: 48vw;
        text-align: right;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ubuntu;
      }
      
      .modal-body .bill-header .invoice-side .date {
        margin-top: 15px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ubuntu;
      }
      
      .modal-body .bill-header .invoice-side .head {
        text-align: right;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ubuntu;
        font-size: 25px;
        font-weight: 700;
        text-transform: uppercase;
      }
      
      .modal-body .bill-area {
        margin-top: 15px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ubuntu;
      }
      
      .modal-body .bill-area .table-dark td,
      .modal-body .bill-area .table-dark th,
      .modal-body .bill-area .table-dark thead th {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ubuntu;
        color: #000000;
        border-left: 1px solid #000;
      }
      .modal-body .bill-area .table-dark td {
        border-top: 1px solid #000;
        
      }
      
      .modal-body .bill-area table {
        border: 1px solid #000;
        border-left: 0;
        text-align: center;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ubuntu;
        text-transform: capitalize;
        background-color: transparent;
        
        border-spacing: 0;
        color: #000000 !important;
        
      }
      
      .modal-body .bill-area .des {
        width: 60%;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ubuntu;
      }
      
      .modal-body .bill-area .des-content {
        text-align: left;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ubuntu;
      }
      
      .modal-body .bill-area .extra-opt {
        border-top: 2px solid #000 !important;
        border-bottom: 2px solid #000 !important;
      }
    `;
