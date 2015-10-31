import moment from 'moment';

export class TimeValueConverter {
  toView(value) {
    return moment(value).fromNow();
  }
}