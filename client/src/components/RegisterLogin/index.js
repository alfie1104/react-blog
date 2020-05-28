import React, { Component } from "react";
import { connect } from "react-redux";

class RegisterLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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
    const { email, password } = this.state;

    let dataToSubmit = {
      email,
      password,
    };

    if (this.isFormvalid(this.state)) {
      this.setState({
        errors: [],
      });
      //this.props.dispatch();
    }
  };

  isFormvalid = ({ email, password }) => email && password;

  render() {
    return (
      <div className="container">
        <div className="row">
          <form
            className="col s12"
            onSubmit={(event) => this.submitForm(event)}
          >
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
                <label htmlFor="email">Email</label>
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
                <label htmlFor="password">Password</label>
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
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
/*
function mapStateToProps(state) {
  return { user: state.user };
}
*/
export default connect(mapStateToProps)(RegisterLogin);
