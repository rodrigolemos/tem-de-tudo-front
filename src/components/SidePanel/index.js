import React, { useState } from 'react';
import { BsCloudFill } from 'react-icons/bs';
import { GiPencilBrush } from 'react-icons/gi';
import { Container, SideNav } from './styles';

const SidePanel = ({ children }) => {
  const [isShown, setShow] = useState('N');

  const toggleNav = () => {
    setShow(isShown === 'S' ? 'N' : 'S');
  };

  return (
    <Container>
      <div className="desktop">
        <GiPencilBrush className="bg-img" />
        {children}
      </div>
      <div className="mobile">
        <BsCloudFill className="icon-open" title="Menu" onClick={toggleNav} />
        <SideNav show={isShown}>
          <span
            role="button"
            tabIndex="-1"
            className="closebtn"
            onKeyPress={toggleNav}
            onClick={toggleNav}
          >
            &times;

          </span>
          {children}
        </SideNav>
      </div>
    </Container>
  );
};

export default SidePanel;
