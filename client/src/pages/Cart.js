import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { faTrash} from "@fortawesome/free-solid-svg-icons";
import { Link,useHistory,useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FiTruck  } from 'react-icons/fi';
import { Button } from "reactstrap";
import ModalOrder from "../components/ModalOrder";

function Cart() {
  const [modalShow, setModalShow] = React.useState(false);
  const params = useParams();
  const history = useHistory();
  const id = +params.id;
  const [carts, setCarts] = useState([]);
  // const [orders,setOrders] = useState([])
  const URL = "http://localhost:3000";

  useEffect(() => {
    getCartsById();
  }, []);

  const getCartsById = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      let carts = await axios({
        method: "GET",
        url: `${URL}/course_carts/auth`,
        headers: {
          access_token,
        },
      });
      setCarts(carts.data);
      console.log(carts.data);
      console.log(access_token);
    } catch (err) {
      Swal.fire("Oops", `${err}`, "error");
    }
  };
  const deleteCourseHandler = (id) => {
    try {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const access_token = localStorage.getItem('access_token')
                axios({
                    method: 'DELETE',
                    url: `${URL}/course_carts/delete/${id}`,
                    headers: {
                        access_token
                    }
                })
                Swal.fire(
                    'Delete Success!',
                    `Cart has been deleted.`,
                    'success'
                )
                history.go(0)
            }
        })
    } catch(err) {
        Swal.fire(
            'Opps!',
            `${err}`,
            'error'
        )
    }
}

  return (
    <div className="space-enter">
      <h1 className="text-center text-black">Your Cart</h1>
      
      <table className="table table-white space-enter text-center">
        <thead>
          <tr>
            <th className="table-white" scope="col">
              Product
            </th>
            <th className="table-white" scope="col">
              Price
            </th>
            <th className="table-white" scope="col">
              Quantity
            </th>
            <th className="table-white" scope="col">
              Total Price
            </th>
            <th className="table-white" scope="col">
              Status
            </th>
            <th className="table-white" scope="col">
              Action
            </th>
          </tr>
        </thead>


        <tbody>
          {carts.map((carts) => {
            var tempExp = carts?.created_on?.slice().split("T");
            var carts_date = tempExp;
            return (
              <tr>
                <td className="table-white">
                  <strong>{carts.Line_Items[0].Course.name}</strong>
                  <br></br>
                  <img
                    src={carts?.Line_Items[0].Course?.Course_Contents?.map(
                      (content) => {
                        return `http://localhost:3000/tmp/images/${content.filename}`;
                      }
                    )}
                    className="justify-content-center"
                    style={{
                      width: "250px",
                      height: "150px",
                      textAlign: "center",
                    }}
                    alt="..."
                  />
                </td>
                <td className="table-white">Rp.{carts.Line_Items[0].Course.price}</td>
                <td className="table-white">x{carts.Line_Items[0].qty}</td>
                <td className="table-white">
                  Rp.
                  {carts.Line_Items[0].Course.price * carts.Line_Items[0].qty}
                </td>
                <td className="table-white">{carts.status}</td>
                <td className="table-white">
                
                <Button color="primary" onClick={() => setModalShow(true)}>
                <i class="fas fa-money-bill">Checkout</i>
                </Button>
                <ModalOrder
                show={modalShow}
                carts={carts}
                onHide={() => setModalShow(false)}
                />

                <Button color="danger" className="mr-2" onClick={() => deleteCourseHandler(carts.id)} >
                  <FontAwesomeIcon icon={faTrash} /> Remove
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <center><Button color="dark" className="mr-2" text="white" href="/courses/orders/">
                  <FiTruck/> Your Order
                  </Button></center>
                  
    </div>
  );
}

export default Cart;
