import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDQrlkoM1S15qBo4admjiz09Ap1LDgKjKM',
  authDomain: 'demerzel-5cd36.firebaseapp.com',
  databaseURL: 'https://demerzel-5cd36.firebaseio.com',
  projectId: 'demerzel-5cd36',
  storageBucket: 'demerzel-5cd36.appspot.com',
  messagingSenderId: '454598468093'
}

class Firebase {
  constructor () {
    firebase.initializeApp(config)
  }
}

export default new Firebase()
