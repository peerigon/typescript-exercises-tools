type Person = {
    readonly name: string;
};

const person: Person = {
    name: "Bob",
};

// 💥 Expect error 2704: … cannot be a read-only property.
// 💥 Expect error 2790: … must be optional.
delete person.name;
