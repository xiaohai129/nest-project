const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNlZmNiN2ZmZDEiLCJtb2JpbGUiOiIxNzc5NjQ3OTU4MCIsIm5pY2tuYW1lIjoi5bCP5rW3Iiwicm9sZXMiOlsiYWRkIiwiZ2V0Il0sImlhdCI6MTYxNDA2MTc2NH0.zctlYuErWAKZIKiMDpIhn7CLrtHpkYxcL26gX-ITJ84';

setTimeout(() => {
  ui.preauthorizeApiKey('auth', token);
}, 1000);
