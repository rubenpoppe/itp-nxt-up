// HumanizeDuration.js - https://git.io/j0HgmQ
// Licensed under The Unilicense

(function () {
	// You can create a humanizer, which returns a function with default
	// parameters.
	function humanizer(passedOptions) {
		var result = function humanizer(ms, humanizerOptions) {
			var options = assign({}, result, humanizerOptions || {});
			return doHumanization(ms, options);
		};

		return assign(
			result,
			{
				spacer: ' ',
				conjunction: '',
				serialComma: true,
				units: ['y', 'mo', 'w', 'd', 'h', 'm', 's'],
				languages: {},
				round: false,
				unitMeasures: {
					y: 31557600000,
					mo: 2629800000,
					w: 604800000,
					d: 86400000,
					h: 3600000,
					m: 60000,
					s: 1000,
					ms: 1,
				},
			},
			passedOptions
		);
	}

	// The main function is just a wrapper around a default humanizer.
	var humanizeDuration = humanizer({});

	// doHumanization does the bulk of the work.
	function doHumanization(ms, options) {
		var i, len, piece;

		// Make sure we have a positive number.
		// Has the nice sideffect of turning Number objects into primitives.
		ms = Math.abs(ms);

		var dictionary = {
			en: {
				y: function (c) {
					return 'year' + (c === 1 ? '' : 's');
				},
				mo: function (c) {
					return 'month' + (c === 1 ? '' : 's');
				},
				w: function (c) {
					return 'week' + (c === 1 ? '' : 's');
				},
				d: function (c) {
					return 'day' + (c === 1 ? '' : 's');
				},
				h: function (c) {
					return 'hour' + (c === 1 ? '' : 's');
				},
				m: function (c) {
					return 'minute' + (c === 1 ? '' : 's');
				},
				s: function (c) {
					return 'second' + (c === 1 ? '' : 's');
				},
				ms: function (c) {
					return 'millisecond' + (c === 1 ? '' : 's');
				},
				decimal: '.',
			},
			iso: {
				y: function (c) {
					return 'Y';
				},
				mo: function (c) {
					return 'M';
				},
				w: function (c) {
					return 'W';
				},
				d: function (c) {
					return 'D';
				},
				h: function (c) {
					return 'H';
				},
				m: function (c) {
					return 'M';
				},
				s: function (c) {
					return 'S';
				},
				decimal: '.',
			},
		}[options.lang || 'en'];
		var pieces = [];

		// Start at the top and keep removing units, bit by bit.
		var unitName, unitMS, unitCount;
		for (i = 0, len = options.units.length; i < len; i++) {
			unitName = options.units[i];
			unitMS = options.unitMeasures[unitName];

			// What's the number of full units we can fit?
			if (i + 1 === len) {
				if (has(options, 'maxDecimalPoints')) {
					// We need to use this expValue to avoid rounding functionality of toFixed call
					var expValue = Math.pow(10, options.maxDecimalPoints);
					var unitCountFloat = ms / unitMS;
					unitCount = parseFloat(
						(Math.floor(expValue * unitCountFloat) / expValue).toFixed(
							options.maxDecimalPoints
						)
					);
				} else {
					unitCount = ms / unitMS;
				}
			} else {
				unitCount = Math.floor(ms / unitMS);
			}

			// Add the string.
			pieces.push({
				unitCount: unitCount,
				unitName: unitName,
			});

			// Remove what we just figured out.
			ms -= unitCount * unitMS;
		}

		var firstOccupiedUnitIndex = 0;
		for (i = 0; i < pieces.length; i++) {
			if (pieces[i].unitCount) {
				firstOccupiedUnitIndex = i;
				break;
			}
		}

		if (options.round) {
			var ratioToLargerUnit, previousPiece;
			for (i = pieces.length - 1; i >= 0; i--) {
				piece = pieces[i];
				piece.unitCount = Math.round(piece.unitCount);

				if (i === 0) {
					break;
				}

				previousPiece = pieces[i - 1];

				ratioToLargerUnit =
					options.unitMeasures[previousPiece.unitName] /
					options.unitMeasures[piece.unitName];
				if (
					piece.unitCount % ratioToLargerUnit === 0 ||
					(options.largest && options.largest - 1 < i - firstOccupiedUnitIndex)
				) {
					previousPiece.unitCount += piece.unitCount / ratioToLargerUnit;
					piece.unitCount = 0;
				}
			}
		}

		var result = [];
		for (i = 0, pieces.length; i < len; i++) {
			piece = pieces[i];
			if (piece.unitCount) {
				result.push(
					render(piece.unitCount, piece.unitName, dictionary, options)
				);
			}

			if (result.length === options.largest) {
				break;
			}
		}

		if (result.length) {
			var delimiter;
			if (has(options, 'delimiter')) {
				delimiter = options.delimiter;
			} else if (has(dictionary, 'delimiter')) {
				delimiter = dictionary.delimiter;
			} else {
				delimiter = ', ';
			}

			if (!options.conjunction || result.length === 1) {
				return result.join(delimiter);
			} else if (result.length === 2) {
				return result.join(options.conjunction);
			} else if (result.length > 2) {
				return (
					result.slice(0, -1).join(delimiter) +
					(options.serialComma ? ',' : '') +
					options.conjunction +
					result.slice(-1)
				);
			}
		} else {
			return render(
				0,
				options.units[options.units.length - 1],
				dictionary,
				options
			);
		}
	}

	function render(count, type, dictionary, options) {
		var decimal;
		if (has(options, 'decimal')) {
			decimal = options.decimal;
		} else if (has(dictionary, 'decimal')) {
			decimal = dictionary.decimal;
		} else {
			decimal = '.';
		}

		var countStr;
		if (typeof dictionary._formatCount === 'function') {
			countStr = dictionary._formatCount(count, decimal);
		} else {
			countStr = count.toString().replace('.', decimal);
		}

		var dictionaryValue = dictionary[type];
		var word;
		if (typeof dictionaryValue === 'function') {
			word = dictionaryValue(count);
		} else {
			word = dictionaryValue;
		}

		return countStr + options.spacer + word;
	}

	function assign(destination) {
		var source;
		for (var i = 1; i < arguments.length; i++) {
			source = arguments[i];
			for (var prop in source) {
				if (has(source, prop)) {
					destination[prop] = source[prop];
				}
			}
		}
		return destination;
	}

	function has(obj, key) {
		return Object.prototype.hasOwnProperty.call(obj, key);
	}

	humanizeDuration.humanizer = humanizer;

	if (typeof define === 'function' && define.amd) {
		define(function () {
			return humanizeDuration;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = humanizeDuration;
	} else {
		this.humanizeDuration = humanizeDuration;
	}
})();
