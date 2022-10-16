export default interface IRepo {
  create: (data: any) => Promise<any>;
  read: (id: string) => Promise<any>;
  readAll: () => Promise<any>;
  update: (id: string, data: any) => Promise<any>;
  delete: (id: string) => Promise<any>;
}
