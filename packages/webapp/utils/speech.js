/**
 * Support both Chrome and Firefox.
 */

/* eslint-disable no-use-before-define, no-undef */
const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
const SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
/* eslint-enable no-use-before-define, no-undef */

/**
 * Define the grammar.
 */
const colors = ['blue', 'red', 'purple']
const grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

/**
 * Define a speech recogntion instance.
 */
const recognition = new SpeechRecognition()
const grammarList = new SpeechGrammarList()

// Importance of this grammar in relation to other grammars from the list.
const grammarWeight = 1

grammarList.addFromString(grammar, grammarWeight)
recognition.grammars = grammarList
// recognition.continuous = false;
recognition.lang = 'en-US'
recognition.interimResults = false
recognition.maxAlternatives = 1

export default recognition
