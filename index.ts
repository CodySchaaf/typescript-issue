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

const myCat: Array<Animal | undefined> = [{type: CatType, purr: () => { console.log('purr'); }}];

const getCat1 = (): Cat[] => {
	return myCat.filter(isOfType(CatType))
};

const getCat2 = (): Cat[] => {
	const foo = myCat.filter(isOfType(CatType));
	return foo;
};

const cat1 = getCat1();
const cat2 = getCat2();
