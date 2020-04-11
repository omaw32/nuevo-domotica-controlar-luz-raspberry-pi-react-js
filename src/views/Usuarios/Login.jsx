import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// @material-ui/core components
import Icon from "@material-ui/core/Icon";
import AddAlert from "@material-ui/icons/AddAlert";
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Face from "@material-ui/icons/Face";
// components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import Snackbar from "../../components/Snackbar/Snackbar.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import loginPageStyle from "../../assets/jss/material-dashboard-react/views/loginPageStyle.jsx";

import { userActions } from "../../actions";
import { validator } from "../../helpers";

class Login extends React.Component {
  constructor(props) {
    super(props);
    //reset login status
    this.props.dispatch(userActions.logout());

    this.state = {
      cardAnimaton: "cardHidden",
      username: "",
      password: "",
      usernameState: "",
      passwordState: "",
      messageAlert: "",
      tr: false,
      lblRutUsuario: "Rut Usuario"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  handleChange(e) {
    const { id, value } = e.target;
    this.setState({ [id]: value });
    let success = false;
    if (id === "username") {
      var rutFormateado = validator.formatRut(value, false); //valida rut sin puntos ni guion
      if (validator.rutEsValido(rutFormateado)) {
        success = true;
        this.setState({ lblRutUsuario: "Rut Usuario" });
      }
      // this.setState({ username: rutFormateado });
    }
    if (id === "password") {
      if (validator.verifyRange(value, 6, 12)) {
        success = true;
      }
    }
    if (success) {
      // this.setState({ username: rutFormateado });
      this.setState({ [id + "State"]: "success" });
    } else {
      this.setState({ [id + "State"]: "error" });
    }
  }
  handleBlur(e) {
    const { id, value } = e.target;
    if (id === "username") {
      let rutFormateado = validator.formatearRutConPuntos(value);
      if (validator.rutEsValido(rutFormateado)) {
        this.setState({ [id + "State"]: "success" });
        // this.setState({ messageUsername: "" });
        this.setState({ [id]: rutFormateado });
      } else {
        this.setState({ lblRutUsuario: "Rut incorrecto" });
        this.setState({ [id]: "" });
        this.setState({ [id + "State"]: "error" });
      }
      //this.setState({ [id]: rutFormateado });
    }
    if (id === "password" && value !== "") {
      if (validator.verifyRange(value, 6, 12)) {
        if (!validator.verifyAlfanumeric(value)) {
          this.setState({ [id + "State"]: "error" });
          this.setState({
            messageAlert:
              "Existen caracteres no validos en su clave, ingrese solo letras y numeros"
          });
          this.showNotification("tr");
        } else {
          this.setState({ [id + "State"]: "success" });
          this.setState({ messageAlert: "" });
        }
      } else {
        this.setState({ [id + "State"]: "error" });
      }
    }
  }
  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.handleSubmit();
    }
  }
  handleSubmit() {
    const { username, usernameState, password, passwordState } = this.state;
    const { dispatch } = this.props;
    if (usernameState === "success" && passwordState === "success") {
      if (username && password) {
        let rutUsuario = username.replace(/[^0-9kK-]/g, "");
        dispatch(userActions.fakeLoginApi(rutUsuario, password));
      }
    } else {
      if (username === "") {
        this.setState({ usernameState: "error" });
        this.setState({ messageAlert: "Ingrese rut de usuario" });
        this.showNotification("tr");
      } else if (password === "") {
        this.setState({ passwordState: "error" });
        this.setState({ messageAlert: "Ingrese clave de usuario" });
        this.showNotification("tr");
      }
    }
  }
  componentDidMount() {
    //we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }
  showNotification(place) {
    if (!this.state[place]) {
      var x = [];
      x[place] = true;
      this.setState(x);
      setTimeout(
        function() {
          x[place] = false;
          this.setState(x);
        }.bind(this),
        6000
      );
    }
  }
  render() {
    const { classes } = this.props;
    const { loggingIn } = this.props;
    const {
      username,
      usernameState,
      password,
      passwordState,
      messageAlert,
      lblRutUsuario
    } = this.state;
    return (
      <div className={classes.container}>
        <Snackbar
          place="tr"
          color="danger"
          icon={AddAlert}
          message={messageAlert}
          open={this.state.tr}
          closeNotification={() => this.setState({ tr: false })}
          close
        />
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <form>
              <Card login className={classes[this.state.cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="danger"
                >
                  <h4 className={classes.cardTitle}>Acceso a Usuarios</h4>
                </CardHeader>
                <CardBody>
                  <CustomInput
                    success={usernameState === "success"}
                    error={usernameState === "error"}
                    labelText={lblRutUsuario}
                    id="username"
                    name="username"
                    value={username}
                    formControlProps={{
                      fullWidth: true,
                      onChange: this.handleChange,
                      onBlur: this.handleBlur
                    }}
                    inputProps={{
                      type: "text",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Face className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    success={passwordState === "success"}
                    error={passwordState === "error"}
                    labelText="Clave"
                    id="password"
                    name="password"
                    value={password}
                    formControlProps={{
                      fullWidth: true,
                      onChange: this.handleChange,
                      onBlur: this.handleBlur,
                      onKeyPress: this.handleKeyPress
                    }}
                    inputProps={{
                      type: "password",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputAdornmentIcon}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      )
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button
                    color="danger"
                    simple
                    size="lg"
                    block
                    onClick={() => {
                      this.handleSubmit();
                    }}
                  >
                    Ingresar
                  </Button>
                  {loggingIn}
                </CardFooter>
                <CardFooter className={classes.justifyContentCenter}>
                  <List className={classes.list}>
                    <ListItem className={classes.inlineBlock}>
                      {/* <a href="/usuarios/solicitud-recuperacion-clave" className={classes.inputAdornmentIcon}>
                        Recuperar Clave
                      </a> */}
                      <Link to="/solicitud-recuperacion-clave">
                        Recuperar Clave
                      </Link>
                    </ListItem>
                  </List>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loggingIn: PropTypes.any,
  dispatch: PropTypes.any
};

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}
const connectedLogin = connect(mapStateToProps)(
  withStyles(loginPageStyle)(Login)
);
export { connectedLogin as Login };
