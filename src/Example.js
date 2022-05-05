import React from "react";
import { Form, Field } from "react-final-form";
import TextField from "@mui/material/TextField";
import Button from "@material-ui/core/Button";
import { styled } from "@mui/material/styles";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";

const Container = styled("div")(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const onSubmit = (values) => {
  if (values.email !== "dheafesa@gmail.com") {
    return { email: "Email tidak terdaftar" };
  }
  if (values.password !== "dedem123") {
    return { password: "Password Anda salah" };
  }
  window.alert("LOGIN SUCCESS!");
};

const Example = () => {
  const [values, setValues] = React.useState({
    // textmask: "(100) 000-0000",
    numberformat: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
    props,
    ref
  ) {
    const { onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="Rp "
      />
    );
  });

  NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  return (
    <Container>
      <Form
        onSubmit={onSubmit}
        validate={(values) => {
          const errors = {};
          const regex = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/i;

          if (!values.email) {
            errors.email = "Email tidak boleh kosong";
          } else if (!regex.test(values.email)) {
            errors.email = "Format email salah dan hanya menerima gmail";
          }
          if (!values.password) {
            errors.password = "Password tidak boleh kosong";
          }
          if (!values.donation) {
            errors.donation = "Donasi tidak boleh kosong";
          }
          return errors;
        }}

        render={({ submitError, handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "0px 20px",
              }}
            >
              <Field name="email">
                {({ input, meta }) => (
                  <TextField
                    id="outlined-email-input"
                    label="Email"
                    type="text"
                    autoComplete="off"
                    placeholder="Masukkan Email Kamu"
                    sx={{ margin: "10px" }}
                    value=""
                    error={(meta.error || meta.submitError) && meta.touched}
                    helperText={
                      (meta.error && meta.touched && meta.error) ||
                      meta.submitError
                    }
                    {...input}
                  />
                )}
              </Field>
              <Field name="password">
                {({ input, meta }) => (
                  <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="off"
                    placeholder="Masukkan Password Kamu"
                    sx={{ margin: "10px" }}
                    value=""
                    error={(meta.error || meta.submitError) && meta.touched}
                    helperText={
                      (meta.error && meta.touched && meta.error) ||
                      meta.submitError
                    }
                    {...input}
                  />
                )}
              </Field>
              <Field name="donation">
                {({ input, meta }) => (
                  <TextField
                    id="outlined-donation-input"
                    name="donation"
                    label="Donasi"
                    type="text"
                    autoComplete="off"
                    placeholder="Masukkan Donasi Kamu"
                    sx={{ margin: "10px" }}
                    value={values.numberformat}
                    onChange={handleChange}
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                    error={(meta.error || meta.submitError) && meta.touched}
                    helperText={
                      (meta.error && meta.touched && meta.error) ||
                      meta.submitError
                    }
                    {...input}
                  />
                )}
              </Field>
              {submitError && <div className="error">{submitError}</div>}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                tabIndex={0}
                size="medium"
                disabled={submitting}
                style={{
                  backgroundColor: "rgb(25, 118, 210)",
                  height: 46,
                  margin: 10,
                }}
              >
                Submit
              </Button>
            </div>
          </form>
        )}
      />
    </Container>
  );
};

export default Example;
