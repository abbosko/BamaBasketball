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

// Icons for the view/hide password button
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

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
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { user, signIn } = UserAuth();
  var flag = false;

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await signIn(email, password)
      navigate('/admin/dashboard')
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
              <Form 
                  onSubmit={handleSubmit}>
              <CardBody>
                  <Row>
                    <Col className="pr-md-1" md="5">
                    <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          <p>Email address:</p>
                        </label>
                        <Input placeholder="mike@email.com" 
                        type="email" 
                        onChange={(e) => setEmail(e.target.value)} />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                        <FormGroup>
                            <label>Password:  </label>
                            <Input
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            />
                            <span>
                              <button
                                className="password-toggle-btn"
                                onClick={handleTogglePassword}
                                type="button"
                                >
                                <FontAwesomeIcon
                                  icon={showPassword ? faEyeSlash : faEye}
                                  className="password-toggle-icon"
                                />
                              </button>
                            </span>
                        </FormGroup>
                    </Col>
                  </Row>

              </CardBody>
              <CardFooter>
              {error && <h5 className="title">Incorrect username or password.</h5>}
                <Button className="btn-fill" color="primary" type="submit">
                  Sign In
                </Button>
              </CardFooter>
              </Form>
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
