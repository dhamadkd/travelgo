import axios from 'axios';
import { CONTACT_SUCCESS } from '../type/types';
import history from '../../history';


// CREATE TOUR
export const contactUs = (formValues) => async (dispatch) => {
  try {
  //   let formData = new FormData();
  // alert('formValues: ' + JSON.stringify(formValues));
  //   if (formValues.name) formData.append('name', formValues.name);
  //   if (formValues.phone) formData.append('phone', formValues.phone);
  //   if (formValues.email) formData.append('email', formValues.email);


    // for (var pair of formData.entries()) {
    //   console.log('frontend', pair[0] + ' - ' + pair[1]);
    // }

    alert('Thank you. We have received your contact information. We will connect soon.');
    const response = await axios.post('/api/v1/contact', formValues);

    dispatch({ type: CONTACT_SUCCESS, payload: response.data });
  
    //FIXME: BUG ALERT !!! PAGE RELOADS AFTER DISPATCH - code does not run after line 43. Problem in tourController?
    history.push('/');
    // const navigate = useNavigate();
    // navigate('/');

  } catch (err) {
    console.log(err)
  }
}


