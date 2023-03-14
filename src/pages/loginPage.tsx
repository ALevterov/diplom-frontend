import { useState, useEffect, FormEvent } from 'react'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { blue } from '@mui/material/colors'
// import Copyright from '../app/components/auth/copyright'
import { openSnackbar } from '../store/slices/snackbar'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import {
  authorized,
  getAuthState,
  loggedInAsAdmin,
  requested,
} from '../store/slices/auth'
import { loginReq, registerReq } from '../http/auth'

const LoginPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [isLogin, setIsLogin] = useState(true)
  const { isAdmin } = useAppSelector(getAuthState())
  useEffect(() => {
    console.log('login')

    if (isAdmin) {
      navigate('/admin')
    }
  }, [isAdmin])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const formData = new FormData(event.currentTarget)

      dispatch(requested())
      const { data } = isLogin
        ? await loginReq(formData)
        : await registerReq(formData)

      localStorage.setItem('access', data.access)
      localStorage.setItem('refresh', data.refresh)

      if (data.user.roles.includes('Admin')) {
        dispatch(loggedInAsAdmin(data.user.username))
        navigate('/admin')
      } else {
        dispatch(authorized(data.user.username))
        navigate('/')
      }
    } catch (e: any) {
      console.log(e)
      dispatch(
        openSnackbar({
          open: true,
          message: e?.response?.data?.message || e.message,
          variant: 'alert',
          alert: {
            color: 'error',
          },
        })
      )
    }
  }
  return (
    <Container
      sx={{
        minHeight: '100vh',
        width: '100%',
        minWidth: '100%',
        background: '#EEF2F6',
        paddingTop: 8,
      }}
      className='musor'
    >
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            {isLogin ? 'Вход' : 'Регистрация'}
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit as any}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='Username'
              label='Username'
              name='username'
              autoComplete='Username'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Запомнить'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              color='secondary'
            >
              {isLogin ? 'Вход' : 'Регистрация'}
            </Button>
            <Grid container>
              {/* <Grid item xs>
              <Link href='#' variant='body2'>
                Забыли пароль?
              </Link>
            </Grid> */}
              <Grid item>
                <Typography
                  variant='body2'
                  sx={{
                    cursor: 'pointer',
                    color: blue[500],
                    textDecoration: 'underline',
                  }}
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin
                    ? 'Нет аккаунта? Зарегистрируйтесь'
                    : 'Есть аккаунт? Войдите'}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </Container>
  )
}

export default LoginPage
