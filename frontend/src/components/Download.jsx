import React, {useState, useEffect} from 'react'
import useLogout from '../hooks/useLogout'
import { useNavigate } from "react-router-dom"
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { Button, TextField, Alert, Grid, Container,Box, Typography } from '@mui/material'
import { axiosInstance } from '../axios' 

const Download = () => {
  const [user, setUser] = useState()
  const logout = useLogout()
  const navigate = useNavigate()
  const axiosPrivateInstance = useAxiosPrivate()
  const [urls, setUrls] = useState(null);
  const [downloadLinks, setDownloadLinks] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  // async function onLogout() {
  //   await logout()
  //   // navigate('/')
  // }

//   useEffect(() => {
//     async function getUser() {
//         const { data } = await axiosPrivateInstance.get('user/')
//         console.log(data.username)
//         setUser(data)
//     }

//     getUser()
// }, [])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try{
      const res = await axiosPrivateInstance.post(
        "download/",
        {
          urls
        },

      );
      setDownloadLinks(Object.values(res.data));
      setSubmitting(false);
      
    }
    catch (error){
      console.log(error)
      setSubmitting(false);

    }

  };

  const handleChange = (e) => {
    setUrls(e.target.value);
    console.log(urls)
  };


  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" component="h1" align="center">
          Download Files from URLs
        </Typography>
        <Box mt={4}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Enter URLs"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
            />
            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Downloading..." : "Download"}
              </Button>
            </Box>
          </form>
        </Box>
        <Box mt={4}>
          <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
          >
            {downloadLinks.length > 0 && (
              <Grid item xs={12}>
                <Alert variant="filled" severity="success">
                  Files are ready to download!
                </Alert>
              </Grid>
            )}
            {downloadLinks.map((link, index) => (
              <Grid item key={index}>
                <Button
                  href={link}
                  target="_blank"
                  variant="outlined"
                >
                  Download File {index + 1}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Download
