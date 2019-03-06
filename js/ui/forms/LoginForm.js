class LoginForm extends AsyncForm {
  onSubmit( options ) {
    User.login( options.data, response => {
      console.log( response );
    });
  }
}
