import {
    Card,
    CardContent,
    Grid,
    Typography,
    CardActions,
    Button
} from "@mui/material";
import { 
    useState,
    useEffect 
} from "react";
import { 
    useDispatch,
    useSelector 
} from "react-redux";
import {revenueRequest} from "./RevenueAction";
import Chart from "react-apexcharts";
const Revenue =()=>{
    const dispatch = useDispatch();
    const {RevenueReducer} = useSelector(response=>response);
    const getRevenue=()=>{
        return dispatch(revenueRequest());
    }

    const setRevenue=()=>{
        return (
            setCat(RevenueReducer.data.months),
            setSeries([
            {
              name: "Earning",
              data: RevenueReducer.data.earning
            },
            {
              name: "Expenses",
              data: RevenueReducer.data.expenses
            }
          ])
          );
    }
    useEffect(()=>{
        if(RevenueReducer.isLoading === null)
        {
            getRevenue();
        }
      
        if(RevenueReducer.success)
        {
            setRevenue();
        }
    },[RevenueReducer]);

    const [cat,setCat] = useState([]);
    const options ={
        xaxis: {
          categories: cat
        },
        chart : {
            toolbar : {
                tools : {
                    zoom : false,
                    zoomin : false,
                    zoomout : false,
                    pan : false,
                    reset : false
                }
            }
        }
      };
    const [series,setSeries] = useState([]);
    const design =(
        <>
            <Grid item xs={12} sm={6}>
                <Card>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Revenue Updates
                    </Typography>
                    <Chart
                        options={options}
                        series={series}
                        type="line"
                        height="350px"
                        />
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
    return design;
}

export default Revenue;