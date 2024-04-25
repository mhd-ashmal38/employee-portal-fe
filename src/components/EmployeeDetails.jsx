import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { getEmployees } from '../service/allApi'

function EmployeeDetails() {

    const { id } = useParams()
    // console.log(id);

    const [emp, setEmp] = useState({})

    useEffect(() => {
        getEmployee()
    }, [])

    const getEmployee = async () => {
        const { data } = await getEmployees("")
        // console.log(data);
        // console.log(data.find(item => item.id === id));
        setEmp(data.find(item => item.id === id));
    }
    // console.log(emp);

    return (
        <>

            <div className='d-flex justify-content-center align-items-center vh-100'>
                {
                    emp ?
                        <Card style={{ width: '24rem' }}>
                            <Card.Img variant="top" src={emp.profile} style={{ maxWidth: '100%', maxHeight: '22rem', objectFit: 'cover' }}/>
                            <Card.Body>
                                <Card.Title className='text-center pb-2'><h2>{emp.fname} {emp.lname}</h2></Card.Title>
                                <div style={{ lineHeight: '1' }}>
                                    <Card.Text><h5><i class="fa-regular fa-envelope pe-2"></i>{emp.email}</h5></Card.Text>
                                    <Card.Text><h5><i class="fa-solid fa-phone pe-2"></i>{emp.mobile}</h5></Card.Text>
                                    <Card.Text><h5><i class="fa-solid fa-venus-mars pe-2"></i>{emp.gender}</h5></Card.Text>
                                    <Card.Text><h5><i class="fa-solid fa-location-dot pe-2"></i>{emp.location}</h5></Card.Text>
                                </div>
                            </Card.Body>
                        </Card> : ""
                }
            </div>

        </>
    )
}

export default EmployeeDetails