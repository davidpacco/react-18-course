import { Link } from "../Link"

const i18n = {
  es: {
    title: 'Acerca de',
    description: 'Vista previa de Acerca de',
    link: 'Ir al Home'
  },
  en: {
    title: 'About',
    description: 'About preview',
    link: 'Go to Home'
  }
}

const useI18n = lang => {
  return i18n[lang] || i18n.en
}

export default function About({ params }) {
  const i18n = useI18n(params.lang)
  return (
    <>
      <h1>{i18n.title}</h1>
      <p>{i18n.description}</p>
      <Link to='/'>{i18n.link}</Link>
    </>
  )
}