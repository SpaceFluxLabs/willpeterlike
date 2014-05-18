define(function() {
  var MockFirebase = {
    push: jasmine.createSpy()
  }

  return MockFirebase;
});
