import { Book } from "./books";
import { Customer } from "./customers";

export interface Reservation {
  _id?: string;
  customer?: Customer;
  book: Book;
  returnBy?: Date;
  status: string;
  reservedOn: Date
}
