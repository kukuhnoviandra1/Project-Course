import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Container, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Swal from 'sweetalert2';
import { Link,useHistory,useParams } from 'react-router-dom';
import {motion} from "framer-motion"

function TableAdmin() {
  const params = useParams();
  const URL = "http://localhost:3000";
  const history = useHistory();
  const id = +params.id;

  const [courses, setCourses] = useState([]);
  useEffect(() => {
    getCourses();
  }, []);
  const getCourses = async () => {
    try {
      let result = await axios({
        method: "GET",
        url: `${URL}/courses/`,
      });
      setCourses(result.data);
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
                    url: `${URL}/courses/delete/${id}`,
                    headers: {
                        access_token
                    }
                })
                Swal.fire(
                    'Delete Success!',
                    `Course has been deleted.`,
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
        return { width: "4%" };
      },
    },
    {
      dataField: "name",
      text: " Name",
      sort: true,
      headerStyle: () => {
        return { width: "12%" };
      },
    },
    {
      dataField: "price",
      text: " Price",
      sort: true,
      headerStyle: () => {
        return { width: "8%" };
      },
    },
    {
      dataField: "duration",
      text: " Duration",
      headerStyle: () => {
        return { width: "7%" };
      },
    },
    {
      dataField: "level",
      text: "Level",
      sort: true,
      headerStyle: () => {
        return { width: "10%" };
      },
    },
    {
      dataField: "author",
      text: "Author",
      sort: true,
      headerStyle: () => {
        return { width: "13%" };
      },
    },
    {
      dataField: "rating",
      text: "Rating",
      sort: true,
      headerStyle: () => {
        return { width: "8%" };
      },
    },
    {
      dataField: "student",
      text: "Student",
      sort: true,
      headerStyle: () => {
        return { width: "8%" };
      },
    },
    {
      dataField: "id",
      text: "Action",
      formatter: (dataField,row) => {
        return (
          <div>
            
            <Link to={`/courses/details/${row.id}`}>
            <Button color="info" className="mr-2">
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 1.0 }}>
              <FontAwesomeIcon icon={faInfo} /> Detail
              </motion.div>
            </Button>
            </Link>
            
            <Link to={`/courses/edit/${row.id}`}>
            <Button color="dark" >
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 1.0 }}>
              <FontAwesomeIcon icon={faEdit} /> Edit
              </motion.div>
            </Button>
            </Link>

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
  data={courses}
  columns={columns}
  selectRow={{ mode: "checkbox" }}
  defaultSorted={defaultSorted}
  tabIndexCell
  search
>
  {
    props => (
      <div>
        <h3>Search Courses:</h3>
        <SearchBar { ...props.searchProps } />
        <hr />
        <BootstrapTable
          { ...props.baseProps }
        />
      </div>
    )
  }
</ToolkitProvider>
<Link to="/courses/add" type="button" class="btn btn-secondary">Add New Course</Link>
</Container>
    
  );
}


export default TableAdmin;
