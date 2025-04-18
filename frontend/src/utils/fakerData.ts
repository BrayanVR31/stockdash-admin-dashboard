import { Faker, es_MX } from "@faker-js/faker";
import { Supplier, URLAddress } from "@/types/supplier";
import { Image } from "@/types/image";

export const customFaker = new Faker({
  locale: [es_MX],
});

const createImage = (): Image => {
  return {
    _id: customFaker.string.uuid(),
    path: customFaker.image.avatar(),
    size: customFaker.number.int({ min: 1, max: 5 }) * 1_024 * 1_024,
    createdAt: customFaker.date.recent(),
    updatedAt: customFaker.date.recent(),
  };
};

const createAddress = (): Supplier["address"] => ({
  state: customFaker.location.state(),
  street: customFaker.location.street(),
  zipCode: customFaker.number.int({ min: 10_000 }),
  neighborhood: customFaker.location.secondaryAddress(),
});

const createContact = (): Supplier["contact"] => {
  const prefixes = ["55", "22", "33"];
  const randomPrefix = customFaker.helpers.arrayElement(prefixes);
  return {
    email: customFaker.internet.email(),
    phoneNumber: randomPrefix + customFaker.string.numeric(8),
  };
};

const createSocialMediaList = (): URLAddress[] | null => {
  const domains = ["facebook.com", "instagram.com", "tiktok.com", "x.com"];
  const countDomains = customFaker.number.int({ min: 0, max: domains.length });
  const randomDomains = customFaker.helpers.arrayElements(
    domains,
    countDomains,
  );
  if (countDomains === 0) return null;
  return randomDomains.map((domain) => ({
    url: `${customFaker.internet.protocol()}://${domain}/${customFaker.internet.displayName()}`,
  }));
};

const companyNames = [
  "Zentryx Labs",
  "Froxen Solutions",
  "Kandrix",
  "Obelix Dynamics",
  "Truvana Corp",
  "Nexora Group",
  "Veltrix Innovations",
  "Quantivo Ltd",
  "Axionyx Global",
  "Blyntara Technologies",
];

export const createRandSupplier = (persistent = false): Supplier => ({
  _id: customFaker.string.uuid(),
  name: persistent
    ? customFaker.helpers.arrayElement(companyNames)
    : customFaker.company.name(),
  image: customFaker.helpers.arrayElement([null, createImage()]),
  address: createAddress(),
  contact: createContact(),
  createdAt: customFaker.date.recent(),
  deletedAt: customFaker.helpers.arrayElement([
    null,
    customFaker.date.future(),
  ]),
  socialMedia: createSocialMediaList(),
});
