import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field } from 'redux-form';
import { contactUs } from '../redux/actions/contactActions';
import { contactusForm } from '../constants/formFields';
import ContactFormTemplate from '../components/contact/ContactFormTemplate';
import ContactPageTemplate from '../components/contact/ContactPageTemplate'
import Alert from '../components/utils/Alert';
import styled from 'styled-components';
import FormInput from '../components/utils/FormInput';

class ContactPage extends Component {
  // RENDER FormInput.jsx
  renderInput = props => <FormInput {...props} white />

  // FORM ONSUBMIT HANDLER
  onSubmit = formValues => {
    this.props.contactUs(formValues);
  };

  // FORM FIELDS
  renderInputFields =
    contactusForm.map(contact => (
      <Field
        key={contact.name}
        name={contact.name}
        label={contact.label}
        type={contact.type}
        component={this.renderInput}
        placeholder={contact.placeholder}
      />
    ));

  // ALERT
  alertMessage = () => {
    if (this.props.alert) {
      return <Alert message='Incorrect email or password' />
    }
  }

  // FORTGOT PASSWORD LINK
  goHome = () => (
    <ForgotPwd>
      <Link to='/'>Go Back to Home</Link>
    </ForgotPwd>
  )

  render() {
    return (
      <ContactPageTemplate auth>
        <ContactFormTemplate
          fields={this.renderInputFields}
          title='Hello, Please Provide your information!'
          onSubmit={this.onSubmit}
          alert={this.alertMessage()}
          forgotpass={this.goHome()}
          // linkto='/signup'
          button1='Send'
          // auth
          // white
        />
      </ContactPageTemplate>
    )
  }
}

const ForgotPwd = styled.div`
  text-align: right;

  a {
    color: #0000EE;
    font-size: 0.9rem;
  }
`

const mapStateToProps = state => {
  return { alert: state.alert[0] }
}

export default connect(mapStateToProps, { contactUs })(ContactPage);