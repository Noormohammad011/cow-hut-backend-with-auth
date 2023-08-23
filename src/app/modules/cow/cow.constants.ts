import { ICow } from "./cow.interface";

export const location = [
  'Dhaka',
  'Chattogram',
  'Barishal',
  'Rajshahi',
  'Sylhet',
  'Comilla',
  'Rangpur',
  'Mymensingh',
];

export const breed = [
  'Brahman',
  'Nellore',
  'Sahiwal',
  'Gir',
  'Indigenous',
  'Tharparkar',
  'Kankrej',
];

export const category = ['Dairy', 'Beef', 'Dual Purpose'];

export const label = ['for sale', 'sold out'];

export const cowSearchableFields = ['location', 'breed', 'category'];

export const cowFilterableFields = [
  'searchTerm',
  'minPrice',
  'maxPrice',
  'location',
  'breed',
];


//Testing CowSearchableFields
export const cowSearchableFieldsTest: (keyof ICow)[] = [
  'name',
  'location',
  'breed',
];


//Testing CowFilterableFields
export const cowFilterableFieldsTest = [
  'price',
  'location',
  'breed',
  'page',
  'limit',
  'sort',
  'fields',
  'searchText',
];
