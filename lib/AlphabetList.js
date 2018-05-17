'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AlphabetItem = require('./AlphabetItem');

var _AlphabetItem2 = _interopRequireDefault(_AlphabetItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mapArrToMap = function mapArrToMap(arr) {
  var map = new Map();
  var Regx = /^[A-Za-z]$/;
  arr.forEach(function (item) {
    var firstChar = item[0];
    if (!Regx.test(firstChar)) {
      firstChar = '#';
    } else {
      firstChar = firstChar.toUpperCase();
    }
    if (map.get(firstChar) == null) {
      map.set(firstChar, [item]);
    } else {
      var _arr = map.get(firstChar);
      _arr.push(item);
      map.set(firstChar, _arr);
    }
  });
  return map;
};

var AlphabetList = function (_Component) {
  _inherits(AlphabetList, _Component);

  function AlphabetList(props) {
    _classCallCheck(this, AlphabetList);

    var _this = _possibleConstructorReturn(this, (AlphabetList.__proto__ || Object.getPrototypeOf(AlphabetList)).call(this, props));

    _this.registerPos = function (id, top) {
      _this.mapPos.set(id, top);
    };

    _this.handleScroll = function () {
      if (_this.posKeyArr == null) {
        _this.posKeyArr = Array.from(_this.mapPos.keys());
        _this.posKeyArr.sort();
      }
      var currentChar = '#';
      if (_this.scroller != null) {
        // TODO: better calc
        _this.posKeyArr.forEach(function (key) {
          if (_this.scroller.scrollTop + 16 >= _this.mapPos.get(key)) {
            currentChar = key;
          }
        });
      }
      if (currentChar !== _this.state.currentChar) {
        console.log(currentChar);
        _this.setState({
          currentChar: currentChar
        });
      }
    };

    _this.handleAlphaClick = function (char) {
      _this.scroller.scrollTop = _this.mapPos.get(char);
    };

    _this.map = mapArrToMap(_this.props.data);
    _this.mapPos = new Map();
    _this.state = {
      currentChar: '#'
    };
    _this.posKeyArr = null;
    return _this;
  }

  _createClass(AlphabetList, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var generateFn = this.props.generateFn;

      var keys = Array.from(this.map.keys());
      keys.sort();
      return _react2.default.createElement(
        'div',
        {
          style: {
            position: 'relative',
            width: 350,
            height: 400
          }
        },
        _react2.default.createElement(
          'div',
          {
            style: {
              width: 350,
              height: 400,
              backgroundColor: '#333',
              overflow: 'scroll',
              overflowX: 'hidden',
              paddingRight: 12,
              paddingLeft: 8
            },
            ref: function ref(_ref) {
              _this2.scroller = _ref;
            },
            onScroll: this.handleScroll
          },
          keys.map(function (char) {
            if (_this2.map.get(char) != null) {
              return _react2.default.createElement(
                _AlphabetItem2.default,
                {
                  id: '' + char,
                  subfix: ' (' + _this2.map.get(char).length + ')',
                  key: char,
                  registerPos: _this2.registerPos
                },
                _this2.map.get(char).map(function (item, index) {
                  return generateFn(item, index);
                })
              );
            }
          })
        ),
        _react2.default.createElement(
          'div',
          {
            style: {
              position: 'absolute',
              top: 12,
              right: 8,
              color: '#AAA'
            }
          },
          keys.map(function (item) {
            return _react2.default.createElement(
              'div',
              {
                key: item,
                style: {
                  fontSize: 9.5,
                  verticalAlign: 'top',
                  cursor: 'pointer',
                  color: _this2.state.currentChar === item ? 'white' : '#AAA'
                },
                onClick: function onClick() {
                  _this2.handleAlphaClick(item);
                }
              },
              item
            );
          })
        )
      );
    }
  }]);

  return AlphabetList;
}(_react.Component);

exports.default = AlphabetList;