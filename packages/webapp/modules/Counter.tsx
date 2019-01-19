import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Button } from '@blueprintjs/core'

import toggleMachine from '../../machines/toggle'
import { useMachine } from '../../hooks'

interface IStore {
  timestamp: number,
  setTimestamp: object
}

export interface ITimer {
  store: IStore
}

const Counter = (props: ITimer) => {
  const [count, setCount] = useState(0)
  const [current, toggle] = useMachine(toggleMachine)

  const { store: { timestamp, setTimestamp } } = props
  
  return (
    <div>
      <h3>Counter - {count}</h3>
      <Button
        intent='success'
        text='Update Counter'
        onClick={() => setCount(count + 1)}
      />
      <h3>Machine - {current.value}</h3>
      <Button
        intent={current.value === 'active' ? 'primary' : 'warning'}
        text='Toggle Machine'
        onClick={() => toggle('TOGGLE')}
      />
      <h3>Timer - {timestamp}</h3>
      <Button text='Update Timer' onClick={() => setTimestamp()} />
    </div>
  )
}

export default observer(Counter)
