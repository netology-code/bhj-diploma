class RegisterForm extends AsyncForm {
  onSubmit( options ) {
    User.register( options.data, response => {
      console.log( response );
    });
  }
}
