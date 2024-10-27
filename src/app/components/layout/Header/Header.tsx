import ModeToggle from "@/app/components/layout/Header/ModeToggle";
import Navigation from "@/app/components/layout/Header/Navigation";

const Header = () => {
  return (
    <header id="header" className="header flex justify-between">
      <Navigation />
      <ModeToggle />
    </header>
  );
};

export default Header;
