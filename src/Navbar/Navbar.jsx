import {
    Stack,
    Container,
    Button
} from "@mui/material";
import "./Navbar.css";
import menu from "../json-api/menu";
import { Link } from "react-router-dom";

const Navbar =()=>{
    const Buttons =(data)=>{
        const design =(
            <>
                <Link to={data.data.link} sx={{
                    borderRadius : "0",
                    "&:hover" :{
                    backgroundColor : "secondary.main",
                    color : "white",
                    transition : "0.5s"
                }
                }}>{data.data.label}</Link>
            </>
        );
        return design;
    }

    const design =(
        <>
          <Stack className="bg-light"> 
                <Container className="bg-light text-center">
                    <Stack direction={{
                        xs : "column",
                        md : "row"
                    }} justifyContent="space-between">
                        <h4>Testing</h4>
                        <Stack direction={{
                        xs : "column",
                        md : "row"
                    }}  spacing={3}>
                            {
                                menu.map((items)=>{
                                    return <Buttons key={items.id} data={items} />
                                })
                            }
                        </Stack>
                    </Stack>
                </Container>
            
          </Stack>
        </>
    );
    return design;
}
export default Navbar;