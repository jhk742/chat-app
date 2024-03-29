import React, { useContext } from 'react'
import { Alert, Button, Form, Row, Col, Stack } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext'

export default function Login() {

    const { loginError, 
        isLoginLoading, 
        loginUser, 
        loginInfo, 
        updateLoginInfo } = useContext(AuthContext)

    return (
        <Form onSubmit={loginUser}>
            <Row style={{
                height: "100vh",
                justifyContent: "center",
                paddingTop: "20%"
            }}>
                <Col xs={6}>
                    <Stack gap={3}>
                        <h2>Login</h2>
                        <Form.Control 
                            type="email" 
                            placeholder="Email" 
                            onChange={(e) => 
                                updateLoginInfo({
                                    ...loginInfo, email: e.target.value
                                })
                            }
                        />
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            onChange={(e) => 
                                updateLoginInfo({
                                    ...loginInfo, password: e.target.value
                                })
                            }
                        />
                        <Button variant="primary" type="submit">
                            {isLoginLoading ? "Logging you in" : "Login"}
                        </Button>

                        {loginError?.error && 
                            <Alert variant="danger">
                                <span>{loginError?.message}</span>
                            </Alert>
                        }
                    </Stack>
                </Col>
            </Row>
        </Form>
    )
}