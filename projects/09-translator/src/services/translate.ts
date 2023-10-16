import { SUPPORTED_LANGUAGES } from '../consts'
import { FromLanguage, Language } from '../types.d'

import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

export async function translate({
  fromLanguage,
  toLanguage,
  text
}: {
  fromLanguage: FromLanguage,
  toLanguage: Language,
  text: string
}) {
  if (fromLanguage === toLanguage) return text
  const fromLang = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
  const toLang = SUPPORTED_LANGUAGES[toLanguage]

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'You are the best translator in the world. You receive a text from the user. Do not answer the text, just translate it. The original language is surrounded by `{{` and `}}`. You can also receive {{auto}} which means that you have to detect the language. The language you translate to is surrounded by `[[` and `]]`. '
      },
      {
        role: 'user',
        content: 'Hola mundo {{Spanish}} [[English]]'
      },
      {
        role: 'assistant',
        content: 'Hello world'
      },
      {
        role: 'user',
        content: 'How are you? {{auto}} [[Spanish]]'
      },
      {
        role: 'assistant',
        content: '¿Cómo estás?'
      },
      {
        role: 'user',
        content: `${text} {{${fromLang}}} [[${toLang}]]`
      }
    ],
    model: 'gpt-3.5-turbo'
  })

  console.log(completion)

  return completion.choices[0].message.content
}