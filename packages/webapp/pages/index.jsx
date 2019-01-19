import React, { useState } from 'react'
import { withStyles, withTheme } from '@material-ui/core/styles'
import {
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  withWidth
} from '@material-ui/core'

import Layout from '../layout/Layout'
import Container from '../layout/Container'
import Navigation from '../modules/Navigation'
import { isSmallScreen } from '../utils'
import { useMachine } from '../../hooks'
import toggleMachine from '../../machines/toggle'
import Snapshot from '../stores/snapshot'
import { Icon } from '../components'

import css from './index.scss'

const Page = ({ width: screenSize, classes, store }) => {
  const smallScreen = isSmallScreen(screenSize)

  const { steps } = Snapshot
  const [count, setCount] = useState(0)
  const [current, send] = useMachine(toggleMachine)

  const [activeStep, setActiveStep] = useState(0)
  const finish = activeStep === steps.length - 1

  function handleNext () {
    setActiveStep(prev => prev + 1)
  }

  function handleBack () {
    setActiveStep(prev => prev - 1)
  }

  function handleReset () {
    setActiveStep(0)
  }

  return (
    <Layout screenSize={screenSize} header={<Navigation />}>
      <Container style={{ flex: '1' }}>
        <div className={css.actions}>
          <Button
            onClick={() => setCount(count + 1)}
            variant='contained'
            color='secondary'
            className={classes.button}
          >
            <Icon name={'user'} /> {count}
          </Button>
          <Button
            onClick={() => send('TOGGLE')}
            variant='contained'
            color='primary'
            className={classes.button}
          >
            {current.value}
          </Button>
          <Button
            onClick={handleBack}
            variant='contained'
            disabled={activeStep === 0}
            className={classes.button}
          >
            Back
          </Button>
          <Button
            onClick={finish ? handleReset : handleNext}
            variant='contained'
            color={finish ? 'secondary' : 'primary'}
            className={classes.button}
          >
            {finish ? 'Finish' : 'Next'}
          </Button>
        </div>
        <Paper>
          <Stepper
            activeStep={activeStep}
            orientation={smallScreen ? 'vertical' : 'horizontal'}
            alternativeLabel={!smallScreen}
          >
            {steps.map(({ label, content }, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                {
                  smallScreen && <StepContent>{content}</StepContent>
                }
              </Step>
            ))}
          </Stepper>
        </Paper>
      </Container>
    </Layout>
  )
}

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 2
  },
  backButton: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  button: {
    marginRight: 8,
    minWidth: 100
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
})

export default withStyles(styles)(withTheme()(withWidth()(Page)))
