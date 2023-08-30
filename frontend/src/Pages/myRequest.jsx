import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const data = [
  { name: "User 1", message: "Hello", id: 1 },
  { name: "User 2", message: "Hi there", id: 2 },
  // Add more data entries as needed
];

const CustomTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ borderCollapse: "separate", borderSpacing: "0 8px" }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ borderBottom: "none" }}>Name</TableCell>
            <TableCell sx={{ borderBottom: "none" }}>Message</TableCell>
            <TableCell sx={{ borderBottom: "none" }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell sx={{ borderBottom: "none" }}>{row.name}</TableCell>
              <TableCell sx={{ borderBottom: "none" }}>{row.message}</TableCell>
              <TableCell sx={{ borderBottom: "none" }}>
                <IconButton aria-label="Accept" color="primary">
                  <CheckIcon />
                </IconButton>
                <IconButton aria-label="Reject" color="secondary">
                  <CloseIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const MyRequest = () => {
  return (
    <Card sx={{ margin: "20px", borderRadius: "10px", mb: 30 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Requests
        </Typography>
      </CardContent>
      <CustomTable />
    </Card>
  );
};

export default MyRequest;
