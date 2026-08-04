import Logo from './Logo';
import NavSearch from './NavSearch';
import LinksDropdown from './LinksDropdown';
import DarkMode from './DarkMode';

function Navbar() {
  return (
    <nav className='border-b'>
      <div className='container flex items-center justify-between py-4'>
        {/* Left */}
        <Logo />

        {/* Middle */}
        <div className='flex-1 flex justify-center'>
          <NavSearch />
        </div>

        {/* Right */}
        <div className='flex items-center gap-4'>
          <DarkMode />
          <LinksDropdown />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;