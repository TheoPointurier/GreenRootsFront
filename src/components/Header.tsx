import logo from '../assets/Logos/Logo_principal.webp';

function Header () {
  return (
    <header className="flex items-center justify-between gap-2 p-4 shadow">
      <img src={logo} alt="logo" className="w-10 h-10 md:w-14 md:h-14" />
      <div>
        <h1>APERCU HEADER</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur esse molestias rem! Deserunt placeat aspernatur sapiente maiores voluptatibus natus consectetur recusandae voluptas culpa corrupti accusantium, necessitatibus non quisquam perferendis at!</p>
      </div>
    </header>
  );
}

export default Header;