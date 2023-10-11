import { AccountDropdown } from '@/components/Dropdowns/AccountDropdown';
import { ThemeToggle } from '@/components/ThemeToggle';
import { adminNavLinks } from '@/constants/navigation';
import { useAppSelector } from '@/redux/hook';
import { AlignRight, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '/swift-cart-logo.svg';

export default function AdminHeader() {
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

  return (
    <header className="flex items-center bg-background w-full h-20 z-20 sticky top-0">
      <div className="container flex justify-between items-center">
        <div>
          <Link to="/" className="flex gap-2 items-center">
            <img src={logo} alt="swift cart logo" className="h-16 w-16" />
            <span className="text-xl font-bold text-amber-800">Swift Cart</span>
          </Link>
        </div>
        <nav className="flex items-center gap-3">
          <ul className="hidden sm:flex items-center gap-3 font-medium">
            {user?.admin &&
              adminNavLinks.map(({ name, path }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `${isActive && 'text-amber-700'} px-3 py-2 rounded-md hover:bg-amber-900 hover:text-slate-200`
                    }
                  >
                    {name}
                  </NavLink>
                </li>
              ))}
            {user?.admin && <AccountDropdown path="/admin" profileLink="admin" />}
          </ul>
          <ThemeToggle />
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
              {adminNavLinks.map(({ name, path }) => (
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
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
