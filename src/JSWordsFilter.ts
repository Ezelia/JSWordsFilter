//   MIT License
//   Copyright(c) 2012 - 2013 Ezelia.com and other contributors
//   Author : Alaa-eddine KADDOURI (alaa.eddine@gmail.com)
//   
//      
// Permission is hereby granted, free of charge, to any person obtaining a copy of 
// this software and associated documentation files(the 'Software'), to deal in the 
// Software without restriction, including without limitation the rights to use, 
// copy, modify, merge, publish, distribute, sublicense, and / or sell copies of 
// the Software, and to permit persons to whom the Software is furnished to do so, 
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in 
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
// IMPLIED, INCLUDING  BUT NOT LIMITED  TO THE WARRANTIES  OF MERCHANTABILITY, 
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE 
// AUTHORS  OR COPYRIGHT HOLDERS BE LIABLE  FOR  ANY CLAIM,  DAMAGES OR OTHER 
// LIABILITY,  WHETHER IN AN ACTION OF CONTRACT,  TORT OR OTHERWISE,  ARISING 
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
// IN THE SOFTWARE.
//
// Levenshtein distance implementation from http://en.wikibooks.org/wiki/Algorithm_Implementation/Strings/Levenshtein_distance
//
module Ezelia {
    export class JSWordsFilter {
        public blacklist: string[];
        public filterChar: string;
        public tolerance: number;
        public threshold: number;
        // Constructor
        constructor(options?) {
            this.blacklist = options.blacklist || [];
            this.filterChar = options.filterChar || '#';
            this.tolerance = options.tolerance || 0.2;
            this.threshold = options.threshold || 3;
        }
        getLevenshteinDistance(a, b) {
            if (a.length == 0) return b.length;
            if (b.length == 0) return a.length;

            var matrix = [];

            // increment along the first column of each row
            var i;
            for (i = 0; i <= b.length; i++) {
                matrix[i] = [i];
            }

            // increment each column in the first row
            var j;
            for (j = 0; j <= a.length; j++) {
                matrix[0][j] = j;
            }

            // Fill in the rest of the matrix
            for (i = 1; i <= b.length; i++) {
                for (j = 1; j <= a.length; j++) {
                    if (b.charAt(i - 1) == a.charAt(j - 1)) {
                        matrix[i][j] = matrix[i - 1][j - 1];
                    } else {
                        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                                                Math.min(matrix[i][j - 1] + 1, // insertion
                                                         matrix[i - 1][j] + 1)); // deletion
                    }
                }
            }

            return matrix[b.length][a.length];
        };
        filter(s) {
            if (this.blacklist.length <= 0) return s;
            var tokens = s.split(' ');
            var sentence = '';
            for (var i = 0; i < tokens.length; i++) {
                var token = tokens[i];
                for (var w = 0; w < this.blacklist.length; w++) {
                    var tolerance = token.length > this.threshold ? Math.round(token.length * this.tolerance) : 0;
                    if (this.getLevenshteinDistance(this.blacklist[w].toLowerCase(), token.toLowerCase()) <= tolerance) {
                        token = token.replace(/./gi, this.filterChar);
                        break;
                    }
                }
                if (sentence != '') sentence += ' ';
                sentence += token;
            }
            return sentence;
        }

    }
}