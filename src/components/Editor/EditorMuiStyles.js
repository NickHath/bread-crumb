import { amber500, red500, green500 } from 'material-ui/styles/colors';

export default {
  chip: {
    margin: 5,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  taskFocusStyle: {
    borderColor: amber500
  },
  hintFocusStyle: {
    borderColor: red500
  },
  answerFocusStyle: {
    borderColor: green500
  },
  buttonStyle: {
    margin: 12
  },
  iconStyle: {
    width: 60,
    height: 60,
    fill: '#424242'
  },
  iconWrapper: {
    width: 120,
    height: 120,
  },
  textInputStyle: {
    color: '#424242',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '3em',
    fontWeight: '700',
  },
  textFieldStyle: {
    width: '100%', 
    marginBottom: '1em'
  }
};