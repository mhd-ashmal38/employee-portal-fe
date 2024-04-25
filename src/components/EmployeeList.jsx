import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { deleteEmployee, getEmployees } from '../service/allApi'
import { Link } from 'react-router-dom'

function EmployeeList() {

    const [allEmployees, setAllEmployees] = useState([])

    useEffect(() => {
        getallEmployees()
    }, [])

    // define function for api call
    const getallEmployees = async () => {
        // api call
        const response = await getEmployees()
        // console.log(response);
        setAllEmployees(response.data)
    }
    // console.log(allEmployees);

    // delete employee
    const handleDelete = async (id) => {
        try {
            await deleteEmployee(id);
            // After successful deletion, fetch the updated list of employees
            await getallEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <>

            <div className='m-5'>
                <Row className='pb-5'>
                    <Col>
                        <Link to={'/create'}><Button variant="primary">Add New Employee</Button></Link>
                    </Col>

                </Row>

                {
                    allEmployees.length === 0 ? (
                        <p>No employees found.</p>
                    ) : (
                        <Table bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Gender</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allEmployees.map(employee => (

                                        <tr>
                                            <td className='pt-3'>{employee.id}</td>
                                            <td>
                                                <div className='d-flex align-items-center'>
                                                    <img
                                                        src={employee.profile}
                                                        alt=''
                                                        style={{ width: '45px', height: '45px' }}
                                                        className='rounded-circle'
                                                    />
                                                    <div className='ms-3'>
                                                        <p className='fw-bold mb-1'>{employee.fname} {employee.lname}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='pt-3'>{employee.gender}</td>
                                            <td className='pt-3'>
                                                <Link to={`/view/${employee.id}`}><i class="fa-regular fa-eye fs-4"></i></Link>
                                                <Link to={`/update/${employee.id}`}><i class="fa-regular fa-pen-to-square fs-4 ms-2"></i></Link>
                                                <i onClick={() => handleDelete(employee.id)} style={{ cursor: 'pointer' }} class="fa-solid fa-trash fs-4 ms-2 text-danger"></i>
                                            </td>
                                        </tr>

                                    ))
                                }
                            </tbody>
                        </Table>
                    )
                }
            </div>

        </>
    )
}

export default EmployeeList