
import type { CatI } from '$lib/types';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';

let schema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required().positive().integer(),
  email: yup.string().email(),
  website: yup.string().url(),
  createdOn: yup.date().default(function () {
    return new Date();
  }),
});


export class Cat implements CatI {
    id: string | undefined;
    name = $state() as string | undefined;
    age = $state() as number | undefined;
    weight = $state() as number | undefined;
    genderMale = $state() as boolean | undefined;

    constructor( id: string | undefined, name: string | undefined, age: number | undefined, weight: number | undefined, genderMale: boolean | undefined)  {
        this.id = id || uuidv4();
        this.name = name;
        this.age = age;
        this.weight = weight;
        this.genderMale = genderMale;
    } 


    setMale() { this.genderMale = true; }
    setFemale() { this.genderMale = false; }
  
}

