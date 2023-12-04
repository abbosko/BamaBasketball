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
import { useNavigate } from 'react-router-dom';
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
      <div className="content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '800px', padding: '10px'}}>
        <Row>
          <Col md="11">
            <Card>
              <CardHeader>
                <h5 className="title">Please sign in to access the dashboard.</h5>
              </CardHeader> 
              <Form 
                  onSubmit={handleSubmit}>
              <CardBody>
                  <Row>
                    <Col className="pr-md-1" md="8  ">
                    <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          <p>Email address:</p>
                        </label>
                        <Input placeholder="mike@email.com" 
                        type="email" 
                        onChange={(e) => setEmail(e.target.value)} />
                      </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    <Col className="pl-md-1" md="8">
                      <div style={{ width: '100%', maxWidth: '800px', padding: '10px'}}>
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
                                  color="primary"
                                />
                              </button>
                            </span>
                        </FormGroup>
                        </div>
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
          <Col md="11">
          </Col>
        </Row>
      </div>
      </div>
    </>
  );
}

export default SignIn;
