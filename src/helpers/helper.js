class Helper {
  static numberFormat(value, symbol, type = 'number') {
    if (typeof value === 'object') {
      return 'Invalid Value';
    }

    if (type == 'gbFormat') {
      value = Math.round(+value / 1000000);
      return (
        Number(value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, symbol)) +
        ' GB'
      );
    } else {
      return Number(value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, symbol));
    }
  }

  static formatBytes(bytes) {
    if (!isNaN(bytes)) {
      const decimals = 2;
      if (bytes === 0) {
        return '0 B';
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

  static sortAscending(data, key) {
    if (typeof data === 'object') {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length - 1; j++) {
          if (data[j][key] > data[j + 1][key]) {
            temp = data[j];
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
}

export default Helper;