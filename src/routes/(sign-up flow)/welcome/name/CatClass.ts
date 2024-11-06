
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
    name = '' as string | undefined;
    age = 0 as number | undefined;
    weight = 0 as number | undefined;
    genderMale = true as boolean | undefined;
    dislikes = [] as string[] | undefined;

    constructor(obj: {id?: string | undefined, name?: string | undefined, age?: number | undefined, weight?: number | undefined, 
      genderMale?: boolean | undefined, dislikes?: string[] | undefined}) { 
        obj.id ? this.id = obj.id : this.id = uuidv4();
        obj.name ? this.name = obj.name : this.name = '';
        obj.age ? this.age = obj.age : this.age = 0;
        obj.weight ? this.weight = obj.weight : this.weight = 0;
        obj.genderMale ? this.genderMale = obj.genderMale : this.genderMale = undefined;
        obj.dislikes ? this.dislikes = obj.dislikes : this.dislikes = [];
    } 

    setMale() { this.genderMale = true; }
    setFemale() { this.genderMale = false; }
  
}

