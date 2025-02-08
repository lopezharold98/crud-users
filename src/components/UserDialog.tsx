import React, { useEffect } from "react";
import { User } from "../types/User";
import { useForm, SubmitHandler } from "react-hook-form";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
} from "@mui/material";

interface Props {
    open: boolean;
    onClose: () => void;
    onSave: (user: User) => void;
    user?: User | null;
}

const UserDialog: React.FC<Props> = ({ open, onClose, onSave, user }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<User>({
        defaultValues: user || { id: 0, name: "", email: "" },
    });

    useEffect(() => {
        reset(user || { id: 0, name: "", email: "" });
    }, [user, reset]);

    const onSubmit: SubmitHandler<User> = (data) => {
        onSave(user ? { ...user, ...data } : { ...data, id: Date.now() });
        onClose();
        reset({ id: 0, name: "", email: "" });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>{user ? "Editar Usuario" : "Agregar Usuario"}</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Nombre"
                    fullWidth
                    sx={{ width: "100%" }}
                    {...register("name", {
                        required: "El nombre es obligatorio",
                        minLength: { value: 3, message: "Debe tener al menos 3 caracteres" },
                    })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />

                <TextField
                    margin="dense"
                    label="Email"
                    fullWidth
                    sx={{ width: "100%" }}
                    type="email"
                    {...register("email", {
                        required: "El correo es obligatorio",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Formato de correo inválido",
                        },
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSubmit(onSubmit)} variant="contained">
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserDialog;
