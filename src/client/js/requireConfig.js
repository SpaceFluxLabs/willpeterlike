!(function() {
  require.config({
    baseUrl: 'js',
    paths: {
      'Phaser': [
        'https://cdnjs.cloudflare.com/ajax/libs/phaser/2.0.4/phaser.min'
      ],
      'Firebase': [
        'https://cdn.firebase.com/js/client/1.0.11/firebase'
      ],
      'Lodash': [
        'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min'
      ]
    },
    shim: {
      'Firebase': {
        'exports': 'Firebase'
      },
      'Phaser': {
        'exports': 'Phaser'
      }
    }
  });
})();

