
import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import FileBase from 'react-file-base64';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile, deleteAccount } from '../../actions/profile';
import Education from '../dashboard/Education'

const EditProfile = ({
  profile: { profile, loading },
  auth: { user },
  createProfile,
  getCurrentProfile,
  deleteAccount,
  history,
}) => {
  const [formData, setFormData] = useState({
    price: '',
    location: '',
    status: '',
    skills: '',
    bio: '',
    phone: '',
    email:'',
    image:''
  });

  const [displayContactlInputs, toggleContactInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      location: loading || !profile.location ? '' : profile.location,
      skills: loading || !profile.skills ? '' : profile.skills,
      price: loading || !profile.price ? '' : profile.price,
      bio: loading || !profile.bio ? '' : profile.bio,
      phone: loading || !profile.info ? '' : profile.info.phone,
      email: loading || !profile.info ? '' : profile.info.email,
      image: loading || !profile.image ? '' : profile.image,
    });
  }, [loading, getCurrentProfile]);

  const { price, location, skills, bio, phone, email, image } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSumbit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };
  return (
    <Fragment>
      <h1 className='large text-primary text-center'>Edit Profile</h1>
      <p className='text-center lead'>
        <i className='fas fa-user' /> Welcome {user && user.name}
      </p>

      <div className='text-center'>
        {' '}
        <img
          class='round-img avatar-img my-1'
          src={!image ? profile.user.avatar : image}
          alt='profile-image'
        />
      </div>

      <form className='form' onSubmit={(e) => onSumbit(e)}>
        <div className='form-group my-2'>
          <label className='form-text text-center'>
            Edit profile image:{'  '}
            <FileBase
              id='image'
              type='file'
              multiple={false}
              onDone={({ base64 }) =>
                setFormData({ ...formData, image: base64 })
              }
            />
          </label>
        </div>
        
        

        <div className='form-group'>
          
          <div className='form-group'>
            <div className='form-text'>
              * What subject you want to teach
            </div>
            <select name='skills' value={skills} onChange={(e) => onChange(e)}>
            <option value='0' className='text-dark'>
            Select Subject
          </option>
          <option value='Web Development'>Web Development</option>
          <option value='App Development'>App Development</option>
          <option value='Mathematics'>Mathematics</option>
          <option value='Physics'>Physics</option>
          <option value='Chemistry'>Chemistry</option>
          <option value='English'>English</option>
          <option value='Data Structures and Algo'>
          Data Structures and Algo
          </option>
          <option value='JAVA'>JAVA</option>
          <option value='Other'>Other</option>
            </select>
          </div>

          <div className='form-group'>
            <div className='form-text'>*Price you wanna ask (₹ per hour).</div>
            <input
              type='text'
              name='price'
              value={price}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className='form-group'>
            <div className='form-text'>*City (eg. Indore, Delhi, Mumbai etc)</div>
            <input
              type='text'
              name='location'
              value={location}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className='form-group'>
            <div className='form-text'>
              A brief description about you
            </div>
            <textarea
              name='bio'
              value={bio}
              cols='30'
              rows='5'
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className='my-2'>
            <button
              onClick={() => toggleContactInputs(!displayContactlInputs)}
              type='button'
              className='btn btn-light'
            >
              <i className='fas fa-pen text-primary' /> Edit Contact Details
            </button>
          </div>

          {displayContactlInputs && (
            <Fragment>
              <div className='form-group contact-input'>
                <i className='fas fa-phone fa-2x' />
                <input
                  type='text'
                  placeholder='Phone Number'
                  name='phone'
                  value={phone}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className='form-group contact-input'>
                <i className='far fa-envelope fa-2x' />
                <input
                  type='text'
                  placeholder='Email ID'
                  name='email'
                  value={email}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </Fragment>
          )}

          <div className='form-group'>
            <Link to='/add-education' className='btn btn-light'>
              <i className='fas fa-graduation-cap text-primary' /> Add Training
            </Link>
          </div>

          <Education education={profile.education} />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
      </form>

      <p className='small'>* = required field</p>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile, deleteAccount })(
  withRouter(EditProfile)
);
