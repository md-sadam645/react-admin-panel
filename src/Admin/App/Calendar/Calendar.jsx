import "./Calendar.css";
import {
    Card,
    CardContent,
    ButtonGroup,
    Button,
    Typography
} from "@mui/material";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useRef } from "react";

const Calendar = ()=>{
    const cal = useRef();
    const next =()=>{
        const calendar = cal.current.getApi();
        calendar.next();
    }

    const prev =()=>{
        const calendar = cal.current.getApi();
        calendar.prev();
    }

    const today =()=>{
        const calendar = cal.current.getApi();
        calendar.today();
    }

    const todayDate = ()=>{
        const date = new Date();
        const dd = date.getDate();
        const mm = date.toLocaleDateString("default",{month : "long"});
        const yy = date.getFullYear();
        return dd+" "+mm+" "+yy;
     }
    const design =(
        <>
            <Card className="shadow-sm border">
                <CardContent>
                    <div className="d-flex justify-content-between align-items-center">
                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                            <Button className="py-2" onClick={prev}>
                                <span className="material-icons-outlined">arrow_left</span>
                                Prev
                            </Button>
                            <Button className="py-2" onClick={next}>
                                Next
                                <span className="material-icons-outlined">arrow_right</span>
                            </Button>
                        </ButtonGroup>
                        <Typography gutterBottom variant="h5" component="div">
                           {
                            todayDate()
                           }
                        </Typography>
                        <Button className="py-2" variant="outlined" color="warning" onClick={today}>Today</Button>
                    </div>
                    <FullCalendar
                    ref={cal}
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
                    events={[
                        { title: 'Happy birthday Sadam', date: '2023-10-20',color:"black" },
                        { title: 'Traveling for home', date: '2023-11-03' }
                    ]}
                    headerToolbar = {{
                        start : "",
                        center : "",
                        end : ""
                    }}
                    />
                </CardContent>
            </Card>
        </>
    )
    return design;
}

export default Calendar;