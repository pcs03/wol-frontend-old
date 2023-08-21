import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';

interface DeviceAddProps {
  onAdd: () => void;
}

const DeviceAdd: React.FC<DeviceAddProps> = ({ onAdd }) => {
  return (
    <div className="device-add">
      <IconButton onClick={onAdd}>
        <AddIcon sx={{ color: 'white', fontSize: '2rem' }} />
      </IconButton>
    </div>
  );
};

export default DeviceAdd;
