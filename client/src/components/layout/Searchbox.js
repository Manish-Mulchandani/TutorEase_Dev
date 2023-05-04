import React, {useState} from 'react'

const Searchbox = ({history}) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <form class='form search' onSubmit={submitHandler}>
      <div class='form-group'>
        <select
          type='text'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          className='mr-sm-2 ml-sm-5'
        >
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
      <input type='submit' className='btn btn-primary my-1' />
    </form>
  );
}

export default Searchbox
