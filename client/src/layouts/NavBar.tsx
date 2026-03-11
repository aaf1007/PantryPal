import { useNavigate } from 'react-router-dom'
import CardNav from './CardNav.tsx'

export default function NavBar() {
  const navigate = useNavigate()
  const items = [
    {
      label: "Home",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Home", ariaLabel: "Go to Home", href: "/" },
      ]
    },
    {
      label: "Recipes",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Ingredients", ariaLabel: "Go to Ingredients", href: "/ingredients" },
      ]
    },
  ];

  return (
    <CardNav
      title="PantryPal"
      items={items}
      baseColor="#fff"
      menuColor="#000"
      buttonBgColor="#111"
      buttonTextColor="#fff"
      ease="power3.out"
      theme="light"
      onCtaClick={() => navigate('/ingredients')}
    />
  )
}