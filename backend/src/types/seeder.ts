export interface Seeder {
  exec: () => Promise<void>;
}
