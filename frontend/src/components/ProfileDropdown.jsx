import React, { useEffect, useRef } from 'react';

function ProfileDropdown({ name, image, id, handleDelete, open, setOpen }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setOpen]);

  return (
    <div className="menu-container" ref={menuRef}>
      <div className="menu-trigger" onClick={() => setOpen(!open)}>
        <img src={`http://localhost:8081/uploads/${image}`} alt="Profile" className="profile-link-image" />
      </div>

      {open && (
        <div className="dropdown-menu">
          <h3>{name}<br /><span>Website Designer</span></h3>
          <ul>
            <DropdownItem text="Profile" link={`/profile/${id}`} />
            <DropdownItem text="Logout" onClick={handleDelete} />
          </ul>
        </div>
      )}
    </div>
  );
}

function DropdownItem({ text, link, onClick }) {
  return (
    <li className="dropdownItem">
      {link ? (
        <a href={link}>{text}</a>
      ) : (
        <button onClick={onClick}>{text}</button>
      )}
    </li>
  );
}

export default ProfileDropdown;
