import { FC, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles'; // Import makeStyles for custom styles

import { PassOrderStatus } from 'src/models/pass_request';

const routes = [
  { value: 'route1', label: 'Route 1' },
  { value: 'route2', label: 'Route 2' },
  { value: 'route3', label: 'Route 3' }
];

interface ApprovalDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (status: PassOrderStatus, route: string, details: string) => void;
}

const useStyles = makeStyles({
  textArea: {
    width: '100%',
    padding: '8px 12px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginTop: '10px',
    resize: 'vertical' // Allow vertical resizing
  }
});

const ApprovalDialog: FC<ApprovalDialogProps> = ({ open, onClose, onSave }) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState<string>('');
  const [details, setDetails] = useState<string>('');
  const [selectedRoute, setSelectedRoute] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleDetailsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDetails(event.target.value);
  };

  const handleRouteChange = (event: SelectChangeEvent<string>) => {
    setSelectedRoute(event.target.value);
  };

  const handleApprove = () => {
    onSave('completed', selectedRoute, details);
  };

  const handleReject = () => {
    onSave('rejected', selectedRoute, details);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Approval Details</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="approval-details"
          label="Bus Pass ID"
          type="text"
          fullWidth
          value={inputValue}
          onChange={handleInputChange}
        />
        <textarea
          className={classes.textArea} // Apply custom styles
          placeholder="REASON"
          rows={3} // Number of visible rows
          value={details}
          onChange={handleDetailsChange}
        />
        <Select
          value={selectedRoute}
          onChange={handleRouteChange}
          displayEmpty
          fullWidth
          style={{ marginTop: '10px' }}
        >
          <MenuItem value="" disabled>
            Select Route
          </MenuItem>
          {routes.map((route) => (
            <MenuItem key={route.value} value={route.value}>
              {route.label}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleApprove} color="primary">
          Approve
        </Button>
        <Button onClick={handleReject} color="primary">
          Reject
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApprovalDialog;
