
# mandrill

[![Build Status](https://secure.travis-ci.org/LearnBoost/mandrill-send.png)](http://travis-ci.org/LearnBoost/mandrill-send)

Dead-simple mandrill API implementation. Only sends emails.

## How to use

```js
var email = require('mandrill-send')('your-api-key');
email({
  from: 'Guillermo Rauch <rauchg@gmail.com>',
  to: ['a@b.com', 'c@d.com', { name: 'Guillermo', email: 'guiller@mo.com' }]
}, function(err){
  if (err) console.error(err);
});
```

## API

The module exports a function that takes the API key and returns the
sender function.

The sender function accepts an object of options and optionally a callback.

The options passed to the sender function are the same as the ones
described in the
[Mandrill API](https://mandrillapp.com/api/docs/messages.html)

In addition, two enhancements are present:

- All emails can be expressed as `Name <email@host.com>`, and they'll
  be parsed automatically and the right fields will be sent to Mnadrill.

- `from` can be set intead of `from_email` and `from_name`:

  ```js
  email({ from: 'Guillermo Rauch <rauchg@gmail.com>' });
  ```

- `to` can be expressed as an array of emails:

  ```js
  email({ to: ['a@b.com', 'c@d.com'] });
  ```

## License 

(The MIT License)

Copyright (c) 2013 Guillermo Rauch &lt;guillermo@learnboost.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
