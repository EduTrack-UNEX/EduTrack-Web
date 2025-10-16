import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <>
      <nav className="navbar-container">
        <ul className="navbar-links">
          <li><a href="home">HOME</a></li>
          <li><a href="sobre">SOBRE</a></li>
          <li><a href="contato">CONTATO</a></li>
        </ul>
      </nav>
      <div className="wave-bottom"></div>
    </>
  );
};

export default Navbar;