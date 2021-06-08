import {DRAWER_MENU_PRIVILEDGE} from '../constant/priviledge';
import dayjs from 'dayjs';

class Helper {
  static numberFormat(value, symbol, type = 'number') {
    const result = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, symbol);
    return result;
  }

  static formatBytes(bytes) {
    if (!isNaN(bytes)) {
      const decimals = 2;
      if (bytes === 0) {
        return '0 B';
      }

      if (bytes < 1) {
        return bytes + 'KB';
      }

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    } else {
      return '-';
    }
  }

  static convertToByte(value, type) {
    const dataType = [
      {
        type: 'KB',
        value: 1000,
      },
      {
        type: 'MB',
        value: 1000000,
      },
      {
        type: 'GB',
        value: 1000000000,
      },
      {
        type: 'TB',
        value: 1000000000000,
      },
      {
        type: 'KiB',
        value: 1024,
      },
      {
        type: 'MiB',
        value: 1048576,
      },
      {
        type: 'GiB',
        value: 1073741824,
      },
      {
        type: 'TiB',
        value: 1099511627776,
      },
    ];
    const convertVal = dataType.find((d) => d.type === type);
    return convertVal.value * value;
  }

  static sortAscending(data, key) {
    if (typeof data === 'object') {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length - 1; j++) {
          if (data[j][key] > data[j + 1][key]) {
            let temp = data[j];
            data[j] = data[j + 1];
            data[j + 1] = temp;
          }
        }
      }

      return data;
    } else {
      return data;
    }
  }

  static findAndReturnPriviledge = (privId, userPriviledge) => {
    const isHasPriviledge = userPriviledge.find(
      (priv) => priv.priviledgeId == privId,
    );

    if (isHasPriviledge) {
      return isHasPriviledge.priviledgeId;
    } else {
      return '';
    }
  };

  static addDrawerMenu = (userPriviledge, type = 'drawer') => {
    const drawerMenu = [];

    if (userPriviledge) {
      DRAWER_MENU_PRIVILEDGE.map((drawer) => {
        for (let i = 0; i < userPriviledge.length; i++) {
          if (type === 'drawer') {
            if (drawer.type == 'drawer' || drawer.type == 'initialRoute') {
              if (
                drawer.priviledgeId == userPriviledge[i].priviledgeId ||
                drawer.priviledgeId == ''
              ) {
                drawerMenu.push(drawer);
                break;
              }
            }
          } else {
            if (
              drawer.priviledgeId == userPriviledge[i].priviledgeId ||
              drawer.priviledgeId == ''
            ) {
              if (drawer.components) {
                drawerMenu.push(drawer);
                break;
              } else {
                if (drawer.subMenu) {
                  for (let i = 0; i < drawer.subMenu.length; i++) {
                    drawerMenu.push(drawer.subMenu[i]);
                  }
                }
                break;
              }
            }
          }
        }
      });
    } else {
      DRAWER_MENU_PRIVILEDGE.map((drawer) => {
        if (drawer.type == 'non-drawer' || drawer.type == 'initialRoute') {
          drawerMenu.push(drawer);
        }
      });
    }

    return drawerMenu;
  };

  static sortDescending(data, key) {
    if (typeof data === 'object') {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length - 1; j++) {
          if (data[j][key] < data[j + 1][key]) {
            let temp = data[j];
            data[j] = data[j + 1];
            data[j + 1] = temp;
          }
        }
      }

      return data;
    } else {
      return data;
    }
  }

  static objectToString(object) {
    const arrayFormat = [];

    for (let key in object) {
      arrayFormat.push(`${key}: ${object[key]}`);
    }

    return arrayFormat.join();
  }

  static mergeToSpecificIndex = (first_array, second_array, index = 0) =>
    first_array.splice(index, 0, ...second_array) && first_array;

  static numberWithCommas(x) {
    if (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }

  static numberWithDot(x) {
    if (x || x == 0) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
  }

  static numberFromBE(labelValue) {
    if (labelValue) {
      return labelValue
        .toString()
        .replace('.', ',')
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
  }

  static dynamicResetForm = (data) => {
    const {typeInput, formId, ...value} = data || {};
    switch (typeInput) {
      case 'DropDown':
        return {
          ...value,
          formId: formId,
          typeInput: typeInput,
          value: {},
        };
      case 'DropDownType2':
        return {
          ...value,
          formId: formId,
          value: '',
          typeInput: typeInput,
          selectedValue: {},
        };
      case 'TextInput':
        return {
          ...value,
          formId: formId,
          typeInput: typeInput,
          value: '',
        };
      case 'DateTimePicker':
        return {
          ...value,
          isSelected: false,
          formId: formId,
          typeInput: typeInput,
          value: dayjs().toDate(),
        };
      default:
        return {
          formId,
          ...value,
        };
    }
  };

  static resetAllForm(data = []) {
    return data.map(({formId, typeInput, ...value}) => {
      switch (typeInput) {
        case 'DropDown':
          return {
            ...value,
            formId: formId,
            typeInput: typeInput,
            value: {},
          };
        case 'DropDownType2':
          return {
            ...value,
            formId: formId,
            value: '',
            typeInput: typeInput,
            selectedValue: {},
          };
        case 'TextInput':
          return {
            ...value,
            formId: formId,
            typeInput: typeInput,
            value: '',
          };
        case 'DateTimePicker':
          return {
            ...value,
            isSelected: false,
            formId: formId,
            typeInput: typeInput,
            value: dayjs().toDate(),
          };
        default:
          return {
            formId,
            ...value,
          };
      }
    });
  }

  static makeMultiDimensionalArrayTo2DArray(
    data,
    newData = [],
    currentLevel = 0,
  ) {
    data.map((value, index) => {
      value.level = currentLevel;
      value.visibility = true;
      value.childrenCnt = value.children.length;
      value.collapse = true;
      Object.keys(value).map((objValue, index) => {
        if (typeof value[objValue] === 'object' && value[objValue] != null) {
          currentLevel++;
          value.icon = value[objValue].length > 0 && 'caret-down';
          value.treeCheck = false;
          value.isDisabled = true;

          newData.push(value);
          if (value[objValue].length > 0) {
            return Helper.makeMultiDimensionalArrayTo2DArray(
              value[objValue],
              newData,
              currentLevel,
            );
          }
        }
      });
      currentLevel--;
    });

    newData.map((data, index) => {
      data.index = index;
    });

    return newData;
  }

  static manipulateIsDisabledArray(dataArray){
    dataArray.map((data) => {
      data.isDisabled = false;
    });

    return dataArray;
  }

  static treeViewToggle(gridData, cellId) {
    const newData = new Array();

    let isRoot = false;
    gridData.map((data) => {
      if(data.enterpriseId == cellId){
        if(data.enterpriseParentId === null){
          isRoot = true;
        }
      }

      if(isRoot){
        if(data.enterpriseId !== cellId){
            data.visibility = !data.collapse;
            data.collapse = !data.collapse;          
        }

      }else{
        if(data.enterpriseParentId === cellId){
          data.visibility = !data.visibility;
        }
      }

      if (data.icon) {
        data.icon = data.icon == 'caret-down' ? 'caret-up' : 'caret-down';
      }

      newData.push(data);
    });

    return newData;

  }

  static checkboxToggle(gridData, cellId ,selectedRadio = 1){
    const newData = new Array();
    let isRoot = false;
    let parentCheck = false;

    gridData.map((data) => {
      if(data.enterpriseId == cellId){
        if(data.enterpriseParentId === null){
          isRoot = true;
        }
        parentCheck = !data.treeCheck;
        data.treeCheck = !data.treeCheck;
      }

      if(isRoot){
        if(data.enterpriseId !== cellId){
            if(selectedRadio === 1){
              data.isDisabled = !data.isDisabled;
            }
            data.treeCheck = parentCheck;
        }

      }else{
        if(data.enterpriseParentId === cellId){
            if(selectedRadio === 1){
              data.isDisabled = !data.isDisabled;
            }
            data.treeCheck = parentCheck;
        }
      }

      newData.push(data);
    });

    return newData;
  }

  static checkSelectedData(newData){
      const selectedData = new Array();

      newData.map((data, index) => {
        if(data.treeCheck){
          selectedData.push(data);
        }
      });

      return newData;
  }

  static formValidation(formKey, formTitle, validationRules, formData, errorValidation){
    let errorMsg = "";
    const splitValidation = String(validationRules).split("|");

    splitValidation.map((type) => {
      switch (type) {
        case "required":
          errorMsg = Helper.validationIsRequired(formKey, formTitle, formData);
          break;
        case "isEmail":
          errorMsg = Helper.validateEmail(formKey, formData);
          break;

        default:
         errorMsg = Helper.validationIsRequired(formKey, formTitle, formData);
      }
    });

    return errorMsg;
  }

  static validationIsRequired(formKey, formTitle, formData){
    let errorMsg = "";
    if(formData[formKey].length <= 0){
      errorMsg = `${formTitle} is required`;
    }

    return errorMsg;
  }

  static validateEmail(formKey, formData){
    let errorMsg = "";
    let re = /\S+@\S+\.\S+/;

    if(re.test(formData[formKey]) == false){
      errorMsg = "Email is not valid!";
    }

    return errorMsg;
  }
}

export default Helper;
