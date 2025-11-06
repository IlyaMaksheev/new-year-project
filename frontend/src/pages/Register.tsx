import { ChangeEvent, useMemo, useState } from "react";
import { useRegister } from "../hooks/useRegister";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link as MLink,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useNavigate } from "@tanstack/react-router";

export const Register = () => {
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [remember, setRemember] = useState(true);

  const { registerMutation } = useRegister();

  const navigate = useNavigate({ from: "/register" });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setImage(file);
    }
  };

  const handleOnSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nickname || !username || !password || !image) return;
    await registerMutation
      .mutateAsync({ nickname, username, password, image })
      .then(() => navigate({ to: "/templates" }));
  };

  const isSubmitting = registerMutation.isPending;
  const hasError = registerMutation.isError;
  const errorMessage = (registerMutation.error as Error | undefined)?.message;

  const imagePreview = useMemo(() => (image ? URL.createObjectURL(image) : null), [image]);

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
              <Typography variant="h4" component="h1" fontWeight={700}>
                Создать аккаунт
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Заполните данные ниже для регистрации
              </Typography>
            </Stack>

            {hasError && (
              <Alert severity="error" variant="outlined">
                {errorMessage || "Не удалось зарегистрироваться. Попробуйте снова."}
              </Alert>
            )}

            <TextField
              id="nickname"
              name="nickname"
              label="Никнейм"
              placeholder="Введите никнейм"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeOutlinedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

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
              placeholder="Придумайте пароль"
              type={showPassword ? "text" : "password"}
              autoComplete={remember ? "new-password" : "off"}
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
              helperText="Минимум 6 символов"
            />

            <Stack spacing={1}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar src={imagePreview ?? undefined} sx={{ width: 56, height: 56 }} />
                <input
                  id="image-input"
                  name="image"
                  onChange={handleImageChange}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                />
                <label htmlFor="image-input">
                  <Button
                    component="span"
                    variant="outlined"
                    startIcon={<PhotoCameraOutlinedIcon />}
                    sx={{ textTransform: "none" }}
                  >
                    {image ? "Выбрать другое фото" : "Загрузить аватар"}
                  </Button>
                </label>
                {image && (
                  <IconButton aria-label="Убрать изображение" onClick={() => setImage(null)}>
                    <CloseRoundedIcon />
                  </IconButton>
                )}
              </Stack>
              <Typography variant="caption" color="text.secondary">
                Поддерживаемые форматы: JPG, PNG. Рекомендуется квадратное изображение.
              </Typography>
            </Stack>

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

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting || !nickname || !username || !password || !image}
              sx={{ py: 1.2, fontWeight: 700 }}
              startIcon={isSubmitting ? <CircularProgress size={18} color="inherit" /> : null}
            >
              {isSubmitting ? "Регистрируемся..." : "Зарегистрироваться"}
            </Button>

            <Divider flexItem>
              <Typography variant="caption" color="text.secondary">
                или
              </Typography>
            </Divider>

            <Typography variant="body2" textAlign="center" color="text.secondary">
              Уже есть аккаунт? {""}
              <MLink href="/login" underline="hover" color="primary">
                Войдите
              </MLink>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};
