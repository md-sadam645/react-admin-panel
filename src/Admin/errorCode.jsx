import {
    Drawer,
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    AppBar,
    Toolbar,
    IconButton,
    Button,
    ListSubheader,
    Collapse
} from "@mui/material";


import adminMenu from "../json-api/adminMenu.json";
import { useState } from "react";
import { Outlet,Link } from "react-router-dom";

const Admin =()=>{
    
    const [active,setActive] = useState(false);
    const [width,setWidth] = useState(0);
    const [collapsible,setCollapsible] = useState(false);

    const Nav =({data})=>{
        const navDesign =(
            <>
                <ListItem sx={{py:0}}>
                    <ListItemButton onClick={data.isDropdown ? ()=>setCollapsible(!collapsible) : null}>
                    <ListItemIcon>
                        <span className="material-icons">{data.icon}</span>
                    </ListItemIcon>
                    <ListItemText primary={data.label} />
                    <span className="material-icons">
                        {
                            data.isDropdown ? "expand_more" : null
                        }
                    </span>
                    </ListItemButton>
                </ListItem>
                {
                    data.isDropdown ? <Dropdown menu={data.dropdown} /> : null
                }
            </>
        );
        return navDesign;
    }

    const Dropdown =({menu})=>{
        console.log(menu);     
        const dropdownDesign=(
            
            <>
                <Collapse in={collapsible} sx={{pl:4}}>
                    {
                        menu.map((data)=>{
                            return <Nav key={data.id} data={data}/>
                        })
                    }
                </Collapse>
            </>
        );
        return dropdownDesign;
    }

    const Menu =({data})=>{
        const menuDesign =(
            <>
                <ListSubheader>{data.cat}</ListSubheader>
                {
                    data.menus.map((menu)=>{
                        return <Nav key={menu.id} data={menu} />
                    })
                }
            </>
        );
        return menuDesign;
    }

    const controlDrawer =()=>{
        return(
            setActive(!active),
            active ? setWidth(0) : setWidth(250)
        );
    }

    const design =(
        <>
            <Stack>
                <Drawer open={active} variant="persistent" sx={{
                    width: width,
                    "& .MuiDrawer-paper" : {
                        width : width,
                        bgcolor : "white",
                        transition : "0.2s",
                    }
                }}>

                <List subheader={<ListSubheader sx={{mt:2}} />}>
                    <img src="./images/logo.webp" width="200" alt="logo"/>
                </List>
                {
                    adminMenu.map((items)=>{
                        return <Menu key={items.id} data={items} />
                    })
                }
               
                </Drawer>

                <AppBar position="fixed" sx={{
                    width : `calc(100% - ${width}px)`,
                    transition : "0.2s",
                }}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={controlDrawer}>
                            <span className="material-icons">menu</span>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Stack sx={{
                    ml : `${width}px`,
                    mt : 4,
                    p : 3
                }}>
                    <h1>testing</h1>
                </Stack>
            </Stack>
        </>
    );
    return design;
}
export default Admin;