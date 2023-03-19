import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Box } from '@mui/material';

function Navbar() {

  return (
    <div >
      <AppBar position="static" sx={{ backgroundColor:"black", flexGrow:1}}>
        <Toolbar>
            <Box  sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                <Typography variant="h6" 
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                
                <RouterLink to="/" >
                <CloudDownloadIcon /> Download App
                </RouterLink>
            </Typography>
            </Box>
          <Button color="inherit">
            <RouterLink to="/register" >
              Sign Up
            </RouterLink>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
