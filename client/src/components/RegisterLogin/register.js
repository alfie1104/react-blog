import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions/user_actions";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastname: "",
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
    };
  }

  displayErrors = (errors) => errors.map((error, i) => <p key={i}>{error}</p>);

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  submitForm = (e) => {
    e.preventDefault();
    const {
      lastname,
      name,
      email,
      password,
      passwordConfirmation,
    } = this.state;

    let dataToSubmit = {
      lastname,
      name,
      email,
      password,
    };

    if (this.isFormvalid(this.state)) {
      this.setState({
        errors: [],
      });
      this.props
        .dispatch(registerUser(dataToSubmit))
        .then((response) => {
          if (response.payload.success) {
            this.props.history.push("/login");
          } else {
            this.setState({
              errors: this.state.errors.concoat(
                "your attempt to send data to DB was failed"
              ),
            });
          }
        })
        .catch((error) => {
          this.setState({
            errors: this.state.errors.concat(error),
          });
        });
    } else {
      console.log("Form is not valid");
    }
  };

  isFormvalid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: "Fill in all fileds" };
      this.setState({ errors: errors.concat(error) });
    } else if (this.isPasswordValid(this.state)) {
      error = { message: "Password is invalid" };
      this.setState({ errors: errors.concat(error) });
    } else {
      return true;
    }
  };

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ lastname, name, email, password, passwordConfirmation }) => {
    return (
      !lastname.length ||
      !name.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  render() {
    return (
      <div className="container">
        <h2> Sign Up </h2>
        <div className="row">
          <form
            className="col s12"
            onSubmit={(event) => this.submitForm(event)}
          >
            <div className="row">
              <div className="input-field col s12">
                <input
                  type="text"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={(e) => this.handleChange(e)}
                  id="lastname"
                  className="validate"
                />
                <label className="active" htmlFor="lastname">
                  lastname
                </label>
                <span
                  className="helper-text"
                  data-error="Type a right type email"
                  data-success="right"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={(e) => this.handleChange(e)}
                  id="name"
                  className="validate"
                />
                <label className="active" htmlFor="name">
                  name
                </label>
                <span
                  className="helper-text"
                  data-error="Type a right type email"
                  data-success="right"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={(e) => this.handleChange(e)}
                  id="email"
                  className="validate"
                />
                <label className="active" htmlFor="email">
                  Email
                </label>
                <span
                  className="helper-text"
                  data-error="Type a right type email"
                  data-success="right"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={(e) => this.handleChange(e)}
                  id="password"
                  className="validate"
                />
                <label className="active" htmlFor="password">
                  Password
                </label>
                <span
                  className="helper-text"
                  data-error="wrong"
                  data-success="right"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  type="password"
                  name="passwordConfirmation"
                  value={this.state.passwordConfirmation}
                  onChange={(e) => this.handleChange(e)}
                  id="passwordConfirmation"
                  className="validate"
                />
                <label className="active" htmlFor="passwordConfirmation">
                  Password Confirmation
                </label>
                <span
                  className="helper-text"
                  data-error="wrong"
                  data-success="right"
                />
              </div>
            </div>
            {this.state.errors.length > 0 && (
              <div>{this.displayErrors(this.state.errors)}</div>
            )}
            <div className="row">
              <div className="col s12">
                <button
                  className="btn waves-effect red lighten=2"
                  type="submit"
                  name="action"
                  onClick={this.submitForm}
                >
                  Create an account
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(Register);
