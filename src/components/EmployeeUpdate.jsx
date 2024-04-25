import React, { useEffect, useState } from 'react'
import { Alert, Form, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom'
import { editEmployee, getEmployees } from '../service/allApi';

function EmployeeUpdate() {

    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // state for holding user input
    const [userInput, setUserInput] = useState({
        id: "",
        fname: "",
        lname: "",
        email: "",
        mobile: "",
        gender: "",
        profile: "",
        location: ""
    })

    // form validation
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    // define input function
    const getUserInput = (e) => {
        const { name, value } = e.target

        setUserInput({ ...userInput, [name]: value })
    }

    // console.log(userInput);

    useEffect(() => {
        getEmployee()
    }, [])


    const { id } = useParams()
    // console.log(id);

    const getEmployee = async () => {
        const { data } = await getEmployees("")
        // console.log(data);
        // console.log(data.find(item => item.id === id));
        let existingEmployee = data.find(item => item.id === id)
        console.log(existingEmployee);

        setUserInput(existingEmployee)
    }

    // define handleAdd function
    const handleAdd = async () => {
        const { id, fname, lname, email, mobile, gender, profile, location } = userInput;

        if (!id || !fname || !lname || !email || !mobile || !gender || !profile || !location) {
            setError('Please fill the form completely.');
            return;
        }

        try {
            setError('');
            const response = await editEmployee(id, userInput);
            setSuccess('Employee details updated successfully.');
            setTimeout(() => {
                navigate('/'); // Navigate to the home page
            }, 2000); 
            // console.log(response);
        } catch (error) {
            setError('An error occurred while adding the employee. Please try again later.');
            console.error('Error adding employee:', error);
        }
    };


    return (
        <>

            {/* Display success message */}
            {success && (
                <Alert variant='success' onClose={() => setSuccess('')} dismissible>
                    {success}
                </Alert>
            )}

            {/* Display error message */}
            {error && <Alert variant='danger'>{error}</Alert>}
            <div className='container mt-3 p-5'>
                <h1 className='text-center fw-bolder'>Edit Employee Details!</h1>
                <div className='mt-3 shadow border rounded p-2'>

                    {/* user profile picture */}
                    <div className='text-center pt-3'>
                        <img style={{ width: '70px', height: '70px', borderRadius: '50%' }} src={userInput.profile || "https://imgs.search.brave.com/Y-4TMm8YRmquy-TPE62I8bIVoi3vq8n9ge1qtt-pjtg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL3RodW1icy81/ODVlNGJjZGNiMTFi/MjI3NDkxYzMzOTYu/cG5n"} alt="No Image" />
                    </div>

                    {/* form */}
                    <Form className='p-5' noValidate validated={validated} onSubmit={handleSubmit}>

                        <Row className="mb-3" lg={2}>
                            {/* employee id */}
                            <Form.Group as={Col} md={1} controlId="formGridId">
                                <Form.Label>Employee Id</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Employee Id"
                                    name='id'
                                    disabled
                                    value={userInput.id}
                                />
                            </Form.Group>

                            {/* first name */}
                            <Form.Group as={Col} md={1} controlId="formGridFname">
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="First name"
                                    name='fname'
                                    onChange={e => getUserInput(e)} value={userInput.fname}
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3" lg={2}>
                            {/* last name */}
                            <Form.Group as={Col} md={1} controlId="formGridLname">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control type="text" placeholder="Last name" required name='lname' onChange={e => getUserInput(e)} value={userInput.lname} />
                            </Form.Group>

                            {/* email */}
                            <Form.Group as={Col} md={1} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" required name='email' onChange={e => getUserInput(e)} value={userInput.email} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid email.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3" lg={2}>
                            {/* mobile */}
                            <Form.Group as={Col} md={1} controlId="formGridMobile">
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control type="text" placeholder="Enter mobile" required minLength="10" maxLength={10} name='mobile' onChange={e => getUserInput(e)} value={userInput.mobile} />
                                <Form.Control.Feedback type="invalid">
                                    Mobile must be 10 numbers long.
                                </Form.Control.Feedback>
                            </Form.Group>

                            {/* gender */}
                            <Form.Group as={Col} md={1} controlId="formGridGender">
                                <Form.Label>Select Gender</Form.Label>

                                {/* Male */}
                                <Form.Check type="radio" name='gender' value={"Male"} label={'Male'} required onChange={e => getUserInput(e)} checked={userInput.gender === "Male" ? true : false} />

                                {/* Female */}
                                <Form.Check type="radio" name='gender' value={"Female"} label={'Female'} required onChange={e => getUserInput(e)} checked={userInput.gender === "Female" ? true : false} />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3" lg={2}>
                            {/* profile */}
                            <Form.Group as={Col} md={1} controlId="formGridProfile">
                                <Form.Label>Profile</Form.Label>
                                <Form.Control type="text" placeholder="Enter profile url" required name='profile' onChange={e => getUserInput(e)} value={userInput.profile} />
                            </Form.Group>

                            {/* location */}
                            <Form.Group as={Col} md={1} controlId="formGridLocation">
                                <Form.Label>Location</Form.Label>
                                <Form.Control type="text" placeholder="Enter location" required name='location' onChange={e => getUserInput(e)} value={userInput.location} />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Button variant="primary" size="lg" onClick={handleAdd}>
                                Update
                            </Button>
                        </Row>

                    </Form>

                </div>
            </div>

        </>
    )
}

export default EmployeeUpdate