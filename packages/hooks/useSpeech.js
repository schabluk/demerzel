import { useState, useEffect } from 'react'

/**
 * The Speach util is client-side-only.
 */
const Speech = process.browser ? require('../utils/speech').default : undefined

function useSpeech() {
  const [recording, setRecording] = useState(false)
  const [transcript, setTranscript] = useState({ match: '', error: null })

  useEffect(() => {
    if (recording) {
      Speech.start()
    } else {
      Speech.stop()
    }
  }, [recording])

  Speech.onresult = ({ results }) => {
    const [resultList] = results // Frist list from results.
    const [resultItem] = resultList // First item from result list.

    const { transcript } = resultItem

    setTranscript({ match: transcript, error: null })
  }

  Speech.onspeechend = () => {
    Speech.stop()
    setRecording(false)
  }

  Speech.onnomatch = e => setTranscript({ match: null, error: `I didn't recognise that` })
  Speech.onerror = ({ error }) => setTranscript({ match: null, error })

  return [recording, setRecording, transcript]
}

export default useSpeech
