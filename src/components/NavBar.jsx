import Logo from "./../assets/logo-no-background.png";

function NavBar() {
  return (
    <div className="bg-foreground p-5">
        <img src={Logo} alt="logo" className="w-40"></img>
    </div>
  );
}

export default NavBar;
