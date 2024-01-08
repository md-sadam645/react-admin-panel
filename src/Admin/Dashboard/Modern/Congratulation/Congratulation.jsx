import {
    Card,
    CardContent,
    Grid,
    Typography,
    CardActions,
    Button
} from "@mui/material";
import "./Congratulation.css";
import Chart from "react-apexcharts";
import { 
    useState 
} from "react";
const Congratulation =()=>{
    const options ={
        
        chart : {
            toolbar : {
                tools : {
                    download : false,
                    zoom : false,
                    zoomin : false,
                    zoomout : false,
                    pan : false,
                    reset : false
                }
            },
            sparkline : {
                enabled : true
            }
        },
        theme : {
            palette : "palette8"
        },
        title : {
            text : "$10,000",
            offSetX : 8,
            offSetY : 8,
            style : {
                fontSize : "18px"
            }
        }
      };
    const [series,setSeries] = useState([
        {
            name : "Earning",
            data : [100,50,250,985,654,150,48,1500,489,2654,100,258.648,2848]
        }
    ]);
    const design =(
        <>
            <Grid item xs={12} sm={5}>
                <Card className="chart-box">
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Sales
                    </Typography>
                    </CardContent>
                    <Chart
                        options={options}
                        series={series}
                        type="area"
                        height="160px"
                        className="chart"
                        />
                </Card>
            </Grid>
        </>
    );
    return design;
}

export default Congratulation;