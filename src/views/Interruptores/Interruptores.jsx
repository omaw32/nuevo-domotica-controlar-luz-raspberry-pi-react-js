import qs from "qs";
import React from "react";
import PropTypes from "prop-types";
import { switchActions } from "../../actions";
// @material-ui/core components
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "../../components/Card/Card.jsx";
import CardIcon from "../../components/Card/CardIcon.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
// @material-ui/icons
import Spa from "@material-ui/icons/Spa";
import Hotel from "@material-ui/icons/Hotel";
import Person from "@material-ui/icons/Person";
import AirlineSeatReclineNormal from "@material-ui/icons/AirlineSeatReclineNormal";

import extendedFormsStyle from "../../assets/jss/material-dashboard-react/views/extendedFormsStyle.jsx";

const styles = {
  ...extendedFormsStyle,
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class Interruptores extends React.Component {
  constructor(props) {
    super(props);

    //we use this to make the card to appear after the page has been rendered
    this.state = {
      habitacionInvitados: false,
      estadohabitacionInvitados: "",
      lugarhabitacionInvitados: "",
      habitacionOmar: false,
      estadohabitacionOmar: "",
      lugarhabitacionOmar: "",
      living: false,
      estadoliving: "",
      lugarliving: "",
      patio: false,
      estadopatio: "",
      lugarpatio: ""
    };
    this.handleChange = this.handleChange.bind(this);
    // this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  setearSwitch(numeroSwitch, estadoSwitch) {
    const data = qs.stringify({
      num_gpio: numeroSwitch,
      estado: estadoSwitch === true ? 1 : 0
    });
    switchActions
      .ObtenerSwitch(data)
      .then(responseSwitch => {
        if (responseSwitch.data.status === "exito") {
          var pin = responseSwitch.data.pin;
          switch (pin) {
            case "23":
              this.setState({
                estadohabitacionInvitados: responseSwitch.data.estado
              });
              this.setState({
                lugarhabitacionInvitados: responseSwitch.data.lugar
              });
              break;
            case "24":
              this.setState({
                estadohabitacionOmar: responseSwitch.data.estado
              });
              this.setState({ lugarhabitacionOmar: responseSwitch.data.lugar });
              break;
            case "8":
              this.setState({ estadoliving: responseSwitch.data.estado });
              this.setState({ lugarliving: responseSwitch.data.lugar });
              break;
            case "7":
              this.setState({ estadopatio: responseSwitch.data.estado });
              this.setState({ lugarpatio: responseSwitch.data.lugar });
              break;
            default:
              console.log("Hubo un error");
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  handleChange(e) {
    const { id, value } = e.target;
    var valor = "";
    switch (id) {
      case "estado":
        valor = value;
        break;
      case "lugar":
        valor = value;
        break;
      case "habitacionInvitados":
      case "habitacionOmar":
      case "living":
      case "patio":
        valor = e.target.checked;
        this.setearSwitch(value, valor);
        break;
      default:
        console.log("Hubo un error");
    }
    this.setState({ [id]: valor });
  }
  // handleBlur(e) {}
  handleSubmit() {}
  componentDidMount() {
    switchActions
      .ObtenerEstadosSwitch()
      .then(responseSwitch => {
        if (responseSwitch.data.status === "exito") {
          responseSwitch.data.listaEstadosSwitch.forEach(prop => {
            var estado = prop.estado === "Luz Encendida" ? true : false;
            switch (prop.num_gpio) {
              case 23:
                this.setState({ habitacionInvitados: estado });
                this.setState({ estadohabitacionInvitados: prop.estado });
                this.setState({ lugarhabitacionInvitados: prop.lugar });
                break;
              case 24:
                this.setState({ habitacionOmar: estado });
                this.setState({ estadohabitacionOmar: prop.estado });
                this.setState({ lugarhabitacionOmar: prop.lugar });
                break;
              case 8:
                this.setState({ living: estado });
                this.setState({ estadoliving: prop.estado });
                this.setState({ lugarliving: prop.lugar });
                break;
              case 7:
                this.setState({ patio: estado });
                this.setState({ estadopatio: prop.estado });
                this.setState({ lugarpatio: prop.lugar });
                break;
              default:
                console.log("Hubo un error");
            }
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  componentWillUnmount() {}
  render() {
    const { classes } = this.props;
    const {
      estadohabitacionInvitados,
      lugarhabitacionInvitados,
      estadohabitacionOmar,
      lugarhabitacionOmar,
      estadoliving,
      lugarliving,
      estadopatio,
      lugarpatio
    } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="danger" icon>
                <CardIcon color="danger">
                  <Hotel />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  Lugar: {lugarhabitacionInvitados}
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    Estado: {estadohabitacionInvitados}
                  </GridItem>
                  <Grid container alignItems="center" justify="center">
                    <GridItem xs={12} sm={12} md={2}>
                      <Switch
                        id="habitacionInvitados"
                        checked={this.state.habitacionInvitados}
                        onChange={this.handleChange}
                        value="23"
                        classes={{
                          switchBase: classes.switchBase,
                          checked: classes.switchChecked,
                          icon: classes.switchIcon,
                          iconChecked: classes.switchIconChecked,
                          bar: classes.switchBar
                        }}
                      />
                    </GridItem>
                  </Grid>
                </GridContainer>
              </CardBody>
              <CardFooter />
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="danger" icon>
                <CardIcon color="danger">
                  <Person />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  Lugar: {lugarhabitacionOmar}
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    Estado: {estadohabitacionOmar}
                  </GridItem>
                  <Grid container alignItems="center" justify="center">
                    <GridItem xs={12} sm={12} md={2}>
                      <Switch
                        id="habitacionOmar"
                        checked={this.state.habitacionOmar}
                        onChange={this.handleChange}
                        value="24"
                        classes={{
                          switchBase: classes.switchBase,
                          checked: classes.switchChecked,
                          icon: classes.switchIcon,
                          iconChecked: classes.switchIconChecked,
                          bar: classes.switchBar
                        }}
                      />
                    </GridItem>
                  </Grid>
                </GridContainer>
              </CardBody>
              <CardFooter />
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="danger" icon>
                <CardIcon color="danger">
                  <Spa />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Lugar: {lugarpatio}</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    Estado: {estadopatio}
                  </GridItem>
                  <Grid container alignItems="center" justify="center">
                    <GridItem xs={12} sm={12} md={2}>
                      <Switch
                        id="patio"
                        checked={this.state.patio}
                        onChange={this.handleChange}
                        value="7"
                        classes={{
                          switchBase: classes.switchBase,
                          checked: classes.switchChecked,
                          icon: classes.switchIcon,
                          iconChecked: classes.switchIconChecked,
                          bar: classes.switchBar
                        }}
                      />
                    </GridItem>
                  </Grid>
                </GridContainer>
              </CardBody>
              <CardFooter />
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="danger" icon>
                <CardIcon color="danger">
                  <AirlineSeatReclineNormal />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Lugar: {lugarliving}</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    Estado: {estadoliving}
                  </GridItem>
                  <Grid container alignItems="center" justify="center">
                    <GridItem xs={12} sm={12} md={2}>
                      <Switch
                        id="living"
                        checked={this.state.living}
                        onChange={this.handleChange}
                        value="8"
                        classes={{
                          switchBase: classes.switchBase,
                          checked: classes.switchChecked,
                          icon: classes.switchIcon,
                          iconChecked: classes.switchIconChecked,
                          bar: classes.switchBar
                        }}
                      />
                    </GridItem>
                  </Grid>
                </GridContainer>
              </CardBody>
              <CardFooter />
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Interruptores.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Interruptores);
