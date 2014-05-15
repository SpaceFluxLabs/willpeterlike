!(function() {
  require.config({
    baseUrl: 'js',
    paths: {
      'Phaser': [
        'https://cdnjs.cloudflare.com/ajax/libs/phaser/2.0.4/phaser.min'
      ],
      'Firebase': [
        'https://cdn.firebase.com/js/client/1.0.11/firebase'
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
