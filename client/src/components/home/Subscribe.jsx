import React from 'react'
import styled from 'styled-components'
import history from '../../history';

const handleClick = () => {
    history.push("/contact");
}

const Subscribe = () => {
  return (
    <SubscribeWrapper className='extra-margin'>
    <SubscribeContent>
      <SubscribeBody>
        <h2>Get in Touch</h2>
        <p>To plan your next trip, provide your details and we will connect with itenarary that suits you best</p>
      </SubscribeBody>
      <SubscribeInput>
        <form >
          {/* <input
            placeholder='Name'
            type='name'
          />
          <input
            placeholder='Phone Number'
            type='phone' required = 'true'
          />
          <input
            placeholder='Email'
            type='email'
          /> */}
          <button onClick={handleClick}>Contact Us</button>
        </form>
      </SubscribeInput>
    </SubscribeContent>
  </SubscribeWrapper>
  )
}

const SubscribeWrapper = styled.section`
  background-color: var(--accent-light);
  padding: 2rem 1rem;

  @media (min-width: 996px) {
    padding: 5rem;
  }
`

const SubscribeContent = styled.div`
  max-width: 1170px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  align-items: center;


  h2 {
    font-size: 1.7rem;
    margin-bottom: 2rem;
  }

  @media (min-width: 768px) {
    grid-gap: 3rem;
    padding: 0 1rem;
  }

  @media (min-width: 996px) {
    h2 {
      font-size: 2.5rem;
    }
  }
`

const SubscribeBody = styled.div`
  margin-bottom: 3rem;
`

const SubscribeInput = styled.div`
  display: flex;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  input {
    padding: 1rem;
    border: none;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }

  button {
    padding: 1rem;
    border: none;
    border-radius: 0.5rem;
    background-color: var(--accent-dark);
    color: #fff;
  }

  @media (min-width: 768px) {
    input {
      margin-bottom: 5;
      width: 15rem;
    }

    form {
      flex-direction: column;
      width: auto;
    }

    input {
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
    }

    button {
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
    }
  }
`

export default Subscribe