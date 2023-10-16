import { useStore } from './hooks/useStore';
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { AUTO_LANGUAGE } from './consts';
import { ClipboardIcon, ListenIcon, SwapIcon } from './components/Icons';
import { LanguageDroplist } from './components/LanguageDroplist';
import { SectionType } from './types.d';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'
import { TextArea } from './components/TextArea';
import { useEffect } from 'react';
import { translate } from './services/translate';
import { useDebounce } from './hooks/useDebounce';

function App() {
  const {
    fromLanguage,
    toLanguage,
    originalText,
    translatedText,
    loading,
    swapLanguages,
    setFromLanguage,
    setToLanguage,
    setOriginalText,
    setTranslatedText
  } = useStore()

  const debouncedOriginalText = useDebounce(originalText, 500)

  useEffect(() => {
    if (debouncedOriginalText === '') return

    translate({ fromLanguage, toLanguage, text: debouncedOriginalText })
      .then(result => {
        if (result == null) return
        setTranslatedText(result)
      })
      .catch(() => setTranslatedText('Error translating text'))
  }, [fromLanguage, toLanguage, debouncedOriginalText])

  const handleClipboard = () => {
    navigator.clipboard.writeText(translatedText)
  }

  const handleListen = () => {
    const utterance = new SpeechSynthesisUtterance(translatedText)
    utterance.lang = toLanguage
    speechSynthesis.speak(utterance)
  }

  return (
    <Container fluid>
      <h2>Translate</h2>
      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageDroplist
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage}
            />
            <TextArea
              type={SectionType.From}
              value={originalText}
              onChange={setOriginalText}
            />
          </Stack>
        </Col>

        <Col xs="auto">
          <Button
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={swapLanguages}
            variant='link'
          >
            <SwapIcon />
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>
            <LanguageDroplist
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage}
            />
            <div style={{ position: 'relative' }}>
              <TextArea
                type={SectionType.To}
                value={translatedText}
                loading={loading}
                onChange={setTranslatedText}
              />
              <div style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex' }}>
                <Button
                  variant='link'
                  onClick={handleClipboard}
                >
                  <ClipboardIcon />
                </Button>
                <Button
                  variant='link'
                  onClick={handleListen}
                >
                  <ListenIcon />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
