import { Form } from "react-bootstrap";
import { SectionType } from "../types.d";
import React from "react";

interface Props {
  type: SectionType
  loading?: boolean
  value: string
  onChange: (value: string) => void
}

const commonStyles = { height: '150px' }

const getPlaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
  if (type === SectionType.From) return 'Enter text'
  if (loading) return 'Translating...'
  return 'Translation'
}

export function TextArea({ type, loading, value, onChange }: Props) {
  const styles = type === SectionType.From
    ? commonStyles
    : { ...commonStyles, backgroundColor: '#f5f5f5', border: 'none', resize: 'none' }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <Form.Control
      autoFocus={type === SectionType.From}
      as="textarea"
      placeholder={getPlaceholder({ type, loading })}
      style={styles}
      value={value}
      onChange={handleChange}
      disabled={type === SectionType.To}
    />
  )
}
