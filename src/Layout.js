import { Divider } from '@mui/material'
import React from 'react'
import ResponsiveAppBar from './components/Appbar'
import ClippedDrawer from './components/Drawer'

function Layout(props) {
    return (
        <div className="props.class">
            <ResponsiveAppBar/>
            <Divider/>
            {props.children}
            <ClippedDrawer/>
            
        </div>
    )
}

export default Layout
