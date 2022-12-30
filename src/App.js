import React from "react";
import { Grid, Typography } from "@mui/material";
import TableData from "./components/TableData";

const App = () => {

  return (
    <div>
      <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "10vh", padding: "0px 10vw" }}
      >
        <Typography variant="h4" align="center">
          Traffic Information Dashboard
        </Typography>

      </Grid>
      <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "10vh", padding: "0px 10vw" }}
      >
        <Typography variant="h6" align="center">Road Jam Details </Typography>

      </Grid>

      <TableData />
    </div>
  )
}

export default App;