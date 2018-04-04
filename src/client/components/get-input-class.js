export default ({ touched, valid }) =>
  [
    'form-control',
    touched && !valid ? 'is-invalid' : '',
    touched && valid ? 'is-valid' : ''
  ].join(' ');
