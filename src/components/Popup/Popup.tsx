import { ReactNode } from 'react';
import './Popup.scss';
import { IconButton } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface PopupProps {
  children: ReactNode;
  popup: React.Dispatch<React.SetStateAction<boolean>>;
}

const Popup: React.FC<PopupProps> = ({ children, popup }) => {
  return (
    <div className="popup-container">
      <IconButton onClick={() => popup(false)} className="close-icon">
        <HighlightOffIcon sx={{ color: 'white' }} />
      </IconButton>
      {children}
    </div>
  );
};

export default Popup;
