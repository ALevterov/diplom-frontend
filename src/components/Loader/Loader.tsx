import { Typography, Grid, CircularProgress } from '@mui/material'

type TLoaderProps = {
  text: string
}

const Loader: React.FC<TLoaderProps> = ({ text }) => {
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid
        item
        xs={12}
        sx={{ justifyContent: 'center', display: 'flex', marginBottom: 3 }}
      >
        <Typography variant='subtitle1'>{text}</Typography>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress color='primary' />
      </Grid>
    </Grid>
  )
}

export default Loader
