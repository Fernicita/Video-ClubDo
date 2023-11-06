const mongoose = require('mongoose');

const copySchema = new mongoose.Schema({
  _number: {
    type: Number,
    required: true,
  },
  _format: {
    type: String,
    enum: ['VHS', 'DVD', 'BLUE_RAY'],
    required: true,
  },
  _movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  _status: {
    type: String,
    enum: ['AVAILABLE', 'RENTED'],
    default: 'AVAILABLE',
  },
});

class Copy {
  constructor(number, format, movie) {
    this._number = number;
    this._format = format;
    this._movie = movie;
  }

  get number() {
    return this._number;
  }

  set number(value) {
    this._number = value;
  }

  get format() {
    return this._format;
  }

  set format(value) {
    this._format = value;
  }

  get movie() {
    return this._movie;
  }

  set movie(value) {
    this._movie = value;
  }
}

copySchema.loadClass(Copy);

const CopyModel = mongoose.model('Copy', copySchema);

module.exports = CopyModel;
