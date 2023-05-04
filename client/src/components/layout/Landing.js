import React from 'react'
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import SearchBox from '../layout/Searchbox';

const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='large'>TutorEase</h1>
          <p className='lead'>
            Search the best Tutor's around you and online
          </p>
          <Route render={({ history }) => <SearchBox history={history} />} />
          {/*<div className='buttons'>
            <Link to='/profiles' className='btn btn-primary'>
              Buy Services
            </Link>
            <a href='/register' className='btn btn-light'>
              Sell Services
            </a>
            
          </div>
          */}
        </div>
      </div>
    </section>
  );
};

export default Landing
