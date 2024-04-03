import React, { useContext, useRef, useState } from 'react'
import { Image } from "primereact/image";
import { Toast } from 'primereact/toast';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { AppContext } from "../../../App";
import { Navigate, useNavigate } from 'react-router-dom';


export default function Formulario() {
    const {ruta } = useContext(AppContext);
    const navigate = useNavigate();
    const toast = useRef(null)
    const buttonRef = useRef();
    const [usuario, setUsername] = useState('');
    const [pass, setPassword] = useState('');


    const handleLogin = (e) => {
        e.preventDefault();
        if (usuario === 'usuario' && pass === 'contraseña') {
            toast.current.show({ severity: 'success', detail: 'Inicio de sesión exitoso' });
             navigate(ruta +'/Inicio'); // Cambia esto para usar la función navigate
            console.log('inicio el proceso')
        } else {
            toast.current.show({ severity: 'error', detail: 'Nombre de usuario o contraseña incorrectos' });
        }
    };

    return (
        <>
            <Toast ref={toast} />
            <div className="p-5">
                <form>
                    <div className="flex justify-content-center">
                        <Image
                            src="https://media.licdn.com/dms/image/D4E0BAQHXNK-UJQ81Gw/company-logo_200_200/0/1698942464169?e=2147483647&v=beta&t=5miWMzDnKFjQ19LtpGkDYaHpPavXmphP57WVyePWQh0"
                            alt="Image"
                            width="150"
                        />

                    </div>
                    <div className="flex justify-content-center">
                        <h2 className="text-gray-700">Bienvenido</h2>
                    </div>{" "}

                    <div className="flex justify-content-center">
                        <p className="text-gray-700" style={{ fontSize: "1.2em" }}>
                            Inicio de sesión: Acceda con sus credenciales
                        </p>
                    </div>
                    <div className="card flex flex-column align-items-center gap-3">
                        <div className="my-1">
                            <InputText
                                type="text"
                                className="p-inputtext-lg w-full"
                                placeholder="Ingrese usuario"
                                value={usuario}
                                onChange={(e) => setUsername(e.target.value)}
                            // value={usuario?.usuario || ""}
                            />

                        </div>

                        <div className="my-1">
                            <Password
                                className="p-inputtext-lg w-full"
                                placeholder="Ingrese contraseña"
                                value={pass}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="flex card justify-content-center my-2">
                            <Dropdown
                                optionLabel="name"
                                placeholder=" Sociedad"
                                className="w-full md:w-14rem"
                            />


                        </div>
                        <div className="flex my-1">
                            <Button
                                className="w-full"
                                label="Olvido la contraseñas"
                            />
                        </div>
                    </div>
                    <div className="flex justify-content-center">
                        <Button ref={buttonRef}
                            severity="success"
                            rounded
                            size="large"
                            className="w-2/3"
                            onClick={handleLogin}
                        // onClick={(e)=>{
                        //     e.preventDefault();
                        //     obtieneSesion();
                        // }}

                        >
                            Iniciar sesión
                        </Button>

                    </div>


                </form>
            </div>

        </>
    )
}
