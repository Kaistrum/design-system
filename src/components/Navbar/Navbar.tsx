import { useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NavDropdownLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href?: string;
  dropdown?: NavDropdownLink[];
}

export interface NavbarProps {
  logo: ReactNode;
  items: NavItem[];
  cta?: { label: string; href: string };
  /** Rendered to the right of the CTA — typically a <ThemeToggle />. */
  actions?: ReactNode;
  className?: string;
}

export function Navbar({ logo, items, cta, actions, className }: NavbarProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveItem(label);
  };
  const closeMenu = () => {
    timeoutRef.current = setTimeout(() => setActiveItem(null), 100);
  };
  const keepMenu = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const activeDropdown = items.find((i) => i.label === activeItem)?.dropdown;

  return (
    <header className={cn('fixed top-0 left-0 right-0 z-50', className)}>
      <div
        className="relative flex items-center px-4 md:px-8 h-14 bg-nav-bg border-b border-border"
        style={{ backdropFilter: 'blur(18px)' }}>
        <div className="flex-shrink-0 mr-10">{logo}</div>

        <nav className="hidden md:flex items-center h-full absolute left-1/2 -translate-x-1/2" aria-label="Main navigation">
          {items.map((item) => {
            const hasDropdown = !!item.dropdown?.length;
            const isActive = hasDropdown && activeItem === item.label;

            return (
              <div
                key={item.label}
                className="relative h-full flex items-center"
                onMouseEnter={() => hasDropdown && openMenu(item.label)}
                onMouseLeave={() => hasDropdown && closeMenu()}>
                {hasDropdown ? (
                  <button
                    type="button"
                    className={cn(
                      'flex items-center gap-1 px-4 text-sm font-medium h-full border-b-2 transition-colors duration-150',
                      isActive ? 'text-accent border-accent' : 'text-text-dim border-transparent',
                    )}>
                    {item.label}
                    <ChevronDown size={13} className={cn('transition-transform duration-200', isActive && 'rotate-180')} />
                  </button>
                ) : (
                  <a href={item.href} className="flex items-center gap-1 px-4 text-sm font-medium text-text-dim hover:text-text transition-colors duration-150">
                    {item.label}
                  </a>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 ml-auto">
          {actions}
          {cta && (
            <a
              href={cta.href}
              className="hidden md:inline-flex group items-center gap-1.5 pl-4 pr-1.5 py-1.5 font-medium text-xs bg-accent text-text-on-accent transition-all duration-200 hover:gap-2.5">
              {cta.label}
              <span className="w-6 h-6 flex items-center justify-center bg-bg text-accent transition-transform duration-200 group-hover:scale-110 shrink-0">
                <ArrowRight size={11} />
              </span>
            </a>
          )}
          <button
            type="button"
            className="md:hidden flex items-center gap-2 text-sm text-text-dim"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}>
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {activeDropdown && (
          <motion.div
            className="w-full border-b border-border bg-drop-bg"
            onMouseEnter={keepMenu}
            onMouseLeave={closeMenu}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}>
            <div className="max-w-7xl mx-auto px-8 py-8 grid gap-2">
              {activeDropdown.map((link) => (
                <a key={link.label} href={link.href} className="group block py-2">
                  <span className="font-medium text-sm block text-text group-hover:text-accent transition-colors duration-150">
                    {link.label}
                  </span>
                  {link.description && <span className="text-xs block mt-0.5 text-text-muted">{link.description}</span>}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden border-b border-border bg-drop-bg overflow-y-auto max-h-[80vh]"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}>
            <ul className="flex flex-col py-2">
              {items.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href ?? '#'}
                    className="block px-5 py-3.5 text-sm font-medium text-text-dim border-b border-border-subtle"
                    onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            {cta && (
              <div className="px-4 py-4">
                <a
                  href={cta.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 py-2.5 font-medium text-sm bg-accent text-text-on-accent">
                  {cta.label}
                  <ArrowRight size={14} />
                </a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
