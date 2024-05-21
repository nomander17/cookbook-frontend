import Logo from "./../assets/logo-no-background.png";

function NavBar() {

  return (
    <div className="bg-foreground p-5 flex justify-between items-center">
      <img src={Logo} alt="Company Logo" className="w-40" />
    </div>
  );
}

export default NavBar;
