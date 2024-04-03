import { Tooltip } from 'primereact/tooltip'
import React from 'react'

function HeaderSL({ header }) {
    return (
        <>
            <Tooltip
                target=".export-buttons>button"
                position="bottom"
                right={header}
            />
        </>
    )
}

export default HeaderSL
