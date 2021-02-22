const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNlZmNiN2ZmZDEiLCJtb2JpbGUiOiIxNzc5NjQ3OTU4MCIsIm5pY2tuYW1lIjoic3RyaW5nIiwicm9sZXMiOlsiYWRkIiwiZ2V0Il0sImlhdCI6MTYxMzk4ODAzMiwiZXhwIjoxNjE0MDc0NDMyfQ.cJnJ_qwC-Ot6DF8tb6P_xpc1baNv_K5v7nd30Co5its';

setTimeout(() => {
  ui.preauthorizeApiKey('auth', token);
}, 1000);
