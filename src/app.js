const createString = (...string) => {
    const _globalSettings = {
        prefix: null,
        suffix: null,
    };
  
    const _localSettings = [];

    let _increment = 0;
    let _currentSettings = 0;

    const methods = {     
        prefix: function(prefix) {
            _globalSettings.prefix = prefix;
            
            return this;
        },

        suffix: function(suffix) {
            _globalSettings.suffix = suffix;
            
            return this;
        },

        seperator: function(seperator) {
            _localSettings[_currentSettings].seperator = seperator;
            
            return this;
        },

        segmentSeperator: function(segmentSeperator, isSegmentSeperatorAtEnd) {
            _localSettings[_currentSettings].segmentSeperator = segmentSeperator;
            _localSettings[_currentSettings].isSegmentSeperatorAtEnd = isSegmentSeperatorAtEnd || false;

            return this;
        },

        repeat: function(n) {
            _localSettings[_currentSettings].repeat = n;
            return this;
        },
        
        addSegment: function(...string) {
            _localSettings.push(_getLocalSettingsFormat());

            _localSettings[_increment].string = _flattenArray(string);        

            _increment ++;

            _currentSettings = _increment - 1;

            return this;
        },

        build: () => {
            let string = _localSettingsToString(_localSettings);
            const {prefix, suffix} = _globalSettings;

            if (prefix) {
                string = `${prefix} ${string}`;
            }

            if (suffix) {
                string = `${string} ${suffix}`
            }

            return string
        }
    };

    methods.addSegment(...string);

    return methods;
}

function _arrayToString (array, seperator) {
    let string = "";
    seperator = seperator || " ";

    for (const [index, item] of array.entries()) {
        if (! (index === array.length - 1)) {
            string += item + seperator;
        }

        else {
            string += item;
        }
    }

    return string;
}

function _flattenArray(array) {
    return array.reduce( (flattArray, item) => {
        if (Array.isArray(item)) {
            const nestedArray = item;

            for (let item of nestedArray) {
                flattArray.push(item);
            }
        }

        else {
            flattArray.push(item);
        }

        return flattArray;
    }, []);
}

function _localSettingsToString(localSettings) {
    return localSettings.reduce( (modifiedString, item) => {
        const {string, seperator, segmentSeperator, isSegmentSeperatorAtEnd, repeat} = item;
        
        let isAtEnd;
        
        for(let i = 0; i < repeat; i++) {
            modifiedString += _arrayToString(string, seperator);
            
            if (isSegmentSeperatorAtEnd) {
                isAtEnd = ((i + 1) !== repeat);
            }

            else {
                isAtEnd = true;
            }

            if (segmentSeperator && isAtEnd) {
                modifiedString = `${modifiedString}${segmentSeperator}`;
            }
            
            else {
                modifiedString = `${modifiedString} `;
            }
        }

        return modifiedString;
    }, "");
}

function _getLocalSettingsFormat(string) {
    return {
        string: string||null,
        seperator: null,
        segmentSeperator: null,
        isSegmentSeperatorAtEnd: false,
        repeat: 0
    };
}

const numbers = [1, 2, 3]

createString(numbers, 4).segmentSeperator(" and ").repeat(2).build();