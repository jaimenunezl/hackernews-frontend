import { Pipe, PipeTransform } from "@angular/core";
import { LowerCasePipe } from "@angular/common";

@Pipe({
  name: "date"
})
export class DatePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    let result = "-";
    const now = new Date();
    const inputDate = new Date(value);

    const diff = now.getTime() - inputDate.getTime();
    const days = Math.round(diff / (1000 * 60 * 60 * 24));

    // today
    if (days === 0) {
      result = new LowerCasePipe().transform(
        inputDate.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true
        })
      );
    }
    // yesterday
    if (days === 1) {
      result = "Yesterday";
    }
    // more
    if (days > 1) {
      result =
        inputDate.toLocaleString("en-us", { month: "short" }) +
        " " +
        inputDate.getDate();
    }
    //return result + `(${value})`;
    return result;
  }
}
