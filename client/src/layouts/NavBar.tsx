import { useNavigate } from 'react-router-dom';
import CardNav from './CardNav.tsx';

export default function NavBar() {
  const navigate = useNavigate()
  const items = [
    {
      label: "Home",
      bgColor: "#F5F3EF",
      textColor: "#3A4A3D",
      links: [
        { label: "Home", ariaLabel: "Go to Home", href: "/" },
      ]
    },
    {
      label: "Recipes",
      bgColor: "#E8E4DC",
      textColor: "#3A4A3D",
      links: [
        { label: "Generate", ariaLabel: "Go to Ingredients", href: "/ingredients" },
      ]
    },
    {
      label: "Explore",
      bgColor: "#E3ECE4",
      textColor: "#3A4A3D",
      links: [
        { label: "Explore", ariaLabel: "Go to Ingredients", href: "/explore" },
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
      onCtaClick={() => navigate('/login')}
    />
  )
}