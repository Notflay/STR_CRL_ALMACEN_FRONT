import React from 'react'
import SideBar from "./SideBar";
function Modulos({
    SideBarActive,
    setSideBarActive,
    responsiveSize,
}) {
    return (
        <>
            <div
                className={`fixed flex w-18rem z-5 overflow-y-auto  bg-white border-round-lg shadow-1 ${!SideBarActive ? "-translate-x-100" : ""
                    } layout_modulos `}
                style={{
                    top: "7rem",
                    left: "2rem",
                    height: "calc(100vh - 9rem)",
                    transition: "transform .2s, left .2s",
                    padding: ".5rem 1.5rem",
                }}
            >
                <SideBar />

            </div>
            {responsiveSize & (SideBarActive == false) && (
                <Sidebar
                    className="layout_menu"
                    visible={!SideBarActive}
                    onHide={() => setSideBarActive(!SideBarActive)}
                    content={({ }) => (
                        <div
                            className={`fixed flex w-18rem z-5 overflow-y-auto  bg-white `}
                            style={{
                                top: "1rem",
                                left: "1rem",
                                height: "calc(100vh - 9rem)",
                                transition: "transform .2s, left .2s",
                                padding: ".5rem 1.5rem",
                            }}
                        >
                            <SideBar
                                responsiveSize={responsiveSize}
                                setSideBarActive={setSideBarActive}
                                SideBarActive={SideBarActive}
                            />
                        </div>


                    )}
                ></Sidebar>
            )}

        </>
    )
}

export default Modulos
