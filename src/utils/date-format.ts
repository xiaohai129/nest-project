import * as moment from 'moment';

export function dateFormat(date: any, format = 'YYYY-MM-DD HH:mm:ss') {
  return moment(date).format(format);
}
