import { Button } from 'primereact/button';
import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from "../../App";
import { Image } from "primereact/image";
export default function Header({
    setSideBarActive,
    SideBarActive,
    responsiveSize,
    // responsiveSizeMobile,
}) {
    const navigate = useNavigate();
    const { setUsuario, ruta } = useContext(AppContext);
    const [isHovered, setIsHovered] = useState(false);
    const buttonRef = useRef(null);
    const [isHoveredUs, setIsHoveredUs] = useState(false);

    const handleSpanClick = () => {
        if (buttonRef.current) {
          buttonRef.current.click();
        }
        window.close(); 
      }


    return (
        <nav>
            <div className="flex w-full h-6rem bg-black-alpha-90 z-5 left-0 top-0 px-2  justify-content-center shadow-1 fixed"
                style={{
                    transitionProperty: "left",
                    transitionDuration: "0.2s",
                    transitionTimingFunction: "ease",
                    transitionDelay: "0s",
                }}
            >
                <div className={`flex justify-content-center w-18rem  ${!responsiveSize && `mr-8`
                    }  text-2xl font-medium align-items-center`}
                >
                    <Image
                        className="h-2rem "
                        src="https://media.licdn.com/dms/image/D4E0BAQHXNK-UJQ81Gw/company-logo_200_200/0/1698942464169?e=2147483647&v=beta&t=5miWMzDnKFjQ19LtpGkDYaHpPavXmphP57WVyePWQh0"
                        alt="Image"
                        height="50"
                    />
                    <span className="text-white">Ramo Perú

                    </span>

                </div>
                <div className="flex  mr-2  text-2xl font-medium align-items-center">
                    <Button
                        icon="pi pi-bars"
                        rounded
                        text
                        severity="success"
                        aria-label="Search"
                        size="large"
                        style={{ color: "#97E723" }}
                        onClick={() => setSideBarActive(!SideBarActive)}
                    ></Button>
                </div>
                {!responsiveSize && (
                    <div className={`flex justify-content-center w-6 ${!responsiveSize && `mr-8`
                        }  ${responsiveSize == true ? `text-lg` : `text-3xl`
                        } font-medium align-items-center`}
                    >
                        <span className="font-semibold" style={{ color: "#97E723" }}>
                            Portal de Compras
                        </span>
                    </div>
                )}
                <div className={`flex justify-content-end ${responsiveSize ? `w-10rem` : `w-25rem`
                    }  text-2xl font-medium align-items-center gap-7 p-5 md:justify-content-between`}

                >
                    {!responsiveSize && (
                        <div className={`flex flex-column align-items-center  cursor-pointer ${isHoveredUs ? "hoveredperfil" : ""
                            }`}
                            onMouseEnter={() => setIsHoveredUs(true)}
                            onMouseLeave={() => setIsHoveredUs(false)}

                        >
                            <Button
                                icon="pi pi-user"
                                rounded
                                text
                                severity="success"
                                aria-label="Search"
                                size="large"
                                className="align-items-center justify-content-center"
                                style={{ color: "#97E723" }}
                            ></Button>
                            {/* <span className="text-xs perfil " style={{ color: "#ffffff" }}>
                                {usuario.Nombres && capitalizarNombres(usuario.Nombres)}
                            </span>
                            <span className="text-xs perfil" style={{ color: "#ffffff" }}>
                                Perfil: {obtenePerfil(usuario.TipoUsuario)} - Sede:{" "}
                                {usuario.fax}
                            </span> */}
                        </div>
                    )}

                    <div
                        className={`flex flex-column align-items-center cursor-pointer ${isHovered ? "hoveredClose" : ""
                            }`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <Button
                            icon="pi pi-sign-out"
                            rounded
                            text
                            severity="success"
                            aria-label="Search"
                            size="large"
                            style={{ color: "#97E723" }}
                            ref={buttonRef}
                            onClick={(e) => {
                                setUsuario(null);
                                navigate(ruta + "/login");
                            }}
                        ></Button>
                        <span
                            className="text-xs"
                            style={{ color: "#ffffff" }}
                            onClick={handleSpanClick}
                        >
                            Cerrar Sesión
                        </span>
                    </div>

                </div>



            </div>
        </nav>
    )
}
