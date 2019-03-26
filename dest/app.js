"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var createString = function createString() {
  var _globalSettings = {
    prefix: null,
    suffix: null
  };
  var _localSettings = [];
  var _increment = 0;
  var _currentSettings = 0;
  var methods = {
    prefix: function prefix(_prefix) {
      _globalSettings.prefix = _prefix;
      return this;
    },
    suffix: function suffix(_suffix) {
      _globalSettings.suffix = _suffix;
      return this;
    },
    seperator: function seperator(_seperator) {
      _localSettings[_currentSettings].seperator = _seperator;
      return this;
    },
    segmentSeperator: function segmentSeperator(_segmentSeperator, isSegmentSeperatorAtEnd) {
      _localSettings[_currentSettings].segmentSeperator = _segmentSeperator;
      _localSettings[_currentSettings].isSegmentSeperatorAtEnd = isSegmentSeperatorAtEnd || false;
      return this;
    },
    repeat: function repeat(n) {
      _localSettings[_currentSettings].repeat = n;
      return this;
    },
    addSegment: function addSegment() {
      _localSettings.push(_getLocalSettingsFormat());

      for (var _len = arguments.length, string = new Array(_len), _key = 0; _key < _len; _key++) {
        string[_key] = arguments[_key];
      }

      _localSettings[_increment].string = _flattenArray(string);
      _increment++;
      _currentSettings = _increment - 1;
      return this;
    },
    build: function build() {
      var string = _localSettingsToString(_localSettings);

      var prefix = _globalSettings.prefix,
          suffix = _globalSettings.suffix;

      if (prefix) {
        string = "".concat(prefix, " ").concat(string);
      }

      if (suffix) {
        string = "".concat(string, " ").concat(suffix);
      }

      return string;
    }
  };
  methods.addSegment.apply(methods, arguments);
  return methods;
};

function _arrayToString(array, seperator) {
  var string = "";
  seperator = seperator || " ";
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = array.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2),
          index = _step$value[0],
          item = _step$value[1];

      if (!(index === array.length - 1)) {
        string += item + seperator;
      } else {
        string += item;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return string;
}

function _flattenArray(array) {
  return array.reduce(function (flattArray, item) {
    if (Array.isArray(item)) {
      var nestedArray = item;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = nestedArray[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _item = _step2.value;
          flattArray.push(_item);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    } else {
      flattArray.push(item);
    }

    return flattArray;
  }, []);
}

function _localSettingsToString(localSettings) {
  return localSettings.reduce(function (modifiedString, item) {
    var string = item.string,
        seperator = item.seperator,
        segmentSeperator = item.segmentSeperator,
        isSegmentSeperatorAtEnd = item.isSegmentSeperatorAtEnd,
        repeat = item.repeat;
    var isAtEnd;

    for (var i = 0; i < repeat; i++) {
      modifiedString += _arrayToString(string, seperator);

      if (isSegmentSeperatorAtEnd) {
        isAtEnd = i + 1 !== repeat;
      } else {
        isAtEnd = true;
      }

      if (segmentSeperator && isAtEnd) {
        modifiedString = "".concat(modifiedString).concat(segmentSeperator);
      } else {
        modifiedString = "".concat(modifiedString, " ");
      }
    }

    return modifiedString;
  }, "");
}

function _getLocalSettingsFormat(string) {
  return {
    string: string || null,
    seperator: null,
    segmentSeperator: null,
    isSegmentSeperatorAtEnd: false,
    repeat: 0
  };
}

var numbers = [1, 2, 3];
createString(numbers, 4).segmentSeperator(" and ").repeat(2).build();