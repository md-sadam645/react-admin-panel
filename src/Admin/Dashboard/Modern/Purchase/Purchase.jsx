import {
    Card,
    CardContent,
    Grid,
    Typography,
    CardActions,
    Button
} from "@mui/material";
import Chart from "react-apexcharts";
import { 
    useState 
} from "react";
const Purchase =()=>{
    const options ={
        labels : [
            "Laptop",
            "Watch",
            "Book",
            "Mobile",
            "Desktop"
        ]
    };
    const [series,setSeries] = useState([
        100,
        250,
        580,
        98,
        357
    ]);
    const design =(
        <>
            <Grid item xs={12} sm={3}>
                <Card style={{height:"200px"}}>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Purchase
                    </Typography>
                    <Chart
                        options={options}
                        series={series}
                        type="pie"
                        height="150px"
                        />
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
    return design;
}

export default Purchase;