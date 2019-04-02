import { of, Observable } from 'rxjs';
import {filter} from "rxjs/operators";


export const isOfType = <TValue extends string| symbol, T extends ({ type: any })>(type: TValue) =>
	(objectToNarrow: T|undefined): objectToNarrow is Extract<NonNullable<T>, { type: TValue }> =>
		!!objectToNarrow && objectToNarrow.type === type;

const CatType = Symbol('cat');
const DogType = Symbol('dog');

interface Cat {
	readonly type: typeof CatType;
	purr: () => void;
}

interface Dog {
	readonly type: typeof DogType;
}

type Animal = Cat | Dog;

const myCat: Animal | undefined = {type: CatType, purr: () => { console.log('purr'); }} as Animal | undefined;

const getCat1 = (): Observable<Cat> => {
	return of(myCat)
		.pipe(filter(isOfType(CatType)));
};

const getCat2 = (): Observable<Cat> => {
	const foo = of(myCat)
		.pipe(filter(isOfType(CatType)));
	return foo;
};

getCat1().subscribe((a: Cat) => console.log(a));
getCat2().subscribe((a: Cat) => console.log(a));
