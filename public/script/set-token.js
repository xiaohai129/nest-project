const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI1YzBmMDE1NGQiLCJtb2JpbGUiOiIxNzc5NjQ3OTU4MCIsIm5pY2tuYW1lIjoi5bCP5rW3Iiwicm9sZXMiOlsiYWRkIiwiZ2V0Il0sImlhdCI6MTYxNDEzMzA5Mn0.VtPuIOFRedvppvKnf1C0mkYR5FXQvHTgtGDtDW7DJT8';

setTimeout(() => {
  ui.preauthorizeApiKey('auth', token);
}, 1000);
