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

function TableAdminOrder() {
  const params = useParams();
  const URL = "http://localhost:3000";
  const history = useHistory();
  const id = +params.id;

  const [order, setOrder] = useState([]);
  useEffect(() => {
    getorder();
  }, []);
  const getorder = async () => {
    try {
      let result = await axios({
        method: "GET",
        url: `${URL}/orders/`,
      });
      setOrder(result.data);
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
                    url: `${URL}/orders/delete/${id}`,
                    headers: {
                        access_token
                    }
                })
                Swal.fire(
                    'Delete Success!',
                    `Order has been deleted.`,
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
      dataField: "name",
      text: " Name",
      headerStyle: () => {
        return { width: "12%" };
      },
    },
    {
      dataField: "subtotal",
      text: "Subtotal",
      headerStyle: () => {
        return { width: "8%" };
      },
    },
    {
      dataField: "discount",
      text: "Discount",
      headerStyle: () => {
        return { width: "7%" };
      },
    },
    {
      dataField: "tax",
      text: "Tax",
      headerStyle: () => {
        return { width: "7%" };
      },
    },
    {
      dataField: "total_due",
      text: "Total Due",
      sort: true,
      headerStyle: () => {
        return { width: "9%" };
      },
    },
    {
      dataField: "total_qty",
      text: "Total Item",
      headerStyle: () => {
        return { width: "5.5%" };
      },
    },
    {
      dataField: "pay_trx_number",
      text: "TRX Number",
      headerStyle: () => {
        return { width: "9.5%" };
      },
    },
    {
        dataField: "city",
        text: "City",
        sort: true,
        headerStyle: () => {
          return { width: "10%" };
        },
      },
      {
        dataField: "address",
        text: "Address",
        headerStyle: () => {
          return { width: "20%" };
        },
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
        headerStyle: () => {
          return { width: "10%" };
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
      order: "asc",
    },
  ];
  
  return (
    <Container>
    <ToolkitProvider
  bootstrap4
  keyField="id"
  data={order}
  columns={columns}
  selectRow={{ mode: "checkbox" }}
  defaultSorted={defaultSorted}
  tabIndexCell
  search
>
  {
    props => (
      <div>
        <h3>Search Order:</h3>
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


export default TableAdminOrder;
