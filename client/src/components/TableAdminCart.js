import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Container, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Swal from 'sweetalert2';
import { useHistory,useParams } from 'react-router-dom';
import {motion} from "framer-motion"

function TableAdminCarts() {
  const params = useParams();
  const URL = "http://localhost:3000";
  const history = useHistory();
  const id = +params.id;

  const [cart, setCart] = useState([]);
  useEffect(() => {
    getCart();
  }, []);
  const getCart = async () => {
    try {
      let result = await axios({
        method: "GET",
        url: `${URL}/course_carts/`,
      });
      setCart(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCourseHandler = (e,id) => {
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
                    `cart has been deleted.`,
                    'success'
                )
                history.push('/');
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

const { SearchBar } = Search;

  const columns = [
    {
      dataField: "id",
      text: " ID",
      sort: true,
      headerStyle: () => {
        return { width: "4.5%" };
      },
    },
    {
      dataField: "created_on",
      text: "Date",
      headerStyle: () => {
        return { width: "12%" };
      },
    },
    {
      dataField: "status",
      text: "Status",
      headerStyle: () => {
        return { width: "8%" };
      },
    },
    {
      dataField: "UserId",
      text: "User ID",
      headerStyle: () => {
        return { width: "7%" };
      },
    },
    {
      dataField: "id",
      text: "Action",
      headerStyle: () => {
        return { width: "10%" };
      },
      formatter: (dataField,row) => {
        return (
          <div>
            <Button color="danger" className="mr-2" onClick={() => deleteCourseHandler(id,dataField)} >
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 1.0 }}>
              <FontAwesomeIcon icon={faTrash} /> Delete
              </motion.div>
            </Button>
            
          </div>
        );
      },
    },
  ];
  const defaultSorted = [
    {
      dataField: "id",
      cart: "asc",
    },
  ];
  
  return (
    <Container>
    <ToolkitProvider
  bootstrap4
  keyField="id"
  data={cart}
  columns={columns}
  selectRow={{ mode: "checkbox" }}
  defaultSorted={defaultSorted}
  tabIndexCell
  search
>
  {
    props => (
      <div>
        <h3>Search Cart:</h3>
        <SearchBar { ...props.searchProps } />
        <hr />
        <BootstrapTable
          { ...props.baseProps }
        />
      </div>
    )
  }
</ToolkitProvider>
</Container>
    
  );
}


export default TableAdminCarts;
