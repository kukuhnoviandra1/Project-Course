import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

function ModalOrder(props) {
  const [orders, setOrders] = useState({
    city: "",
    address: "",
  });

  const URL = "http://localhost:3000";
  const history = useHistory();

  const submitHandler = (e, id) => {
    e.preventDefault();
    checkout(id);
  };

  const checkout = async (id) => {
    try {
      const access_token = localStorage.getItem("access_token");
      await axios({
        method: "POST",
        url: `${URL}/orders/add/${id}`,
        headers: {
          access_token,
        },
        data: orders,
      });
      Swal.fire(`Checkout Succes`, "Barang Anda Telah di Order", "success");
      history.push("/courses/orders/");
    } catch (err) {
      Swal.fire("Ooops", `${err}`, "error");
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Orders Form Detail
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <strong>
          <center>
            <h3>Checkout Now!</h3>
          </center>
        </strong>
        <form className="row g-3 space-enter">
          <div className="row mb-3">
            <label className="text-black col-sm-2 col-form-label">
              Adress:{" "}
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="email"
                onChange={(e) =>
                  setOrders({ ...orders, address: e.target.value })
                }
                placeholder="Adress"
              />
            </div>
          </div>
          <div className="row mb-3">
            <label className="text-black col-sm-2 col-form-label">City: </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="text"
                onChange={(e) => setOrders({ ...orders, city: e.target.value })}
                placeholder="City"
              />
            </div>
          </div>
          <p>Course : {props.carts.Line_Items[0].Course.name}</p>
          <p>Quantity : {props.carts.Line_Items[0].qty}</p>
          <p>
            Subtotal :{" "}
            {props.carts.Line_Items[0].Course.price *
              props.carts.Line_Items[0].qty}
          </p>
          {/* <p>Discount : -{props.carts.Line_Items[0].qty>2 && (<>{props.carts.Line_Items[0].Course.price*props.carts.Line_Items[0].qty*0.1}</>)}</p> */}
          {/* <p>Tax :</p> */}
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => submitHandler(e, props.carts.Line_Items[0].id)}
          >
            Checkout
          </button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalOrder;
