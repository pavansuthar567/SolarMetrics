import { Link } from 'react-router-dom';
// import { ReactComponent as LogoDark } from 'src/assets/images/logos/dark-logo.svg';
import { styled } from '@mui/material';
import img1 from 'src/assets/images/backgrounds/dark-logo.png';

const LinkStyled = styled(Link)(() => ({
  height: '70px',
  width: '220px',
  overflow: 'hidden',
  display: 'block',
}));

const Logo = () => {
  return (
    <LinkStyled to="/">
      {/* <LogoDark height={70} /> */}
      <img src={img1} alt="dasd" width={220} height={70} />
    </LinkStyled>
  );
};

export default Logo;
