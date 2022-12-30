import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";


const TableData = ({ }) => {
    const [tableData, setTableData] = useState({});
    const [roads, setRoads] = useState([]);
    const [segments, setSegments] = useState([]);
    const [jams, setJams] = useState([]);
    const API_URL = "http://localhost:8080/getTrafficData";
    let allSegments = [];
    let allJams = [];

    useEffect(() => {
        let interval = setInterval(() => {
            fetch(API_URL)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    setTableData(data)
                    setRoads(data.roads)
                    data.roads.map((road) => {
                        allSegments.push(...road.segments)
                    })
                    setSegments(JSON.stringify(allSegments));

                })
                .catch((err) => console.log(err.message))
        }, 300000);
        return () => {
            clearInterval(interval);
        };
        // fetch(API_URL)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log(data)
        //         setTableData(data)
        //         setRoads(data.roads)
        //         data.roads.map((road) => {
        //             allSegments.push(...road.segments)
        //         })
        //         setSegments(JSON.stringify(allSegments));

        //     })
        //     .catch((err) => console.log(err.message))
    }, [])

    useEffect(() => {
        roads.map((road) => {
            let tempSegment = road.segments;
            tempSegment.forEach(segment => allSegments.push(segment))

        })
        console.log("Final all Segment", allSegments);
        setSegments(allSegments);

        allSegments.map((segment) => {
            let tempJam = segment.jams;
            if (tempJam !== null) {
                tempJam.forEach(jam => allJams.push(jam))
            }
        })
        setJams(allJams);
        console.log(allJams);
    }, []);

    return (
        <div>
            <Typography variant="h6" align="center">
                Information last updated at : {tableData.dateTime}
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Road</b></TableCell>
                            <TableCell><b>Label</b></TableCell>
                            <TableCell><b>Incident Type</b></TableCell>
                            <TableCell><b>From</b></TableCell>
                            <TableCell><b>To</b></TableCell>
                            <TableCell><b>Distance</b></TableCell>
                            <TableCell><b>Delay</b></TableCell>
                            <TableCell><b>Start</b></TableCell>
                            <TableCell><b>Stop</b></TableCell>
                            <TableCell><b>Reason</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {console.log("ALL JAMS", jams)}
                        {
                            jams.map((jam) => {
                                return (
                                    <TableRow>
                                        < TableCell > {jam.road}</TableCell>
                                        <TableCell>{jam.label}</TableCell>
                                        <TableCell>{jam.incidentType}</TableCell>
                                        <TableCell>{jam.from}</TableCell>
                                        <TableCell>{jam.to}</TableCell>
                                        <TableCell>{jam.distance}</TableCell>
                                        <TableCell>{jam.delay}</TableCell>
                                        <TableCell>{jam.start}</TableCell>
                                        <TableCell>{jam.stop}</TableCell>
                                        <TableCell>{jam.reason}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    );

}

export default TableData;