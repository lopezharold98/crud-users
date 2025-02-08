import React, { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import UserTable from "../components/UserTable";
import UserDialog from "../components/UserDialog";
import { Container, Typography, IconButton, Box, Paper } from "@mui/material";
import { User } from "../types/User";
import { PersonAdd } from "@mui/icons-material";

const Home: React.FC = () => {
    const { state, addUser, updateUser, deleteUser } = useUsers();
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleOpen = (user?: User) => {
        setSelectedUser(user || null);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    return (
        <Box sx={{ backgroundColor: "#f5f5dc", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: 4 }}>
            <Paper elevation={3} sx={{ width: "90%", maxWidth: 800, padding: 4, borderRadius: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h4" fontWeight="bold">
                        Gestión de Usuarios
                    </Typography>
                    <IconButton color="primary" onClick={() => handleOpen()}>
                        <PersonAdd fontSize="large" />
                    </IconButton>
                </Box>
                <UserTable users={state.users} onEdit={handleOpen} onDelete={deleteUser} />
                <UserDialog open={open} onClose={handleClose} onSave={selectedUser ? updateUser : addUser} user={selectedUser} />
            </Paper>
        </Box>
    );
};

export default Home;
