import {DRAWER_MENU_PRIVILEDGE} from '../constant/priviledge';

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

      const k = 1000;
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
                    console.log(drawer.subMenu[i], ' sub menu i');
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
}

export default Helper;
