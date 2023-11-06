const mongoose = require('mongoose');

const awaitlistSchema = new mongoose.Schema({
  _member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true,
  },
  _movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
});

class AwaitList {
  constructor(member, movie) {
    this._member = member;
    this._movie = movie;
  }

  get member() {
    return this._member;
  }

  get movie() {
    return this._movie;
  }

  set member(value) {
    this._member = value;
  }

  set movie(value) {
    this._movie = value;
  }
}

module.exports = mongoose.model('Awaitlist', awaitlistSchema);
