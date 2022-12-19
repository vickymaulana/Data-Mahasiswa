import React from 'react';

const LoginModal = (props) => {
  return (
    // Use the isModalOpen prop to determine whether the modal should be displayed or not
    props.isModalOpen ? (
      <div>
        {/* Add a close button and use the handleModalToggle prop to close the modal when clicked */}
        <button onClick={props.handleModalToggle}>Close</button>
        <form>
          <input type="text" name="username" />
          <input type="password" name="password" />
          <button type="submit">Login</button>
        </form>
      </div>
    ) : null
  );
}

export default LoginModal;
