import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setAlert } from "../../actions/alert";
import { activate } from "../../actions/auth";

const Activate = ({ activate, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    NIK: "",
    password: ""
  });

  const { NIK, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    activate(NIK, password);
    setAlert(
      "Registro exitoso, revise su correo electrónico para activar su cuenta",
      "success"
    );
    setTimeout(function() {
      window.location.replace('http://e1-client-blockchain-evoting.herokuapp.com/login');
    }, 4000);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Activación</h1>
      <p className="lead">
        <i className="fas fa-user" /> Activa tu cuenta
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Código UNI"
            name="NIK"
            value={NIK}
            onChange={e => onChange(e)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e => onChange(e)}
            required
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Activar" />
      </form>
      <p className="my-1">
      ¿Aún no te has registrado? <Link to="/register">Registro</Link>
      </p>
    </Fragment>
  );
};

Activate.propTypes = {
  activate: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { activate }
)(Activate);
