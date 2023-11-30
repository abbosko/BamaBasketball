/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import {call_set_apis} from 'variables/apiFunctions.js'
import { UserAuth } from 'AuthContext.js'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = UserAuth();
  const { signIn } = UserAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await signIn(email, password)
      navigate('/account')
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Please sign in to access the dashboard.</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="5">
                    <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          <p>Email address: {user && user.email}</p>
                        </label>
                        <Input placeholder="mike@email.com" type="email" />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                        <FormGroup>
                            <label>Password</label>
                            <Input
                            placeholder="Password"
                            type="text"
                            />
                        </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button className="btn-fill" color="primary" type="submit">
                  Sign In
                </Button>
              </CardFooter>
            </Card>
          </Col>
          <Col md="4">
          </Col>
        </Row>
      </div>
    </>
  );
}

export default SignIn;
