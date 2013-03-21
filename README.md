JSWordsFilter
=============

JSWordsFilter is a Javascript bad words filter, it uses [Levenshtein distance](http://en.wikipedia.org/wiki/Levenshtein_distance) to match approximative words or bad typed words aswell.

see online demo [here](http://htmlpreview.github.com/?https://github.com/alaa-eddine/JSWordsFilter/master/demo.htm)


Usage
=====

Reference JSWordsFilter.js file
```html
  <head>
    <script src="JSWordsFilter.js"></script>
  </head>

```

### Initialization

```js
    var jswf = new Ezelia.JSWordsFilter({
        blacklist: ['badword1', 'badword2', 'badword3'],
        filterChar: '#', /*replacement for filtered words*/
        tolerance: 0.3,  /*if 20% match then filter the word*/
        threshold: 3     /*words with three characters or less will get filtered only on exact match => tolerance is ignored */
    });
```

You can set/modify filter parameters later

```js
  jswf.blacklist.push('anotherBadWord');
  jswf.filterChar = '*';
  jswf.tolerance = 0.4;
  jswf.threshold = 4;
```


### filtering

```js
  var str = 'some string here ...';
  var filteredStr = jswf.filter(str);
```


Licence
=======
   MIT License
   Copyright(c) 2012 - 2013 http://Ezelia.com and other contributors
   
   Author : Alaa-eddine KADDOURI (alaa.eddine@gmail.com)

 Permission is hereby granted, free of charge, to any person obtaining a copy of 
 this software and associated documentation files(the 'Software'), to deal in the 
 Software without restriction, including without limitation the rights to use, 
 copy, modify, merge, publish, distribute, sublicense, and / or sell copies of 
 the Software, and to permit persons to whom the Software is furnished to do so, 
 subject to the following conditions:

 The above copyright notice and this permission notice shall be included in 
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 IMPLIED, INCLUDING  BUT NOT LIMITED  TO THE WARRANTIES  OF MERCHANTABILITY, 
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE 
 AUTHORS  OR COPYRIGHT HOLDERS BE LIABLE  FOR  ANY CLAIM,  DAMAGES OR OTHER 
 LIABILITY,  WHETHER IN AN ACTION OF CONTRACT,  TORT OR OTHERWISE,  ARISING 
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
 IN THE SOFTWARE.
