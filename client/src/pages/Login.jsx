import React, { useContext } from 'react'
import { Alert, Button, Form, Row, Col, Stack } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext'

export default function Login() {

    const { registerError } = useContext(AuthContext)

    return (
        <Form>
            <Row style={{
                height: "100vh",
                justifyContent: "center",
                paddingTop: "20%"
            }}>
                <Col xs={6}>
                    <Stack gap={3}>
                        <h2>Login</h2>
                        <Form.Control type="email" placeholder="Email" />
                        <Form.Control type="password" placeholder="Password" />
                        <Button variant="primary" type="submit">
                            Login
                        </Button>

                        {registerError && <Alert variant="danger">
                            <span>An error occurred</span>
                        </Alert>}
                    </Stack>
                </Col>
            </Row>
        </Form>
    )
}