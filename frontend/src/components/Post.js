import React, {useEffect, useState, useRef} from 'react';
import {useHistory} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';


const Post = () => {
  const {currentUser} = useAuth();
  const history = useHistory();
  const priceRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const imageOneRef = useRef();
  const imageTwoRef = useRef();
  const imageThreeRef = useRef();
  const imageFourRef = useRef();
  const imageFiveRef = useRef();
  const [stage, setStage] = useState(0);
  const [error, setError] = useState();
  const [category, setCategory] = useState('vehicles');
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [description, setDescription] = useState();
  // const [specificAttribute, setSpecificAttribute] = useState();

  useEffect(() => {
    // this way a user can't make a post
    // if they do not log in
    if (!currentUser) {
      history.push('/login');
    }
  });

  useEffect(() => {
    // this will ask for the users location apon loading the page
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLongitude(position.coords.longitude);
        setLatitude(position.coords.latitude);
      });
    } else {
      setLongitude(0.0);
      setLatitude(0.0);
    }
  }, []);

  const validatePriceAndTitle = () => {
    if (isNaN(priceRef.current.value) ||
        priceRef.current.value.length === 0) {
      setError('price');
      return;
    }
    if (titleRef.current.value.length === 0) {
      setError('title');
      return;
    }
    setError('');
    setTitle(titleRef.current.value);
    setPrice(priceRef.current.value);
    setStage(stage+1);
  };

  const validateDescription = () => {
    setError('');
    if (descriptionRef.current.value.length > 512) {
      setError('description');
      return;
    }
    setDescription(descriptionRef.current.value);
    setStage(stage + 1);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const images = [
      imageOneRef,
      imageTwoRef,
      imageThreeRef,
      imageFourRef,
      imageFiveRef,
    ]
      .map((ref) => ref.current.value);
    const response = await fetch(`/v0/listings/${category}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude,
        longitude,
        title,
        description,
        price: Number(price),
        images,
      }),
    });
    if (!response.ok) {
      setError('post');
    } else {
      history.push('/');
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        color: '#5393ff',
        fontFamily:
                'system-ui, applesystem, BlinkMacSystemFont, sans - serif',
      }}>
      <Typography
        fontWeight="bold"
        color="#5393ff"
        variant="h3"
        noWrap
        component="div"
        sx={{marginTop: '10px'}}
      >
        Create a listing
      </Typography>
      <Paper
        elevation={3}
        sx={{
          height: '400px',
          width: '350px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          borderRadius: '15px',
        }}>
        {stage === 0 &&
            <>
              <Typography
                variant="subtitle1"
                component="div"
              >
                <strong>
                  Choose a category to sell to
                </strong>
              </Typography>
              <form>
                <label>listing category</label>
                <select
                  data-testid="selector"
                  onChange={(e) => {
                    e.preventDefault();
                    setCategory(e.target.value);
                    console.log(e.target.value);
                  }} value={'vehicles'}>
                  <option value={'vehicles'}>vehicles</option>
                  <option value={'instruments'}>instruments</option>
                  <option value={'technology'}>technology</option>
                </select>
              </form>
              <Button
                variant="contained"
                onClick={() => setStage(stage+1)}
              >
                  Next
              </Button>
            </>
        }
        {stage === 1 &&
            <>
              <Typography
                variant="subtitle1"
                component="div">
                <strong>
                        Choose a title and price.
                </strong>
              </Typography>
              <TextField
                inputProps={{'data-testid': 'title-input'}}
                error={error==='title'}
                inputRef={titleRef}
                id="outlined-basic"
                label="title"
                variant="outlined"
                sx={{width: '80%'}}
              />
              <FormControl sx={{width: '80%'}}>
                <InputLabel
                  htmlFor="outlined-adornment-amount">
                        Price
                </InputLabel>
                <OutlinedInput
                  inputProps={{'data-testid': 'price-input'}}
                  error={error === 'price'}
                  id="outlined-adornment-amount"
                  inputRef={priceRef}
                  startAdornment={
                    <InputAdornment
                      position="start">
                              $
                    </InputAdornment>}
                  label="Amount"
                  helpertext={error === 'price' ? 'Invalid price' : undefined}
                />
              </FormControl>
              <Button
                variant="contained"
                onClick={validatePriceAndTitle}
              >
                    Next
              </Button>
            </>
        }
        {stage === 2 &&
          <>
            <Typography
              variant="subtitle1"
              component="div"
            >
              <strong>
                Add a description. (512 character max)
              </strong>
            </Typography>
            <TextField
              inputProps={{'data-testid': 'description-input'}}
              inputRef={descriptionRef}
              error={error === 'description'}
              id="filled-multiline-static"
              label="Description"
              multiline
              rows={4}
              variant="filled"
              sx={{width: '80%'}}
              helpertext={error === 'description' ?
                `Over character limit` :
                undefined}
            />
            <Button
              variant="contained"
              onClick={validateDescription}
            >
              Next
            </Button>
          </>
        }
        {stage === 3 &&
          <>
            <Typography
              variant="subtitle1"
              component="div"
            >
              <strong>
                Add image up to 5 image URLs
              </strong>
            </Typography>
            {error === 'post' &&
            <div>
              An error occured creating your listing,
              please refresh the page and try again
            </div>}
            <TextField
              inputRef={imageOneRef}
              id="outlined-basic"
              label="First Image"
              variant="outlined"
              sx={{width: '80%'}}
            />
            <TextField
              inputRef={imageTwoRef}
              id="outlined-basic"
              label="Second Image"
              variant="outlined"
              sx={{width: '80%'}}
            />
            <TextField
              inputRef={imageThreeRef}
              id="outlined-basic"
              label="Third Image"
              variant="outlined"
              sx={{width: '80%'}}
            />
            <TextField
              inputRef={imageFourRef}
              id="outlined-basic"
              label="Fourth Image"
              variant="outlined"
              sx={{width: '80%'}}
            />
            <TextField
              inputRef={imageFiveRef}
              id="outlined-basic"
              label="Fifth Image"
              variant="outlined"
              sx={{width: '80%'}}
            />
            <Button
              variant="contained"
              onClick={handleCreate}
            >
              Create!
            </Button>
          </>
        }
      </Paper>
    </Container>
  );
};

export default Post;
