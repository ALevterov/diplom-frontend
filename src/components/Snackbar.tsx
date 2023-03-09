// material-ui
import { Alert, Button, Fade, Grow, IconButton, Slide } from '@mui/material'
import MuiSnackbar from '@mui/material/Snackbar'

// assets
import CloseIcon from '@mui/icons-material/Close'
import { closeSnackbar } from '../store/slices/snackbar'
import { useAppDispatch, useAppSelector } from '../hooks/redux'

// animation function
function TransitionSlideLeft(props: any) {
  return <Slide {...props} direction='left' />
}

function TransitionSlideUp(props: any) {
  return <Slide {...props} direction='up' />
}

function TransitionSlideRight(props: any) {
  return <Slide {...props} direction='right' />
}

function TransitionSlideDown(props: any) {
  return <Slide {...props} direction='down' />
}

function GrowTransition(props: any) {
  return <Grow {...props} />
}

// animation options
const animation: any = {
  SlideLeft: TransitionSlideLeft,
  SlideUp: TransitionSlideUp,
  SlideRight: TransitionSlideRight,
  SlideDown: TransitionSlideDown,
  Grow: GrowTransition,
  Fade,
}

// ==============================|| SNACKBAR ||============================== //

const Snackbar = () => {
  const dispatch = useAppDispatch()
  const snackbar = useAppSelector(state => state.snackbar)
  const {
    actionButton,
    anchorOrigin,
    alert,
    close,
    message,
    open,
    transition,
    variant,
  } = snackbar

  const handleClose = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(closeSnackbar())
  }

  return (
    <>
      {/* default snackbar */}
      {variant === 'default' && (
        <MuiSnackbar
          anchorOrigin={anchorOrigin as any}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
          TransitionComponent={animation[transition]}
          action={
            <>
              <Button
                color='secondary'
                size='small'
                onClick={handleClose as any}
              >
                UNDO
              </Button>
              <IconButton
                size='small'
                aria-label='close'
                color='inherit'
                onClick={handleClose as any}
                sx={{ mt: 0.25 }}
              >
                <CloseIcon fontSize='small' />
              </IconButton>
            </>
          }
        />
      )}

      {/* alert snackbar */}
      {variant === 'alert' && (
        <MuiSnackbar
          TransitionComponent={animation[transition]}
          anchorOrigin={anchorOrigin as any}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            variant={alert.variant as any}
            color={alert.color as any}
            action={
              <>
                {actionButton !== false && (
                  <Button
                    size='small'
                    onClick={handleClose as any}
                    sx={{ color: 'background.paper' }}
                  >
                    UNDO
                  </Button>
                )}
                {close !== false && (
                  <IconButton
                    sx={{ color: 'background.paper' }}
                    size='small'
                    aria-label='close'
                    onClick={handleClose as any}
                  >
                    <CloseIcon fontSize='small' />
                  </IconButton>
                )}
              </>
            }
            sx={{
              ...(alert.variant === 'outlined' && {
                bgcolor: 'background.paper',
              }),
            }}
          >
            {message}
          </Alert>
        </MuiSnackbar>
      )}
    </>
  )
}

export default Snackbar
