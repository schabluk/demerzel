import { useState, useMemo, useEffect } from 'react'
import { interpret } from 'xstate/lib/interpreter'

export default function useMachine (machine) {
  // Keep track of the current machine state
  const [current, setCurrent] = useState(machine.initialState)

  // Start the service (only once!)
  const service = useMemo(
    () =>
      interpret(machine)
        .onTransition(state => setCurrent(state))
        .start(),
    []
  )

  // Stop the service when the component unmounts
  useEffect(() => () => service.stop(), [])

  return [current, service.send]
}
