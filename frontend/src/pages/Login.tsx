import { ChangeEvent, useState } from "react";
import { useAuth } from "../auth";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "@tanstack/react-router";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const { loginMutation } = useAuth();

  const navigate = useNavigate({ from: "/login" });

  const handleOnSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) return;
    await loginMutation
      .mutateAsync({ username, password })
      .then(() => navigate({ to: "/templates" }));
  };

  const isSubmitting = loginMutation.isPending;
  const hasError = loginMutation.isError;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 2,
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            backdropFilter: "saturate(180%) blur(8px)",
          }}
        >
          <Stack spacing={3} component="form" onSubmit={handleOnSubmit}>
            <Stack spacing={1} textAlign="center">
              <Typography variant="h4" fontWeight={700}>
                Добро пожаловать
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Войдите в свой аккаунт, чтобы продолжить
              </Typography>
            </Stack>

            {hasError && (
              <Alert severity="error" variant="outlined">
                {loginMutation.error?.message || "Не удалось войти. Попробуйте снова."}
              </Alert>
            )}

            <TextField
              id="username"
              name="username"
              label="Логин"
              placeholder="Введите логин"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineOutlinedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              id="password"
              name="password"
              label="Пароль"
              placeholder="Введите пароль"
              type={showPassword ? "text" : "password"}
              autoComplete={remember ? "current-password" : "off"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                      onClick={() => setShowPassword((s) => !s)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                }
                label={<Typography variant="body2">Запомнить меня</Typography>}
              />
            </Stack>

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting || !username || !password}
              sx={{ py: 1.2, fontWeight: 700 }}
              startIcon={isSubmitting ? <CircularProgress size={18} color="inherit" /> : null}
            >
              {isSubmitting ? "Входим..." : "Войти"}
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};
