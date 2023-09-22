import { AlignRight, Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '/swift-cart-logo.svg';

const navLinks = [
  {
    name: 'About',
    path: '/about',
  },
  {
    name: 'Login',
    path: '/login',
  },
  {
    name: 'Sign Up',
    path: '/sign-up',
  },
];

export default function Header() {
  const [open, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const handleClickOutside = (e: Event) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <header className="container bg-slate-200 w-full flex justify-between items-center h-20 z-20">
      <div>
        <Link to="/" className="flex gap-2 items-center">
          <img src={logo} alt="swift cart logo" className="h-16 w-16" />
          <span className="text-xl font-bold text-amber-800">Swift Cart</span>
        </Link>
      </div>
      <form className="flex rounded-md group">
        <input
          type="text"
          placeholder="Search Swift Cart"
          className="px-3 py-2 bg-slate-100 rounded-l-md border-l-2 border-y-2 border-amber-600 focus:outline-none"
        />
        <button type="submit" className="bg-orange-950 text-amber-600 rounded-r-md px-3 py-2">
          <Search />
        </button>
      </form>
      <nav>
        <ul className="hidden sm:flex items-center gap-3 font-medium">
          {navLinks.map(({ name, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `${isActive && 'text-amber-700'} px-3 py-2 rounded-lg hover:bg-amber-900 hover:text-slate-200 `
                }
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex sm:hidden">
          <button className="text-orange-950" onClick={() => setIsOpen(!open)}>
            {open ? <X /> : <AlignRight />}
          </button>
          <ul
            ref={menuRef}
            className={`${
              open ? 'flex flex-col' : 'hidden'
            } absolute top-20 right-0 p-1 bg-gradient-to-b from-amber-700 to-amber-500 rounded-lg mr-4 min-w-[120px]`}
          >
            {navLinks.map(({ name, path }) => (
              <li key={path} className="">
                <NavLink
                  to={path}
                  className={`block pl-4 py-1 font-medium rounded-md hover:bg-amber-950 hover:text-slate-200`}
                  onClick={() => setIsOpen(false)}
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
