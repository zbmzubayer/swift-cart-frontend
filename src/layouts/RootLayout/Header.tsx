import { AccountDropdown } from '@/components/Dropdowns/AccountDropdown';
import { rootNavLinks } from '@/constants/navigation';
import { useAppSelector } from '@/redux/hook';
import { AlignRight, Search, ShoppingCart, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '/swift-cart-logo.svg';

export default function Header() {
  // Toggle mobile menu
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

  const { user } = useAppSelector(state => state.auth);
  const { products } = useAppSelector(state => state.cart);

  return (
    <header className="flex items-center bg-slate-900 w-full h-20 z-20 sticky top-0">
      <div className="container flex justify-between items-center">
        <div>
          <Link to="/" className="flex gap-2 items-center">
            <img src={logo} alt="swift cart logo" className="h-16 w-16" />
            <span className="text-xl font-bold text-amber-700">Swift Cart</span>
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
        <nav className="flex items-center gap-3">
          <ul className="hidden sm:flex items-center gap-1 font-medium">
            {rootNavLinks.map(({ name, path }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `${
                      isActive ? 'text-amber-700' : 'text-white'
                    } px-4 py-2 rounded-full transition-all hover:bg-amber-900 hover:text-slate-200`
                  }
                >
                  {name}
                </NavLink>
              </li>
            ))}
            {!user && (
              <div className="px-3 py-2 flex items-center gap-2 bg-slate-300 rounded-lg">
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) => `${isActive && 'text-amber-700'} rounded-lg hover:text-amber-700`}
                  >
                    Login
                  </NavLink>
                </li>
                <span>|</span>
                <li>
                  <NavLink
                    to="/sign-up"
                    className={({ isActive }) => `${isActive && 'text-amber-700'} rounded-lg hover:text-amber-700`}
                  >
                    Sign Up
                  </NavLink>
                </li>
              </div>
            )}
          </ul>
          {user && <AccountDropdown path="/login" />}
          <Link to="/cart" className="relative rounded-xl text-amber-700 hover:text-amber-900">
            <ShoppingCart className="w-8 h-8" />
            <span className="sr-only">Shopping cart</span>
            <span
              className={`absolute -top-3 left-3 px-1 bg-slate-300 text-xs font-semibold rounded-full ${
                products.length && 'animate-bounce'
              }`}
            >
              {products.length}
            </span>
          </Link>
          <div className="flex sm:hidden">
            <button className="text-orange-900" onClick={() => setIsOpen(!open)}>
              {open ? <X /> : <AlignRight />}
            </button>
            <ul
              ref={menuRef}
              className={`${
                open ? 'flex flex-col' : 'hidden'
              } absolute top-20 right-0 p-1 bg-gradient-to-b from-amber-700 to-amber-500 rounded-lg mr-4 min-w-[120px]`}
            >
              {rootNavLinks.map(({ name, path }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    className={`block pl-4 py-1 font-medium rounded-md hover:bg-amber-950 hover:text-slate-200`}
                    onClick={() => setIsOpen(false)}
                  >
                    {name}
                  </NavLink>
                </li>
              ))}
              {!user && (
                <div className="px-3 py-2 flex items-center gap-2 bg-slate-300 rounded-lg">
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) => `${isActive && 'text-amber-700'} rounded-lg hover:text-amber-700`}
                    >
                      Login
                    </NavLink>
                  </li>
                  <span>|</span>
                  <li>
                    <NavLink
                      to="/sign-up"
                      className={({ isActive }) => `${isActive && 'text-amber-700'} rounded-lg hover:text-amber-700`}
                    >
                      Sign Up
                    </NavLink>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
