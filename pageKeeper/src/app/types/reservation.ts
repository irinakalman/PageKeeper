import { Book } from "./books";
import { Customer } from "./customers";

export interface Reservation {
  id?: string;
  customer?: Customer;
  book: Book;
  returnBY?: Date;
  status: string;
  reservedOn: Date
}
