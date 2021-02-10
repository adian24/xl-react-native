import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import {colors} from '../../constant/color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import tableFooter from '../../style/tableFooter.style';
import ModalSearchPicker from '../modal/ModalSearchPicker';
const initialPerPage = [
  {
    label: 20,
    value: 20,
  },
  {
    label: 40,
    value: 40,
  },
  {
    label: 60,
    value: 60,
  },
];
const TableFooter = (props) => {
  const {
    perPageValue,
    currentPage,
    totalPage,
    onChangePaging,
    onChangePerPage,
    loading,
  } = props || {};
  const [showPerPage, setShowPerPage] = useState(false);
  return (
    <View style={tableFooter.tableFooterWrapper}>
      <View style={tableFooter.row}>
        {!loading && (
          <>
            <Text style={tableFooter.fontColor}>View: </Text>
            <TouchableOpacity
              style={tableFooter.pageOptionWrapper}
              onPress={() => setShowPerPage(true)}>
              <Text style={tableFooter.fontColor}>
                {perPageValue || initialPerPage[0].label}
              </Text>
              <MaterialCommunityIcons
                name={'chevron-down'}
                color={colors.gray}
                size={20}
              />
            </TouchableOpacity>
            <Text style={tableFooter.fontColor}> per page</Text>
          </>
        )}
      </View>
      <View style={tableFooter.row}>
        {!loading && (
          <>
            {currentPage > 1 && (
              <>
                <TouchableOpacity onPress={() => onChangePaging(1)}>
                  <MaterialIcons
                    name={'skip-previous'}
                    color={colors.gray}
                    size={28}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onChangePaging(currentPage - 1)}>
                  <MaterialCommunityIcons
                    name={'chevron-left'}
                    color={colors.gray}
                    size={28}
                  />
                </TouchableOpacity>
              </>
            )}
            <TextInput
              placeholder={currentPage + ''}
              value={currentPage}
              style={tableFooter.textInputPaging}
              onSubmitEditing={(e) => {
                if (e >= 0 && e <= totalPage) {
                  onChangePaging(e);
                } else {
                  Alert.alert(
                    'Warning',
                    `Sorry your paging cannot more than ${totalPage}`,
                  );
                }
              }}
            />
            <Text style={{color: colors.font_gray}}> of {totalPage}</Text>
            {currentPage < totalPage && (
              <>
                <TouchableOpacity
                  onPress={() => onChangePaging(currentPage + 1)}>
                  <MaterialCommunityIcons
                    name={'chevron-right'}
                    color={colors.gray}
                    size={28}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onChangePaging(totalPage)}>
                  <MaterialIcons
                    name={'skip-next'}
                    color={colors.gray}
                    size={28}
                  />
                </TouchableOpacity>
              </>
            )}
          </>
        )}
      </View>
      {showPerPage && (
        <ModalSearchPicker
          data={initialPerPage}
          value={perPageValue}
          removeSearch={true}
          title={'Per Page'}
          onChange={(e) => {
            onChangePerPage(e);
            setShowPerPage(false);
          }}
          onClose={() => setShowPerPage(false)}
        />
      )}
      {loading && (
        <ActivityIndicator color={colors.button_color_one} size={16} />
      )}
    </View>
  );
};
TableFooter.propTypes = {
  perPageValue: PropTypes.objectOf({
    value: PropTypes.number,
    label: PropTypes.number || PropTypes.string,
  }),
  currentPage: PropTypes.number,
  totalPage: PropTypes.number,
  onChangePaging: PropTypes.func,
  onChangePerPage: PropTypes.func,
  loading: PropTypes.bool,
};
TableFooter.defaultProps = {
  onChangePaging: () => {},
  onChangePerPage: () => {},
};
export default TableFooter;
