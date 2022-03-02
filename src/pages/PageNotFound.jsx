import React from 'react'
import { useNavigate } from 'react-router'

const PageNotFound = () => {
    const navigate = useNavigate()
    setInterval(() => {
        navigate("/")
    }, 3500)

    return (
        <div>
            <h1>Page not found</h1>
        </div>
    )
}

export default PageNotFound