import { Injectable } from '@nestjs/common';
import * as Xray from 'x-ray';
import axios from 'axios';

type DatePar = { day: number; month: number; year: number };
type Res = { name: string; baik: string; buruk: string; source: string[] };
type ResRahayun = { date: Date; rahayun: Res[] };

interface BaseService {
  scrapWebSource(date?: DatePar): Promise<ResRahayun>;
}

@Injectable()
export class CrawlService implements BaseService {
  async scrapWebSource(date?: DatePar): Promise<ResRahayun> {
    const selector = '.foredaftar@html';
    let data = '';

    if (date) {
      const { day, month, year } = date;
      data = `tg=${day}&bl=${month}&th=${year}&Submit=Hasil`;
    }
    const crawl = Xray();

    const { data: html } = await axios.get(
      `http://m.kalenderbali.org/alaayu.php?${data}`,
    );

    return new Promise((resolve, reject) => {
      crawl(
        html,
        selector,
      )((err, response: string) => {
        if (!err) {
          const ramalan = response.replace('<br>', '').split('<br> <br>');
          const ramal: Res[] = ramalan.map(r => {
            const burukRe = /([tT]idak|[Kk]urang) baik/g;
            const baikRe = /[Bb]aik/g;
            const check = (rest, post, status: RegExp, except?: RegExp) =>
              rest.length > post &&
              rest[post] &&
              status.test(rest[post]) &&
              !(except && except.test(rest[post]))
                ? rest[post]
                : undefined;
            const [ayu, ...rest] = r.split('.');
            const buruk = check(rest, 0, burukRe) || check(rest, 1, burukRe);
            const baik =
              rest.length > 1 &&
              buruk !== rest[0] &&
              check(rest, 0, baikRe, burukRe);
            return {
              name: ayu,
              baik: !buruk ? rest.join() : baik ? baik : undefined,
              buruk: !baik
                ? rest.join()
                : rest.length > 3
                ? rest.slice(1).join()
                : buruk,
              source: rest,
            };
          });

          const filtered = ramal.filter(
            r => r.name !== '' && r.source.length !== 0,
          );
          const displayDate = date
            ? new Date(`${date.day}/${date.month}/${date.year}`)
            : new Date();
          resolve({
            date: displayDate,
            rahayun: filtered,
          });
        } else {
          reject('N/A');
        }
      });
    });
  }
}
