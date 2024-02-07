import React, { useContext } from 'react'
import { Container, Nav, Navbar, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function NavBar() {

    const { user, logoutUser } = useContext(AuthContext)

    return (
        <Navbar bg="dark" className="mb-4" style={{height: "3.75rem"}}>
            <Container>
                <h2>
                    <Link to="/" className="link-light text-decoration-none">
                        Chat App
                    </Link>
                </h2>
                {user && <span className="text-warning">Loggin in as {user?.name}</span>}
                <Nav>
                    <Stack direction="horizontal" gap={3}>
                        {/*if user is logged in, don't show the bottom two links */}
                        
                        {user ?
                            <Link 
                                to="/login" 
                                className="link-light text-decoration-none"
                                onClick={logoutUser}
                            >
                                Logout
                            </Link>
                            :
                            (
                                <>
                                    <Link 
                                        to="/login" 
                                        className="link-light text-decoration-none"
                                    >
                                        Login
                                    </Link>
                                    <Link 
                                        to="/register" 
                                        className="link-light text-decoration-none"
                                    >
                                        Register
                                    </Link>
                                </>
                            ) 
                        }
                        
                    </Stack>
                </Nav>
            </Container>
        </Navbar>
    )
}
