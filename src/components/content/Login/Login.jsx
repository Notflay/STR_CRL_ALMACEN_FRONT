import React from 'react'
import Formulario from './Formulario'
import "../../Public/css/Login.css"

export default function Login() {


    return (
        <>
            <div
                className="layoutImage h-screen w-full bg-no-repeat bg-left-top  flex"
                style={{
                    backgroundImage: 'url(/src/components/Public/Imgs/FondoLogin.jpg)',
                    backgroundSize: "100% 100%",
                }}
            >
                <div className="flex bg-white border-round-3xl min-h-3 my-auto mx-8">
                    <div>
                        <Formulario></Formulario>
                    </div>
                </div>
            </div>
        </>
    )
}
