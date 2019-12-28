export const add = (a: number, b: string) => {
    return a + b;
};

// 💥 Expect error 2345: Argument of type '4' is not assignable to parameter of type...
add(3, 4);
