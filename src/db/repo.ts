export default interface IRepo {
  create: (data: any) => Promise<any>;
  read: (query: any) => Promise<any>;
  readAll: () => Promise<any>;
  update: (query: any, data: any) => Promise<any>;
  delete: (query: any) => Promise<any>;
}
