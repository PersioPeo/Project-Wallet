import React from 'react';
import { connect } from 'react-redux';
import Cambio from './Cambio';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <section>
        <Cambio />
        <p data-testid="email-field">
          Email:
          {' '}
          {email}
        </p>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
