define(function() {
  var MockFirebase = {
    push: jasmine.createSpy().and.callFake(function(options, cb) {
      cb();
    })
  }

  return MockFirebase;
});
