import {device_height} from '../constant/config';
import {colors} from '../constant/color';
export default {
  avatarContainer: {
    width: 152,
    height: 152,
    borderRadius: 100,
    backgroundColor: '#B4B4B4',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  editIcon: {
    position: 'absolute',
    right: 10,
    bottom: -5,
    color: '#707070',
  },
  editIconCard: {
    position: 'relative',
    top: 3,
    color: '#707070',
  },
  accountPlaceholder: {
    flexDirection: 'row',
    width: '70%',
    height: 66,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  nameText: {
    fontSize: 18,
    color: '#707070',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  usernameText: {
    fontSize: 14,
    color: '#00D3A0',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  basicContainer: {
    flexDirection: 'row',
    width: '90%',
    minHeight: 200,
    paddingBottom: 10,
  },
  cardTitleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 50,
    paddingHorizontal: 15,
  },
  formContainer: {
    width: '100%',
    minHeight: 50,
    alignItems: 'center',
  },
  formGroup: {
    width: '90%',
    paddingVertical: 5,
  },
  label: {
    fontSize: 16,
    color: '#707070',
  },
  textInputContainer: {
    height: device_height * 0.05,
    fontSize: 14,
    // borderRadius: border_radius,
    borderWidth: 1,
    borderColor: '#A8A8A8',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingLeft: 10,
    marginVertical: 10,
    color: '#707070',
  },
  linkText: {
    fontSize: 14,
    color: '#002DBB',
    paddingHorizontal: 15,
  },
  footer: {
    width: '90%',
    alignItems: 'flex-end',
    marginVertical: 15,
  },
  logoutButton: {
    paddingHorizontal: 10,
    fontSize: 18,
    color: '#707070',
  },
  blockButton: {
    width: 100,
    backgroundColor: colors.button_color_one,
    borderRadius: 5,
    height: 35,
    marginLeft: 15,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordRulesContainer: {
    width: '90%',
    alignItems: 'flex-start',
    marginBottom: 20
  },
  buttonGroupContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    height: 50,
    marginVertical: 20
  },
  passwordInputWrapper: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: device_height * 0.05,
    borderWidth: 1,
    borderColor: '#A8A8A8',
    backgroundColor: 'white',
    borderRadius: 5,
    marginVertical: 10,
    color: '#707070',
    justifyContent: 'space-between'
  },
  passwordInput: {
    width: '80%',
    height: '100%',
    paddingLeft: 10,
  },
  buttonShowHide: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonGroup: {
    width: 165,
    height: 40,
    borderRadius: 5,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  }
};
