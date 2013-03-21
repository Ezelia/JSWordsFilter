var Ezelia;
(function (Ezelia) {
    var JSWordsFilter = (function () {
        // Constructor
        function JSWordsFilter(options) {
            this.blacklist = options.blacklist || [];
            this.filterChar = options.filterChar || '#';
            this.tolerance = options.tolerance || 0.2;
            this.threshold = options.threshold || 3;
        }
        JSWordsFilter.prototype.getLevenshteinDistance = function (a, b) {
            if(a.length == 0) {
                return b.length;
            }
            if(b.length == 0) {
                return a.length;
            }
            var matrix = [];
            // increment along the first column of each row
            var i;
            for(i = 0; i <= b.length; i++) {
                matrix[i] = [
                    i
                ];
            }
            // increment each column in the first row
            var j;
            for(j = 0; j <= a.length; j++) {
                matrix[0][j] = j;
            }
            // Fill in the rest of the matrix
            for(i = 1; i <= b.length; i++) {
                for(j = 1; j <= a.length; j++) {
                    if(b.charAt(i - 1) == a.charAt(j - 1)) {
                        matrix[i][j] = matrix[i - 1][j - 1];
                    } else {
                        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                        Math.min(matrix[i][j - 1] + 1, // insertion
                        matrix[i - 1][j] + 1))// deletion
                        ;
                    }
                }
            }
            return matrix[b.length][a.length];
        };
        JSWordsFilter.prototype.filter = function (s) {
            if(this.blacklist.length <= 0) {
                return s;
            }
            var tokens = s.split(' ');
            var sentence = '';
            for(var i = 0; i < tokens.length; i++) {
                var token = tokens[i];
                for(var w = 0; w < this.blacklist.length; w++) {
                    var tolerance = token.length > this.threshold ? Math.round(token.length * this.tolerance) : 0;
                    if(this.getLevenshteinDistance(this.blacklist[w].toLowerCase(), token.toLowerCase()) <= tolerance) {
                        token = token.replace(/./gi, this.filterChar);
                        break;
                    }
                }
                if(sentence != '') {
                    sentence += ' ';
                }
                sentence += token;
            }
            return sentence;
        };
        return JSWordsFilter;
    })();
    Ezelia.JSWordsFilter = JSWordsFilter;    
})(Ezelia || (Ezelia = {}));
//@ sourceMappingURL=JSWordsFilter.js.map
