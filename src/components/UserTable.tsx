import React from "react";
import { User } from "../types/User";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Typography,
    Box,
} from "@mui/material";
import { Delete, Edit, PersonAdd } from "@mui/icons-material";

interface Props {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (id: number) => void;
    
}

const UserTable: React.FC<Props> = ({ users, onEdit, onDelete }) => {
    return (
        <Box sx={{ width: "100%", overflowX: "auto" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="h6" fontWeight="bold">
                                ID
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h6" fontWeight="bold">
                                Nombre
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h6" fontWeight="bold">
                                Email
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Box display="flex" alignItems="center" justifyContent="flex-end">
                                <Typography variant="h6" fontWeight="bold" sx={{ marginRight: 1 }}>
                                    Acciones
                                </Typography>
                                
                            </Box>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell align="right">
                                <IconButton color="secondary" onClick={() => onEdit(user)}>
                                    <Edit />
                                </IconButton>
                                <IconButton color="error" onClick={() => onDelete(user.id)}>
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default UserTable;
