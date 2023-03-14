import { useNavigate } from 'react-router-dom'
import MainLayout from '../layouts/mainLayout'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { getAuthState } from '../store/slices/auth'
import { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Grid, Paper } from '@mui/material'
import { getAdminState, logsAnalysis, logsLoading } from '../store/slices/admin'
import { openSnackbar } from '../store/slices/snackbar'
import { startingLogsAnalysis } from '../http/analysis'
import Loader from '../components/Loader/Loader'

const Page: React.FC = () => {
  useEffect(() => {
    if (!isAdmin || !isAuthorized) {
      navigate('/login')
    }
  }, [])

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [data, setData] = useState([])
  const { isAdmin, isAuthorized } = useAppSelector(getAuthState())
  const { isLoading, isLogsAnalyzed } = useAppSelector(getAdminState())

  const handleLogAnalysis = async () => {
    try {
      dispatch(logsAnalysis(false))
      dispatch(logsLoading(true))
      const { response } = await startingLogsAnalysis()
      setData(response)
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
    } finally {
      dispatch(logsLoading(false))
    }
  }

  const handleFindIncidents = async () => {}

  return (
    <Grid container>
      <Paper sx={{ p: 2, width: '100%' }}>
        <Grid container sx={{ marginBottom: 2 }}>
          <Button
            onClick={handleLogAnalysis}
            disabled={isLoading}
            variant='contained'
            color='primary'
            sx={{ marginRight: 2 }}
          >
            Запустить анализ логов
          </Button>
          <Button
            onClick={handleFindIncidents}
            disabled={isLoading}
            variant='contained'
            color='secondary'
          >
            Поиск инцидентов
          </Button>
        </Grid>
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 4,
          }}
          xs={6}
        >
          {isLoading ? (
            <Loader text='Выполнение может занять много времени' />
          ) : (
            <Grid item>{data.length === 0 ? 'Нет логов' : data}</Grid>
          )}
        </Grid>
      </Paper>
    </Grid>
  )
}

const IncidentsPage = () => (
  <MainLayout>
    <Page />
  </MainLayout>
)
export default IncidentsPage
