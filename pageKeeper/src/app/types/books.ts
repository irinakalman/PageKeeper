export interface Book {
  _id?: string;
  available?: boolean;
  name: string;
  year: string;
  type: string;
  author: string;
  createdOn: Date;
}
