import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {AccountForm} from '../../components';

const CreateBasicUserInformation = (props) => {

  const [formError, setFormError] = useState({});
  const [touchForm, setTouchForm] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [dropDownValue, setDropDownValue] = useState(null);

  const userForm = [
    {
      title: 'First Name', 
      key: 'firstName', 
      isRequired: true, 
      type: "text"
    },
    {
      title: 'Last Name', 
      key: 'lastName', 
      isRequired: true, 
      type: "text"
    },
    {
      title: 'Username', 
      key: 'username', 
      isRequired: true, 
      type: "text"
    },
    {
      title: 'Mobile Phone', 
      key: 'phoneNumber', 
      isRequired: false, 
      type: "text"
    },
    {
      title: 'Email Address', 
      key: 'email', 
      isRequired: true, 
      type: "text"
    },
    {
      title: 'Language', 
      key: 'language', 
      isRequired: true, 
      type: "select", 
      options: [
        { value: "english", label: "English" },
        { value: "bahasa", label: "Bahasa" }
      ],
      config: {
        searchable: false,
        isOpen: openDropDown,
        onClick: () => setOpenDropDown(prevState => prevState = prevState ? false : true),
        setValue: setDropDownValue
      }
    },
  ];

  const inputHandler = (name, value) => {
    props.setBasicInformation({
      ...props.basicInformation,
      [name]: value
    });
  }

  const validateForm = () => {
    const validationError = {};
    if(touchForm){
      userForm.map((form) => {
        if(form.isRequired){
          validationIsRequired(form.key, form.title, validationError);
        }
      })
    }
    setFormError(prevState => prevState = validationError);
  }

  const validationIsRequired = (formKey, formTitle, validationError) => {
    if(props.basicInformation[formKey].length <= 0){
      validationError[formKey] = `${formTitle} is required`;
    }
  }
  
  useEffect(() => {
    validateForm();

    if(Object.keys(formError) <= 0){
      props.setIsComplete(true);
    }else{
      props.setIsComplete(false);
    }

  }, [props.basicInformation, dropDownValue, touchForm]);

  useEffect(() => {
    if(dropDownValue !== null){
      inputHandler("language", dropDownValue);
    }
  }, [dropDownValue]);

  return(
    <AccountForm
      isValidate={true}
      formList={userForm}
      editable={props.isEditable}
      setIsTouch={setTouchForm}
      value={props.basicInformation}
      formError={formError}
      inputHandler={inputHandler}
    />
  );
}

CreateBasicUserInformation.propTypes = {
  isEditable: PropTypes.bool,
  basicInformation: PropTypes.array,
  setIsComplete: PropTypes.func,
  setBasicInformation: PropTypes.func
};

CreateBasicUserInformation.defaultProps = {
  isEditable: false,
  basicInformation: [],
  setIsComplete: () => {},
  setBasicInformation: () => {}
}

export default CreateBasicUserInformation;